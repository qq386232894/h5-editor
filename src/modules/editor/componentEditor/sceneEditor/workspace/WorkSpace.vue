<template>
  <div v-if="project.selectedScene" class="stage">
    <!--todo 看能不能废除span这一层,没有这一层,又触发不了click事件-->
    <span v-for="component in project.selectedScene.stage.children"
          @click="component.props.selected = true" class="gls-display-component" :style="component.props.boundingStyle">
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

<script>
  import glsDynamicDisplayComponent from './DynamicDisplayComponent.vue'
  import glsDisplayComponentEditor from './DisplayComponentEditor.vue'
  import {Renderer} from "../../../../../common/render/Renderer";

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
    mounted:function () {
      document.addEventListener("mousedown",(event)=>{
        if(!this.project.selectedScene){
          return;
        }

        let target = event.target;

        let displayComponent;
        if(displayComponent = Renderer.findCloseElementByClass(target,"gls-display-component")){
          console.log(displayComponent);
        }else{
          this.project.selectedScene.clearSelection();
        }
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
