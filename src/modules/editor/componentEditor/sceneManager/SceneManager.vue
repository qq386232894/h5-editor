<template>
  <div class="gls-scene-manager">
    <div class="manager-header">
      <a>场景编辑</a>
      <gls-button type="black" label="复制" hoverType="hover-success"></gls-button>
      <gls-button type="black" label="删除" class="delete-button" hoverType="hover-danger"></gls-button>
    </div>
    <div class="manager-content">
      <div :class="{scene:true,selected:project.selectedScene === scene}" v-for="(scene,index) in project.scenes"
           @click="project.selectedScene = scene">
        <span class="number"></span>
        <span class="index">{{index}}</span>
        <span class="name">{{scene.config.name}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/16
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import glsButton from '../../common/button/Button.vue';
  import {Project} from "../../core/project/Project";

  @Component({
    name: "gls-scene-manager",
    components: {
      glsButton: glsButton
    }
  })
  export default class SceneManager
    extends Vue {
    @Prop({required: true}) project: Project;
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  $width: 260px;
  .gls-scene-manager {
    position: fixed;
    top: $header_height;
    right: 0;
    bottom: 0;
    width: $width;
    background-color: #FFFFFF;
  }

  $manager_header_height: 45px;

  .manager-header {
    height: $manager_header_height;
    background-color: #76838F;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    position: relative;
    color: white;
    a {
      line-height: $manager_header_height - 10px;
    }
    /*两个按钮向右浮动*/
    .gls-button {
      float: right;
    }
    /*按钮之间增加间距*/
    .delete-button {
      margin-right: 3px;
    }
  }

  .manager-content {
    position: fixed;
    top: $header_height + $manager_header_height;
    right: 0;
    bottom: 0;
    width: $width;
  }

  /*每个场景的选项*/
  .scene {
    height: 70px;
    font-size: 12px;
    margin: 5px 5px 0 5px;
    position: relative;
    border: 1px solid #ccd5db;
    color: #76838f;
    cursor: pointer;

    &.selected {
      .number {
        border-top-color: #08a1ef;
      }
    }

    &:hover {
      background-color: #F0F3F4;
    }

    .number {
      border-top: 35px solid #76838F;
      border-right: 35px solid transparent;
      position: relative;
      top: 35px;
    }

    .index {
      position: absolute;
      top: 0px;
      left: 0px;
      color: #FFFFFF;
      display: inline-block;
      width: 20px;
      text-align: center;
    }

    .name {
      position: absolute;
      top: 25px;
      left: 35px;
    }
  }
</style>
