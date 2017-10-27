<template>
    <span class="gls-display-component"
          :id="component.props.id"
    >
      <!--动态编译出组件-->
       <div :is="component.props.type" :component="component" :project="project"></div>
      <!--组件的位置,大小和角度的编辑器-->
      <gls-display-component-select :component="component"></gls-display-component-select>
    </span>
</template>

<script lang="ts">
  import DisplayComponentSelect from './DisplayComponentSelect.vue'
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";
  import {Project} from "../../../../core/project/Project";

  /**
   * create by 给力叔 2017/9/15
   */
  import Vue from 'vue'
  import {Component, Input} from 'angular2-decorators-for-vue'
  import {Renderer} from "../../../../../../common/render/Renderer";
  import ComponentTextDisplay from '../text/ComponentTextDisplay.vue';
  import GlsComponentStageDisplay from '../stage/ComponentStageDisplay.vue';
  import GlsComponentImageDisplay from '../image/ComponentImageDisplay.vue';
  import {Scene} from "../../../../core/scene/Scene";

  @Component({
    name: "GlsDisplayComponentEditor",
    components: {
      glsDisplayComponentSelect: DisplayComponentSelect,
      GlsComponentText:ComponentTextDisplay,
      GlsComponentStage:GlsComponentStageDisplay,
      GlsComponentImage:GlsComponentImageDisplay
    }
  })
  export default class GlsDisplayComponentEditor extends Vue {
    @Input({required: true}) project: Project;
    @Input({required: true}) component: DisplayComponent;
    @Input({required: true}) scene: Scene;

    mounted() {
      let component: DisplayComponent = this.component;
      //todo 废除这种赋值element的方式，代码难维护
      component.element = Renderer.getElementById(component.props.id);
      component.renderBounding();
      component.scene = this.scene;
      this.component.play();
    }
  }
</script>

<style scoped lang="scss">
  .gls-display-component {
    position: absolute;
  }
</style>
