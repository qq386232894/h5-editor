<template>
  <div v-if="project.selectedScene" class="stage">
    <gls-dynamic-display-component v-for="component in project.selectedScene.stage.children" :component="component">
    </gls-dynamic-display-component>
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
    }
  }
</script>

<style scoped lang="scss">

</style>
