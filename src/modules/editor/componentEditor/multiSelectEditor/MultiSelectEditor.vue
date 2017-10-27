<template>
  <div class="gls-multi-select-editor">
    <!--左对齐-->
    <span class="iconfont icon-left-align" @click="scene.leftAlign()" v-b-tooltip.hover.bottom="'左对齐'"></span>
    <!--水平居中对齐-->
    <span class="iconfont icon-horizontal-center-align" @click="scene.horizontalCenterAlign()"
          v-b-tooltip.hover.bottom="'水平居中对齐'"></span>
    <!--右对齐-->
    <span class="iconfont icon-right-align" @click="scene.rightAlign()" v-b-tooltip.hover.bottom="'右对齐'"></span>
    <!--上对齐-->
    <span class="iconfont icon-top-align" @click="scene.topAlign()" v-b-tooltip.hover.bottom="'上对齐'"></span>
    <!--垂直居中对齐-->
    <span class="iconfont icon-vertical-center-align" @click="scene.verticalCenterAlign()"
          v-b-tooltip.hover.bottom="'垂直居中对齐'"></span>
    <!--下对齐-->
    <span class="iconfont icon-bottom-align" @click="scene.bottomAlign()" v-b-tooltip.hover.bottom="'下对齐'"></span>
    <!--垂直均分-->
    <span class="iconfont icon-vertical-equal" @click="scene.verticalEqual()" v-b-tooltip.hover.bottom="'垂直均分'"></span>
    <!--水平均分-->
    <span class="iconfont icon-horizontal-equal" @click="scene.horizontalEqual()"
          v-b-tooltip.hover.bottom="'水平均分'"></span>
    <!--分隔线-->
    <div class="split-line"></div>


    <!--复制-->
    <span class="iconfont icon-copy" @click="copyPasteManager.copy()" v-b-tooltip.hover.bottom="'复制'"></span>
    <!--黏贴-->
    <span :class="{'iconfont icon-paste':true,'disabled':!copyPasteManager.hasCopies()}"
          @click="copyPasteManager.paste()" v-b-tooltip.hover.bottom="'粘贴'"></span>
    <!--删除-->
    <span class="iconfont icon-delete" @click="scene.removeSelection()" v-b-tooltip.hover.bottom="'删除'"></span>
    <!--分隔线-->
    <div class="split-line"></div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/19
   * 多选的编辑器
   */
  import Vue from 'vue'
  import {Component, Input, Inject, ServiceStore} from 'angular2-decorators-for-vue'
  import {Scene} from "../../core/scene/Scene";
  import {CopyPasteManager} from "../../core/parse/CopyPasteManager";

  @Component({
    name: "GlsMultiSelectEditor",
    components: {}
  })
  export default class GlsMultiSelectEditor extends Vue {
    @Input({required: true}) scene: Scene;

    @Input({
      default: function () {
        return ServiceStore.getInstance().getService(CopyPasteManager);
      }
    }) copyPasteManager: CopyPasteManager;
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .gls-multi-select-editor {
    padding: 10px;
  }

  $size: 28px;
  .iconfont {
    cursor: pointer;
    width: $size;
    height: $size;
    line-height: $size;
    text-align: center;
    display: inline-block;
    color: #76838E;
    &:hover {
      color: #59C7F9;
    }
    &.disabled {
      color: #D6DADE;
    }
  }

  .split-line {
    border-bottom: solid 1px #E8E8E8;
    padding-top: 8px;
    margin-bottom: 8px;
  }
</style>
