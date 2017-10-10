<template>
  <div class="icon-label-list">
    <gls-icon-label :label="'文本'" @click="createComponent('gls-component-text')" :icon="'text'"></gls-icon-label>
    <gls-icon-label :label="'图片'" :icon="'image'"></gls-icon-label>
    <gls-icon-label :label="'背景'" :icon="'background'"></gls-icon-label>
    <gls-icon-label :label="'音乐'" :icon="'music'"></gls-icon-label>
    <gls-icon-label :label="'形状'" :icon="'svg'"></gls-icon-label>
  </div>
</template>

<script lang="ts">
  import glsIconLabel from './IconLabel';

  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Project} from "../../core/project/Project";
  import {DisplayComponentFactory} from "../../core/factorys/display/DisplayComponentFactory";

    @Component({
      name: "GlsComponentBar",
      components: {
        glsIconLabel: glsIconLabel
      }
    })
    export default class GlsComponentBar extends Vue {
      @Prop({required:true}) project: Project;
      createComponent(type){
        let component = DisplayComponentFactory.getInstance().createComponent(this.project,type);
        this.project.selectedScene.stage.addChild(component);
        this.project.selectedScene.clearSelection();
        component.props.selected = true;
      }
    }
</script>

<style scoped>
  .icon-label-list {
    text-align: center;
  }
</style>
