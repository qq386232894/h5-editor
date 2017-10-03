<template>
    <span @click="onMouseDownHandler(component,$event)"
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
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'

  @Component({
    name: "GlsDisplayComponentEditor",
    components: {
      glsDynamicDisplayComponent: glsDynamicDisplayComponent,
      glsDisplayComponentSelect: glsDisplayComponentSelect
    }
  })
  export default class GlsDisplayComponentEditor extends Vue {
    @Prop({required: true}) project: Project;
    @Prop({required: true}) component: DisplayComponent;

    mounted() {
      this.$el.style.cssText = this.component.boundingStyle;
    }

    onMouseDownHandler(component, $event) {
//      if (!($event.ctrlKey)) {
//        this.project.selectedScene.clearSelection();
//      }
//      component.props.selected = true
    }
  }
</script>

<style scoped lang="scss">
  .gls-display-component {
    position: absolute;
  }
</style>
