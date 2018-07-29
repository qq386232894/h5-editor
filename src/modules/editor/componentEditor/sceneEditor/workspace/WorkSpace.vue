<template>
  <div class="stage">
    <!--todo 下面的v-if丢到上面的元素里面，this.$refs.selectRect获取出来就有问题，请问大神，为什么？-->
    <gls-display-component-editor :component="project.selectedScene.stage"
                                  :project="project"
                                  :key="project.selectedScene.stage.props.id"
                                  :scene="project.selectedScene"
                                  v-if="project && project.selectedScene && project.selectedScene.stage"
    >
    </gls-display-component-editor>
    <!--多选框-->
    <div class="gls-multi-select-rect" ref="selectRect"></div>
  </div>
</template>

<script lang="ts">
  import glsDisplayComponentEditor from './displayComponentEditor/DisplayComponentEditor.vue'
  import {Renderer} from "../../../../../common/render/Renderer";
  import {
    E_RESIZE,
    GLS_RESIZE_POINT,
    GLS_ROTATE_POINT,
    N_RESIZE,
    NE_RESIZE, NW_RESIZE, S_RESIZE, SE_RESIZE, SW_RESIZE, W_RESIZE
  } from "./displayComponentEditor/DisplayComponentSelectClasses";
  import {Project} from "../../../core/project/Project";
  import {DisplayComponent} from "../../../core/display/DisplayComponent";
  import Vue from 'vue'
  import {Component, Input, Inject} from 'angular2-decorators-for-vue'
  import {DisplayComponentFactory} from "../../../core/factorys/display/DisplayComponentFactory";
  import {Rect} from "../../../core/geom/Rect";
  import {CopyPasteManager} from "../../../core/parse/CopyPasteManager";
  import GlsComponentStageDisplay from './stage/ComponentStageDisplay.vue';
  import {Stage} from "../../../core/display/stage/Stage";
  import {WorkSpaceEvent} from "./WorkSpaceEvent";
  import {SceneService} from "../../../core/factorys/scsne/SceneService";
  import {Debounce} from "../../../../../common/utils/Debounce";

  class MouseDownRect {
    top: number;
    right: number;
    bottom: number;
    left: number;

    constructor(top: number, right: number, bottom: number, left: number) {
      this.top = top;
      this.right = right;
      this.bottom = bottom;
      this.left = left;
    }

    get centerX() {
      return (this.left + this.right) / 2;
    }

    get centerY() {
      return (this.top + this.bottom) / 2;
    }
  }

  @Component({
    name: "gls-work-space",
    components: {
      glsDisplayComponentEditor: glsDisplayComponentEditor
    }
  } as any)
  export default class WorkSpace extends Vue {
    @Input({required: true}) project: Project;

    @Inject(SceneService)
    SceneService: SceneService;

    @Inject(CopyPasteManager)
    CopyPasteManager: CopyPasteManager;

    private _mouseDownRecycle: () => void;
    private _mouseMoveRecycle: () => void;
    private _mouseUpRecycle: () => void;
    private debounce: Debounce = new Debounce(50, true);

    multiSelectRect: HTMLElement;

    mounted() {
      this.registerSelectionHandler();
      this.registerKeyHandler();
      this.SceneService.load(this.project, this.project.selectedScene);

      this.multiSelectRect = (<HTMLElement>this.$refs.selectRect);
    }

    //渲染出组件的位置,大小,角度
    renderComponentBounding(component: DisplayComponent) {
      component.renderBounding();
    }

    //渲染出组件的选择器的大小
    renderComponentSelectBounding(component: DisplayComponent) {
      this.$root.$emit(WorkSpaceEvent.componentSelectUpdate, component.props.id);
    }

    /**
     * 设置所有选中的组件的透明度
     * @param {number} opacity
     */
    renderSelectedComponentOpacity(opacity: string) {
      this.project.selectedScene.selectedComponents.forEach((component) => {
        let elementStyle = document.getElementById(component.props.id).style;
        elementStyle.opacity = opacity;
      })
    }


    /**
     * 算出组件和某个点的直线的角度
     **/
    caculateComponentRotate(component: DisplayComponent, currentX: number, currentY: number): number {
      //算出中心点
      let bounding = Renderer.getBoundingClientRect(document.getElementById(component.props.id));
      let centerX = bounding.centerX;
      let centerY = bounding.centerY;

      //算出角度
      return Renderer.getAngle(centerX, centerY, currentX, currentY);
    }

    /**
     * 渲染多选的框的位置和大小
     * @param {number} left
     * @param {number} top
     * @param {number} width
     * @param {number} height
     */
    renderMultiSelectRectBounding(left: number, top: number, width: number, height: number) {
      let style = this.multiSelectRect.style;
      if (width == 0 && height === 0) {
        style.display = "none";
      } else {
        this.multiSelectRect.style.cssText = `
      display:block;
      left:${left}px;
      top:${top}px;
      width:${width}px;
      height:${height}px;
      `
      }
    }

    /**
     * 渲染角度
     * @param {DisplayComponent} component
     * @param {number} rotate
     */
    renderComponentRotate(component: DisplayComponent, rotate: number) {
      if (!component.props.rotateable) {
        return;
      }
      let componentStyle = component.style;
      let style = document.getElementById(component.props.id).style;
      componentStyle.rotate = rotate;
      style.transform = `rotateZ(${rotate}deg)`;
      component.onRotate();
    }

    registerKeyHandler() {
      Renderer.addEventListener(document, "keyup", (event) => {
        let keyCode = event.keyCode;
        if (keyCode == 46) {//delete 键就是删除了
          this.project.selectedScene.removeSelection();
        }

        if (event.ctrlKey || event.metaKey) {
          switch (keyCode) {
            case 67: {//c,复制
              this.CopyPasteManager.copy();
              break;
            }
            case 86: {//v,黏贴
              this.CopyPasteManager.paste();
              break;
            }
          }
        }
      })
    }

    isCloseTo(p1, p2) {
      return Math.abs(p1 - p2) <= 5;
    }

    registerSelectionHandler() {
      let mouseDownX,
        mouseDownY,
        /**
         * @type {HTMLElement}
         */
        resizePoint,
        pointClass,
        /**
         * @type {HTMLElement}
         */
        rotatePoint,
        /**
         * @type {{left:number,top:number,width:number,height:number,rotation:number}}
         */
        isMouseDown = false,
        displayComponent,
        //鼠标移动了多少
        mouseMove: { x: number, y: number } = {x: 0, y: 0},
        project: Project = this.project,
        //鼠标按下的时候,组件的位置,大小
        mouseDownElementLeft, mouseDownElementTop, mouseDownElementWidth, mouseDownElementHeight,
        mouseDownElement: DisplayComponent,
        mouseDownCenter: MouseDownRect = null,
        mouseDownUnselectRects: Array<{ element: HTMLElement, rect: Rect, component: DisplayComponent }> = [];
      this._mouseDownRecycle = Renderer.addEventListener(document, "mousedown", (event: MouseEvent) => {
        if (!this.project.selectedScene) {
          return;
        }

        this.project.selectedScene.stop();

        isMouseDown = true;
        mouseDownX = event.pageX;
        mouseDownY = event.pageY;
        let target = event.target;
        displayComponent = Renderer.findCloseElementByClass(target, "gls-display-component");
        if (displayComponent) {
          mouseDownElement = DisplayComponentFactory.getInstance().getCreatedComponent(displayComponent.id);
        }
        if (!displayComponent) {//没点到组件或者点击到舞台，就当做取消选择处理
          project.selectedScene.clearSelection();
          this.renderMultiSelectRectBounding(event.pageX, event.pageY, 0, 0);
        } else {
          resizePoint = Renderer.findCloseElementByClass(target, GLS_RESIZE_POINT);
          rotatePoint = Renderer.findCloseElementByClass(target, GLS_ROTATE_POINT);
          mouseDownElement = DisplayComponentFactory.getInstance().getCreatedComponent(displayComponent.id);
          //点击了舞台，就是单选舞台
          if (!(event.ctrlKey || event.metaKey) && project.selectedScene.selectedComponents.length == 1 || (mouseDownElement instanceof Stage)) {//没有按下ctrl键且只选中了一个组件，就清空
            project.selectedScene.clearSelection();
          }
          mouseDownElement.props.selected = true;
          //改变大小,获取是点击了那个点
          if (resizePoint) {
            pointClass = resizePoint.className.replace(GLS_RESIZE_POINT + " ", "");

            //记录按下的时候的大小和位置
            let style = mouseDownElement.style;
            mouseDownElementTop = style.top;
            mouseDownElementLeft = style.left;
            mouseDownElementWidth = style.width;
            mouseDownElementHeight = style.height;
          } else if (!rotatePoint) {//移动
//            this.renderSelectedComponentOpacity('0.5');

            //算出被拖拽的组件的中心点
            project.selectedScene.forEachComponent((component: DisplayComponent) => {
              let element = Renderer.getElementById(component.props.id);
              let elementRect = Renderer.getBoundingClientRect(element);
              if (component.props.selected && component.props.moveable) {
                if (!mouseDownCenter) {
                  mouseDownCenter = new MouseDownRect(elementRect.top, elementRect.right, elementRect.bottom, elementRect.left);
                } else {
                  mouseDownCenter.top = Math.min(mouseDownCenter.top, elementRect.top);
                  mouseDownCenter.right = Math.max(mouseDownCenter.right, elementRect.right);
                  mouseDownCenter.bottom = Math.max(mouseDownCenter.bottom, elementRect.bottom);
                  mouseDownCenter.left = Math.min(mouseDownCenter.left, elementRect.left);
                }
              } else {
                mouseDownUnselectRects.push({
                  rect: elementRect,
                  element: element,
                  component: component
                });
              }
            });
          }
        }
      })
      this._mouseMoveRecycle = Renderer.addEventListener(document, "mousemove", (event: MouseEvent) => {
        if (!this.project.selectedScene || !isMouseDown) {
          return;
        }
        this.debounce.handle(() => {
          const currentX = event.pageX,
            currentY = event.pageY,
            MIN_WIDTH = 3,
            MIN_HEIGHT = 3;
          mouseMove.x = currentX - mouseDownX;
          mouseMove.y = currentY - mouseDownY;

          if (!displayComponent || (mouseDownElement && mouseDownElement instanceof Stage)) {//多选的情况
            this.renderMultiSelectRectBounding(mouseDownX, mouseDownY, currentX - mouseDownX, currentY - mouseDownY);
            //算出哪些组件是被选中了
            this.project.selectedScene.forEachComponent((component: DisplayComponent) => {
              let element = Renderer.getElementById(component.props.id);
              let elementBounding = Renderer.getBoundingClientRect(element);
              let centerX = elementBounding.centerX,
                centerY = elementBounding.centerY;
              if (centerX >= mouseDownX && centerX <= currentX && centerY >= mouseDownY && centerY <= currentY) {
                if (!component.props.selected) {
                  component.props.selected = true;
                }
              } else {
                component.props.selected = false;
              }
            })
          } else {//移动，旋转，改大小
            if (resizePoint) {//更改大小
              if (!mouseDownElement.props.resizeable) {
                return;
              }
              let elementStyle = mouseDownElement.style;
              switch (pointClass) {
                case N_RESIZE:
                  elementStyle.top = mouseDownElementTop + mouseMove.y;
                  elementStyle.height = mouseDownElementHeight - mouseMove.y;
                  break;
                case W_RESIZE:
                  elementStyle.left = mouseDownElementLeft + mouseMove.x;
                  elementStyle.width = mouseDownElementWidth - mouseMove.x;
                  break;
                case E_RESIZE:
                  elementStyle.width = mouseDownElementWidth + mouseMove.x;
                  break;
                case NE_RESIZE:
                  elementStyle.top = mouseDownElementTop + mouseMove.y;
                  elementStyle.width = mouseDownElementWidth + mouseMove.x;
                  elementStyle.height = mouseDownElementHeight - mouseMove.y;
                  break;
                case SE_RESIZE:
                  elementStyle.width = mouseDownElementWidth + mouseMove.x;
                  elementStyle.height = mouseDownElementHeight + mouseMove.y;
                  break;
                case S_RESIZE:
                  elementStyle.height = mouseDownElementHeight + mouseMove.y;
                  break;
                case SW_RESIZE:
                  elementStyle.left = mouseDownElementLeft + mouseMove.x;
                  elementStyle.width = mouseDownElementWidth - mouseMove.x;
                  elementStyle.height = mouseDownElementHeight + mouseMove.y;
                  break;
                case NW_RESIZE:
                  elementStyle.top = mouseDownElementTop + mouseMove.y;
                  elementStyle.height = mouseDownElementHeight - mouseMove.y;
                  elementStyle.left = mouseDownElementLeft + mouseMove.x;
                  elementStyle.width = mouseDownElementWidth - mouseMove.x;
                  break;
              }
              elementStyle.height = Math.max(MIN_HEIGHT, elementStyle.height as number);
              elementStyle.width = Math.max(MIN_WIDTH, elementStyle.width as number);

              this.renderComponentBounding(mouseDownElement);
              this.renderComponentSelectBounding(mouseDownElement);
              mouseDownElement.onResize();
            } else if (rotatePoint) {//旋转
              let rotateComponent = DisplayComponentFactory.getInstance().getCreatedComponent(displayComponent.id);
              let rotate = this.caculateComponentRotate(rotateComponent, currentX, currentY);

              project.selectedScene.selectedComponents.forEach((component) => {
                this.renderComponentRotate(component, rotate);
              })
            } else {//移动
              if (!mouseDownCenter || (mouseMove.x == 0 && mouseMove.y == 0)) {
                return;
              }
              //移动要吸附
              let fixPosition;
              //算出跟哪根线吸附了
              let allConditions = {x: ["left", "centerX", "right"], y: ["top", "centerY", "bottom"]};
              let fixConfition = {x: false, y: false};
              all:for (let componentInfo of mouseDownUnselectRects) {
                let rect = componentInfo.rect;
                for (let mouseMoveCondition of Object.keys(allConditions)) {
                  if (fixConfition[mouseMoveCondition]) {
                    continue;
                  }
                  for (let fromCondition of allConditions[mouseMoveCondition]) {
                    for (let toCondition of allConditions[mouseMoveCondition]) {
                      if (this.isCloseTo(mouseDownCenter[fromCondition] + mouseMove[mouseMoveCondition], fixPosition = rect[toCondition])) {
                        mouseMove[mouseMoveCondition] = fixPosition - mouseDownCenter[fromCondition];
                        fixConfition[mouseMoveCondition] = true;
                        if (fixConfition.x && fixConfition.y) {
                          break all;
                        }
                      }
                    }
                  }
                }
              }
              //渲染选中组件的位置
              project.selectedScene.selectedComponents.forEach(
                (component: DisplayComponent) => {
                  if (!component.props.moveable) {
                    return;
                  }
                  let componentStyle = component.style;
                  let style = document.getElementById(component.props.id).style;
                  let transform = `translate3d(${mouseMove.x}px,${mouseMove.y}px,0) rotateZ(${componentStyle.rotate}deg)`;
                  style.transform = transform;
                  style.webkitTransform = transform;
                })
            }
          }
        })
      });
      this._mouseUpRecycle = Renderer.addEventListener(document, "mouseup", (event) => {
        this.debounce.doHandle();
        //移动位置
        if (isMouseDown && !resizePoint && !rotatePoint && displayComponent && !(mouseDownElement instanceof Stage)) {
          project.selectedScene.selectedComponents.forEach(
            (component: DisplayComponent) => {
              if (!component.props.moveable) {
                return;
              }
              //
              //更新位置
              let style = component.style;
              style.left += mouseMove.x;
              style.top += mouseMove.y;

              //更新选择器的样式
              this.renderComponentSelectBounding(component);

              //根据属性设置样式
              this.renderComponentBounding(component);
            })
        }

        this.multiSelectRect.style.display = "none";
        resizePoint = null;
        pointClass = "";
        rotatePoint = null;
        isMouseDown = false;
        displayComponent = null;
        mouseMove = {x: 0, y: 0}
        mouseDownUnselectRects.length = 0;
        mouseDownCenter = null;
//        this.renderSelectedComponentOpacity('1');
      });
    }

    beforeDestroy() {
      this._mouseDownRecycle && this._mouseDownRecycle();
      this._mouseMoveRecycle && this._mouseMoveRecycle();
      this._mouseUpRecycle && this._mouseUpRecycle();
      this.debounce.destroy();
    }
  }
</script>

<style scoped lang="scss">
  .gls-multi-select-rect {
    position: fixed;
    box-sizing: border-box;
    border: solid 1px #08A1EF;
    background-color: rgba(8, 161, 239, 0.3);
    display: none;
  }
</style>
