<template>
  <div ref="container" class="ui-overlay-panel" :style="panelStyle" @click="onPanelClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/24/024
   * 弹出框，找不到开源的，只能自己写一个了
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Renderer} from "../../../../common/render/Renderer";

  @Component({
    name: "GlsOverlayPanel",
    components: {}
  })
  export default class GlsOverlayPanel extends Vue {
    //整个元素
    container: any;
    //当前组件可见吗
    visible: boolean = false;
    //是不是点击了自己，点击自己就不隐藏了
    selfClick: boolean = false;
    //防止显示不出来用的
    targetEvent: boolean = false;

    //用于回收全局的点击事件
    clickHandler: () => void;

    mounted() {
      this.container = this.$refs.container;
      Renderer.appendChild(document.body, this.container);

      this.clickHandler = Renderer.addEventListener(document, "click", () => {
        if (!this.selfClick && !this.targetEvent) {
          this.hide();
        }
        this.selfClick = false;
        this.targetEvent = false;
      })
    }

    //显示
    show(event, target?) {
      let elementTarget = target || event.currentTarget || event.target;
      this.targetEvent = true;
      if (this.visible) {//已经显示了，就直接调整位置
        Renderer.absolutePosition(this.container, elementTarget);
      }
      else {
        this.visible = true;
        this.container.style.display = "block";//直接显示一下吧，下面的方法里才能计算出它的大小
        Renderer.absolutePosition(this.container, elementTarget);
//        Renderer.fadeIn(this.container, 250);
      }
    }

    //隐藏
    hide() {
      if (this.selfClick) {//点击自己就隐藏了
        return;
      }
      this.visible = false;
    }

    onPanelClick() {
      this.selfClick = true;
    }

    get panelStyle() {
      return {
        display: this.visible ? "block" : "none"
      }
    }

    beforeDestroy() {
      this.clickHandler && this.clickHandler();
      Renderer.removeChild(document.body, this.container);
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/index";

  .ui-overlay-panel {
    position: absolute;
    @include grayShadow;
    background-color: #FFFFFF;
  }
</style>
