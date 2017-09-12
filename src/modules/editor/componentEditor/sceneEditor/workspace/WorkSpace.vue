<template>
  <div v-if="project.selectedScene" class="stage">
    <gls-display-component-editor :project="project"></gls-display-component-editor>
    <!--todo 看能不能废除span这一层,没有这一层,又触发不了click事件-->
    <span v-for="component in project.selectedScene.stage.children"
          @click="project.selectedScene.selectedComponent = component">
      <!--动态编译出所有子节点-->
      <gls-dynamic-display-component
        :component="component"
        :project="project">
      </gls-dynamic-display-component>
    </span>
  </div>
</template>

<script>
  import glsDynamicDisplayComponent from './DynamicDisplayComponent.vue'
  import glsDisplayComponentEditor from './DisplayComponentEditor.vue'

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
    }
  }
</script>

<style scoped lang="scss">
</style>
