<template>
  <div class="gls-panel" @mousedown.stop="onMousedownHandler()">
    <div class="gls-panel--header">
      <a>{{title}}</a>
      <gls-button borderRadiusType="ui-border-radius-0" type="transparent">
        <div class="iconfont icon-close"></div>
      </gls-button>
      <div class="ui-clear-both"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/23/023
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import glsButton from '../../common/button/Button'

  @Component({
    name: "gls-panel",
    components: {
      glsButton: glsButton
    }
  })
  export default class GlsPanel extends Vue {
    @Prop() title: String;

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
    background-color: #FFFFFF;
    left: 300px;//todo 测试用，记得删除
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
