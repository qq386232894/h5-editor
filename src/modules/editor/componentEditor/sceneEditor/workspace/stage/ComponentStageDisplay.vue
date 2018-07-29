<template>
  <div class="gls-component-stage" :style="componentStyle">
    <gls-display-component-editor v-for="component in project.selectedScene.stage.children"
                                  :component="component"
                                  :project="project"
                                  :key="component.props.id"
                                  :scene="project.selectedScene"
    >
    </gls-display-component-editor>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/6/006
   */
  import Vue from 'vue'
  import {Component, Input} from 'angular2-decorators-for-vue'
  import {Stage} from "../../../../core/display/stage/Stage";
  import {Project} from "../../../../core/project/Project";
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";
  import {Renderer} from "../../../../../../common/render/Renderer";

  @Component({
    name: "gls-component-stage",
    components: {
    }
  } as any)
  export default class GlsComponentStageDisplay extends Vue {
    @Input({required: true}) component: Stage;
    @Input({required: true}) project: Project;

    beforeCreate(){
      //typescript的递归组件跟官方文档有点出入啊,主要是vue-loader导致
      this.$options.components.GlsDisplayComponentEditor = require('../displayComponentEditor/DisplayComponentEditor.vue');
      this.$options.components.GlsDisplayComponentEditor = (<any>this.$options.components.GlsDisplayComponentEditor).default;
    }

    mounted() {
      let component: DisplayComponent = this.component;
      component.element = Renderer.getElementById(component.props.id);
      component.renderBounding();

      this.component.play();
    }

    get componentStyle(){
      return {
        backgroundImage:`url("${this.component.style.backgroundImage}")`
      }
    }
  }
</script>

<style scoped lang="scss">
  .gls-component-stage {
    width: 100%;
    height: 100%;
  }
</style>
