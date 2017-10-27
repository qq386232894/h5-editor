<template>
  <div>
    <div class="gls-label-content">
      <label>
        文字颜色
      </label>
      <gls-color-picker v-model="component.style.color"></gls-color-picker>
    </div>

    <div class="gls-label-content">
      <label>
        行高
      </label>
      <gls-slider v-model="component.style.lineHeight" :max="3" :min="0"></gls-slider>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/3/003
   * 用于编辑文本的属性
   */
  import Vue from 'vue'
  import {Component, Input} from 'angular2-decorators-for-vue'
  import GlsColorPicker from '../../../../common/colorPicker/ColorPicker.vue'
  import GlsSlider from '../../../../common/slider/Slider.vue'
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";

  @Component({
    name: "GlsComponentTextEditor",
    components: {
      GlsColorPicker: GlsColorPicker,
      GlsSlider:GlsSlider
    }
  })
  export default class GlsComponentTextEditor extends Vue {
    @Input() component: DisplayComponent;
  }
</script>

<style scoped lang="scss">
</style>
