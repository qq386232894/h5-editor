<template>
  <div :is="component.props.type" :component="component"></div>
</template>

<script>
  import glsComponentText from './text/ComponentText.vue';
  import Vue from 'Vue';
  import {Project} from "../../../core/project/Project";

  /**
   * create by 给力叔 2017/9/10
   * 主要是为了根据组件类型动态编译,所有组件的编辑器都必须在这里注册
   */
  export default {
    name: "gls-dynamic-display-component",
    props: {
      component: Object,
      /**
       * @type {Project}
       */
      project: Project
    },
    data() {
      return {}
    },
    components: {
      glsComponentText: glsComponentText
    }
  }
</script>

<style scoped lang="scss">

</style>
