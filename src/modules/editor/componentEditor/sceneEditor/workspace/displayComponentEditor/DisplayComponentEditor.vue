<template>
    <span class="gls-display-component-editor" v-if="component.props.selected" :style="getBoundingStyle">
      <span class="gls-resize-point n-resize"></span>
      <span class="gls-resize-point ne-resize"></span>
      <span class="gls-resize-point e-resize"></span>
      <span class="gls-resize-point se-resize"></span>
      <span class="gls-resize-point s-resize"></span>
      <span class="gls-resize-point sw-resize"></span>
      <span class="gls-resize-point w-resize"></span>
      <span class="gls-resize-point nw-resize"></span>
      <span class="gls-rotate-point"></span>
      <span class="gls-display-component-editor-line"></span>
    </span>
</template>

<script lang="ts">/**
 * create by 给力叔 2017/9/12
 * 组件位置,大小和角度的编辑器
 */
import {DisplayComponent} from "../../../../core/display/DisplayComponent";
export default {
  name: "glsDisplayComponentEditor",
  props: {
    /**
     * @type {DisplayComponent}
     */
    component: {
      type: DisplayComponent,
      require: true
    }
  },
  data: function () {
    return {}
  },
  components: {},
  computed:{
    getBoundingStyle:function () {
      return this.component.props.boundingStyle;
    }
  }
}
</script>

<style lang="scss">
  .gls-display-component-editor {
    z-index: 1;
    box-sizing: border-box;
    border: solid 1px #08A1EF;
    transform-origin: 50% 50%;
    cursor: move;
    position: relative;
    width: 100%;
    height: 100%;
  }

  $size: 12px;
  $half_size: $size/2;

  /*改变大小的点*/
  .gls-resize-point {
    display: inline-block;
    box-sizing: border-box;
    width: $size;
    height: $size;
    background-color: #fff;
    border: 1px solid #08a1ef;
    border-radius: $size;
    z-index: 4;
    transform-origin: 50% 50%;
    position: absolute;
    &.n-resize {
      top: 0;
      left: 50%;
      margin-top: -$half_size;
      margin-left: -$half_size;
      cursor: n-resize;
    }
    &.ne-resize {
      top: 0;
      right: 0;
      margin-top: -$half_size;
      margin-right: -$half_size;
      cursor: ne-resize;
    }
    &.e-resize {
      top: 50%;
      right: 0;
      margin-top: -$half_size;
      margin-right: -$half_size;
      cursor: e-resize;
    }
    &.se-resize {
      right: 0;
      bottom: 0;
      margin-right: -$half_size;
      margin-bottom: -$half_size;
      cursor: se-resize;
    }
    &.s-resize {
      left: 50%;
      bottom: 0;
      margin-left: -$half_size;
      margin-bottom: -$half_size;
      cursor: s-resize;
    }
    &.sw-resize {
      left: 0;
      bottom: 0;
      margin-left: -$half_size;
      margin-bottom: -$half_size;
      cursor: sw-resize;
    }
    &.w-resize {
      left: 0;
      top: 50%;
      margin-top: -$half_size;
      margin-left: -$half_size;
      cursor: w-resize;
    }
    &.nw-resize {
      left: 0;
      top: 0;
      margin-top: -$half_size;
      margin-left: -$half_size;
      cursor: nw-resize;
    }
  }

  /*旋转的那个点*/
  .gls-rotate-point {
    width: $size;
    height: $size;
    background-color: #44cb83;
    margin-top: -$half_size;
    margin-left: -$half_size;
    position: absolute;
    left: 50%;
    top: -20px;
    border-radius: $size;
    z-index: 4;
    cursor: url('../assets/rotate-cursor.png'), default;
  }

  /*旋转点下面那根线条*/
  .gls-display-component-editor-line {
    height: 20px;
    border-left: solid 1px #44cb83;
    left: 50%;
    position: absolute;
    z-index: 3;
    top: -20px;
  }
</style>
