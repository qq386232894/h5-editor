<template>
  <div class="gls-panel" @mousedown.stop="onMousedownHandler()"
       v-draggable="{elementRect:{top: 0, left: 0, bottom: 0, right: 1}}">
    <div class="gls-panel--header" :id="headerId">
      <a>{{title}}</a>
      <gls-button borderRadiusType="ui-border-radius-0" type="transparent">
        <div class="iconfont icon-close"></div>
      </gls-button>
      <div class="ui-clear-both"></div>
    </div>
    <div @mousedown.stop="onMousedownHandler()">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/23/023
   */
  import Vue from 'vue'
  import {Component, Input} from 'angular2-decorators-for-vue'
  import glsButton from '../../common/button/Button'

  let index = 0;
  @Component({
    name: "gls-panel",
    components: {
      glsButton: glsButton
    }
  } as any)
  export default class GlsPanel extends Vue {
    @Input() title: String;
    headerId = "";

    created() {
      this.headerId = `gls-header${index++}`;
    }

    onMousedownHandler() {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .gls-panel {
    position: absolute;
    width: 300px;
    height: 800px;
    @include grayShadow;
    background-color: #f0f3f4;
    left: 300px; //todo 测试用，记得删除
  }

  .gls-panel--header {
    height: 27px;
    background-color: #31364a;
    cursor: move;
    color: #ffffff;
    a {
      line-height: 27px;
      padding-left: 3px;
    }
    .gls-button {
      float: right;
    }
  }

</style>
