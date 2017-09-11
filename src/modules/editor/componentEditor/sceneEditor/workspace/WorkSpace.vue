<template>
  <div v-if="project.selectedScene" class="stage">
    <span class="display-component-editor" v-if="!!selectedComponent" :style="selectedComponent.props.style">
      <span class="point-top"></span>
    </span>
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
  import glsDynamicDisplayComponent from './DynamicDisplayComponent.vue';

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
      glsDynamicDisplayComponent: glsDynamicDisplayComponent
    },
    computed: {
      selectedComponent: function () {
        return this.project && this.project.selectedScene && this.project.selectedScene.selectedComponent ? this.project.selectedScene.selectedComponent : null;
      }
    }
  }
</script>

<style scoped lang="scss">
  .display-component-editor {
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    border: solid 1px #08A1EF;
  }
</style>
