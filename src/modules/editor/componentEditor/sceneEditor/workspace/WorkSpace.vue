<template>
  <div v-if="project.selectedScene" class="stage">
    <!--todo 看能不能废除span这一层,没有这一层,又触发不了click事件-->
    <span v-for="component in project.selectedScene.stage.children"
          @mousedown="component.props.selected = true"
          class="gls-display-component"
          :style="component.props.boundingStyle"
          :id="component.props.id"
    >
      <!--动态编译出所有子节点-->
      <gls-dynamic-display-component
        :component="component"
        :project="project"
      >
      </gls-dynamic-display-component>

      <!--组件的位置,大小和角度的编辑器-->
      <gls-display-component-editor :component="component"></gls-display-component-editor>
    </span>
  </div>
</template>

<script lang="ts">
  import glsDynamicDisplayComponent from './DynamicDisplayComponent.vue'
  import glsDisplayComponentEditor from './displayComponentEditor/DisplayComponentEditor.vue'
  import {Renderer} from "../../../../../common/render/Renderer";
  import {GLS_RESIZE_POINT, GLS_ROTATE_POINT} from "./displayComponentEditor/DisplayComponentEditorClasses";

  /**
   * 这里是真正的工作空间
   */
  export default {
    name: "gls-work-space",
    props: {
      project: Object
    },
    data() {
      return {}
    },
    components: {
      glsDynamicDisplayComponent: glsDynamicDisplayComponent,
      glsDisplayComponentEditor: glsDisplayComponentEditor
    },
    mounted: function () {
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
        mouseMoveX,mouseMoveY
      ;
      document.addEventListener("mousedown", (event) => {
        if (!this.project.selectedScene) {
          return;
        }

        isMouseDown = true;
        let target = event.target;

        if (!(displayComponent = Renderer.findCloseElementByClass(target, "gls-display-component"))) {
          this.project.selectedScene.clearSelection();
        } else {
          mouseDownX = event.pageX;
          mouseDownY = event.pageY;
          resizePoint = Renderer.findCloseElementByClass(target, GLS_RESIZE_POINT);
          rotatePoint = Renderer.findCloseElementByClass(target, GLS_ROTATE_POINT);
          console.log(resizePoint, rotatePoint, target);
          //改变大小,获取是点击了那个点
          if (resizePoint) {
            pointClass = resizePoint.className.replace(GLS_RESIZE_POINT + " ", "");
          }else if(!rotatePoint){

          }
        }
      })

      document.addEventListener("mousemove", (event) => {
        if (!this.project.selectedScene || !isMouseDown) {
          return;
        }
        let currentX = event.pageX;
        let currentY = event.pageY;
        mouseMoveX = currentX - mouseDownX;
        mouseMoveY = currentY - mouseDownY;
        if (resizePoint) {

        } else if (rotatePoint) {

        } else {
          this.project.selectedScene.selectedComponents.forEach(
            /**
             * @param component {DisplayComponent}
             */
            (component) => {
              let transform = `translateX(${mouseMoveX}px) translateY(${mouseMoveY}px)`;
              displayComponent.style.transform = transform;
              displayComponent.style.webkitTransform = transform;
              displayComponent.style.mozTransform = transform;
              displayComponent.style.msTransform = transform;
            })
        }
      })

      document.addEventListener("mouseup", () => {
        if(isMouseDown && !resizePoint && !rotatePoint){
          this.project.selectedScene.selectedComponents.forEach(
            /**
             * @param component {DisplayComponent}
             */
            (component)=>{
              let style = component.props.style;
              style.left += mouseMoveX;
              style.top += mouseMoveY;
              displayComponent.cssText = component.props.boundingStyle;
          })
        }
        resizePoint = null;
        pointClass = "";
        rotatePoint = null;
        isMouseDown = false;
        displayComponent = null;
      })
    }
  }
</script>

<style scoped lang="scss">
</style>
