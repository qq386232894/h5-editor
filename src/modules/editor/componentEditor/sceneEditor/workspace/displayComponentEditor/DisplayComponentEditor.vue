<template>
    <span @mousedown="component.props.selected = true"
          class="gls-display-component"
          :id="component.props.id"
    >
      <!--动态编译出所有子节点-->
      <gls-dynamic-display-component
        :component="component"
        :project="project"
      >
      </gls-dynamic-display-component>

      <!--组件的位置,大小和角度的编辑器-->
      <gls-display-component-select :component="component"></gls-display-component-select>
    </span>
</template>

<script lang="ts">
  import glsDynamicDisplayComponent from './DynamicDisplayComponent.vue'
  import glsDisplayComponentSelect from './DisplayComponentSelect.vue'
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";
  import {Project} from "../../../../core/project/Project";

  /**
   * create by 给力叔 2017/9/15
   */
  export default {
    name: "glsDisplayComponentEditor",
    props: {
      component: {
        type: DisplayComponent,
        require: true
      },
      project: {
        type: Project,
        require: true
      }
    },
    mounted: function () {
      this.$el.style.cssText = this.component.props.boundingStyle;
    },
    data: function () {
      return {}

    },
    components: {
      glsDynamicDisplayComponent: glsDynamicDisplayComponent,
      glsDisplayComponentSelect: glsDisplayComponentSelect
    }
  }
</script>

<style scoped lang="scss">
  .gls-display-component {
    position: absolute;
  }
</style>
