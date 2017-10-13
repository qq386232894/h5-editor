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
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
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
    @Prop({required: true}) project: Project;
    @Prop({required: true}) component: DisplayComponent;
    @Prop({required: true}) scene: Scene;

    mounted() {
      let component: DisplayComponent = this.component;
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
