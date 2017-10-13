<template>
  <div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/3/003
   * 用于编辑文本的属性
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import GlsColorPicker from '../../../../common/colorPicker/ColorPicker.vue'
  import GlsSlider from '../../../../common/slider/Slider.vue'
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";

  @Component({
    name: "GlsComponentStageEditor",
    components: {
      GlsColorPicker: GlsColorPicker,
      GlsSlider: GlsSlider
    }
  })
  export default class GlsComponentImageEditor extends Vue {
    @Prop() component: DisplayComponent;
  }
</script>

<style scoped lang="scss">
</style>
