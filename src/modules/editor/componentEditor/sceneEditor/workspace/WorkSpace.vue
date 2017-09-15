<template>
  <div v-if="project.selectedScene" class="stage">
    <!--todo 看能不能废除span这一层,没有这一层,又触发不了click事件-->
    <gls-display-component-editor v-for="component in project.selectedScene.stage.children"
                                  :component="component"
                                  :project="project"
    >
    </gls-display-component-editor>
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
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {DisplayComponentFactory} from "../../../core/factorys/display/DisplayComponentFactory";

  @Component({
    name: "gls-work-space",
    components: {
      glsDisplayComponentEditor: glsDisplayComponentEditor
    }
  })
  export default class WorkSpace extends Vue {
    @Prop({required: true}) project: Project;

    //渲染出组件的位置,大小,角度
    renderComponentBounding(component: DisplayComponent) {
      //根据属性设置样式
      let elementStyle = document.getElementById(component.props.id).style;
      elementStyle.cssText = component.props.boundingStyle;
    }

    //渲染出组件的选择器的大小
    renderComponentSelectBounding(component: DisplayComponent) {
      Renderer.querySelector(`#${component.props.id} .gls-display-component-editor`).style.cssText = component.props.componentSelectStyle;
    }

    /**
     * 设置所有选中的组件的透明度
     * @param {number} opacity
     */
    renderSelectedComponentOpacity(opacity:string){
      this.project.selectedScene.selectedComponents.forEach((component)=>{
        let elementStyle = document.getElementById(component.props.id).style;
        elementStyle.opacity = opacity;
      })
    }

    mounted() {
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
        mouseDownStyle,
        isMouseDown = false,
        displayComponent,
        //鼠标移动了多少
        mouseMoveX, mouseMoveY,
        project: Project = this.project,
        //鼠标按下的时候,组件的位置,大小
        mouseDownElementLeft, mouseDownElementTop, mouseDownElementWidth, mouseDownElementHeight,
        mouseDownElement: DisplayComponent
      ;
      document.addEventListener("mousedown", (event: MouseEvent) => {
        if (!this.project.selectedScene) {
          return;
        }

        isMouseDown = true;
        let target = event.target;

        if (!(displayComponent = Renderer.findCloseElementByClass(target, "gls-display-component"))) {
          project.selectedScene.clearSelection();
        } else {
          mouseDownX = event.pageX;
          mouseDownY = event.pageY;
          resizePoint = Renderer.findCloseElementByClass(target, GLS_RESIZE_POINT);
          rotatePoint = Renderer.findCloseElementByClass(target, GLS_ROTATE_POINT);
          //改变大小,获取是点击了那个点
          if (resizePoint) {
            pointClass = resizePoint.className.replace(GLS_RESIZE_POINT + " ", "");

            //记录按下的时候的大小和位置
            mouseDownElement = DisplayComponentFactory.getInstance().getCreatedComponent(displayComponent.id);
            let style = mouseDownElement.props.style;
            mouseDownElementTop = style.top;
            mouseDownElementLeft = style.left;
            mouseDownElementWidth = style.width;
            mouseDownElementHeight = style.height;
          } else if (!rotatePoint) {//移动
            this.renderSelectedComponentOpacity('0.5');
          }
        }
      })

      document.addEventListener("mousemove", (event: MouseEvent) => {
        if (!this.project.selectedScene || !isMouseDown) {
          return;
        }
        const currentX = event.pageX,
          currentY = event.pageY,
          MIN_WIDTH = 3,
          MIN_HEIGHT = 3;
        mouseMoveX = currentX - mouseDownX;
        mouseMoveY = currentY - mouseDownY;
        if (resizePoint) {
          let elementStyle = mouseDownElement.props.style;
          switch (pointClass) {
            case N_RESIZE:
              elementStyle.top = mouseDownElementTop + mouseMoveY;
              elementStyle.height = mouseDownElementHeight - mouseMoveY;
              break;
            case W_RESIZE:
              elementStyle.left = mouseDownElementLeft + mouseMoveX;
              elementStyle.width = mouseDownElementWidth - mouseMoveX;
              break;
            case E_RESIZE:
              elementStyle.width = mouseDownElementWidth + mouseMoveX;
              break;
            case NE_RESIZE:
              elementStyle.top = mouseDownElementTop + mouseMoveY;
              elementStyle.width = mouseDownElementWidth + mouseMoveX;
              elementStyle.height = mouseDownElementHeight - mouseMoveY;
              break;
            case SE_RESIZE:
              elementStyle.width = mouseDownElementWidth + mouseMoveX;
              elementStyle.height = mouseDownElementHeight + mouseMoveY;
              break;
            case S_RESIZE:
              elementStyle.height = mouseDownElementHeight + mouseMoveY;
              break;
            case SW_RESIZE:
              elementStyle.left = mouseDownElementLeft + mouseMoveX;
              elementStyle.width = mouseDownElementWidth - mouseMoveX;
              elementStyle.height = mouseDownElementHeight + mouseMoveY;
              break;
            case NW_RESIZE:
              elementStyle.top = mouseDownElementTop + mouseMoveY;
              elementStyle.height = mouseDownElementHeight - mouseMoveY;
              elementStyle.left = mouseDownElementLeft + mouseMoveX;
              elementStyle.width = mouseDownElementWidth - mouseMoveX;
              break;
          }
          elementStyle.height = Math.max(MIN_HEIGHT,elementStyle.height as number);
          elementStyle.width = Math.max(MIN_WIDTH,elementStyle.width as number);

          this.renderComponentBounding(mouseDownElement);
          this.renderComponentSelectBounding(mouseDownElement);
        } else if (rotatePoint) {//旋转
          project.selectedScene.selectedComponents.forEach(
            (component: DisplayComponent) => {
              //算出中心点
              let componentStyle = component.props.style;
              let bounding = Renderer.getBoundingClientRect(document.getElementById(component.props.id));
              let centerX = (bounding.left + bounding.right) / 2;
              let centerY = (bounding.top + bounding.bottom) / 2;

              //算出角度
              let style = document.getElementById(component.props.id).style;
              componentStyle.rotate = Renderer.getAngle(centerX, centerY, currentX, currentY);
              style.transform = `rotateZ(${componentStyle.rotate}deg)`;
            })
        } else {//移动
          project.selectedScene.selectedComponents.forEach(
            (component: DisplayComponent) => {
              let componentStyle = component.props.style;
              let style = document.getElementById(component.props.id).style;
              let transform = `translate3d(${mouseMoveX}px,${mouseMoveY}px,0) rotateZ(${componentStyle.rotate}deg)`;
              style.transform = transform;
              style.webkitTransform = transform;
            })
        }
      })

      document.addEventListener("mouseup", () => {
        //移动位置
        if (isMouseDown && !resizePoint && !rotatePoint) {
          project.selectedScene.selectedComponents.forEach(
            (component: DisplayComponent) => {
              //更新位置
              let style = component.props.style;
              style.left += mouseMoveX;
              style.top += mouseMoveY;

              //更新选择器的样式
              this.renderComponentSelectBounding(component);

              //根据属性设置样式
              this.renderComponentBounding(component);
            })

          this.renderSelectedComponentOpacity('1');
        }
        resizePoint = null;
        pointClass = "";
        rotatePoint = null;
        isMouseDown = false;
        displayComponent = null;
        mouseMoveX = 0;
        mouseMoveY = 0;
      })
    }
  }
</script>

<style scoped lang="scss">
</style>
