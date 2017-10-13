<template>
  <div class="gls-scene-editor">
    <!--为了居中-->
    <div class="center">
      <div class="phone">
        <div class="header">
          <div class="title">{{project.selectedScene.props.name}}</div>
        </div>
        <div class="editor">
          <gls-work-space :project="project" :key="project.selectedScene.props.id"></gls-work-space>
        </div>
      </div>
      <div class="control-bar"></div>
    </div>

    <div class="gls-scene-editor-bar">
      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-back"></span>
      </div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-recover"></span>
      </div>

      <div class="bar-button" @click="playScene()" v-b-tooltip.hover.right="'刷新预览'">
        <span class="iconfont icon-play"></span>
      </div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-copy"></span>
      </div>

      <div class="split-line"></div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-bg"></span>
      </div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-music"></span>
      </div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-effect"></span>
      </div>

      <div class="split-line"></div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-grid"></span>
      </div>

      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-phone"></span>
      </div>

      <!--警告-->
      <div class="bar-button gray" v-b-tooltip.hover.right="'开发中'">
        <span class="iconfont icon-caution"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import glsWorkSpace from './workspace/WorkSpace.vue';
  import {Project} from "../../core/project/Project";

  @Component({
    name: "gls-scene-editor",
    components: {
      glsWorkSpace: glsWorkSpace
    }
  })
  export default class GlsSceneEditor extends Vue {
    @Prop({required:true}) project:Project;
    playScene(){
      if(this.project.selectedScene){
        this.project.selectedScene.play();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .gls-scene-editor {
    overflow: auto;
    height: 100%;
    position: fixed !important;
    top: $header_height;
    bottom: 0;
    left: 333px;
    right: 260px;

    /*编辑器右边的控制栏*/
    .gls-scene-editor-bar {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40px;
      height: 400px;
      transform: translate(165px, -50%);
      background-color: #68686C;

      /*k控制栏里面的按钮*/
      .bar-button {
        color: #FFFFFF;
        padding: 10px;
        cursor: pointer;
        text-align: center;
        &:hover {
          background-color: #2A2B29;
          color: #FFFFFF;
        }
        &.gray{
          color:#999999;
        }
      }

      /*分割线*/
      .split-line {
        border-top: solid 1px $devide_color;
      }
    }
  }

  .center {
    width: 326px;
    height: 620px;
    margin: 150px auto;
    position: relative;
  }

  .phone {
    border-radius: 35px;
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    position: relative;
    $header_top: 37px;
    $header_height: 60px;
    .header {
      position: absolute;
      left: 3px;
      top: $header_top;
      right: 3px;
      height: $header_height;
      background-image: url("./header.png");
    }

    .title {
      position: relative;
      top: 30px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #FFFFFF;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .editor {
      position: absolute;
      top: $header_top + $header_height;
      left: 3px;
      right: 3px;
      height: 486px;
    }
  }
</style>
