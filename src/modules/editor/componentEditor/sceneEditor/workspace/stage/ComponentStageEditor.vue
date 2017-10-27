<template>
  <div>
    <!--todo ，没对接后端，这里只搞了模拟用的背景图下拉框-->
    <div class="gls-label-content">
      <label>
        背景图
      </label>
      <div>
        <b-form-select v-model="component.style.backgroundImage">
          <option value="">无背景</option>
          <option value="/api/getImage.jpg?id=bg.jpg">背景1</option>
          <option value="/api/getImage.jpg?id=bg1.png">背景2</option>
          <option value="/api/getImage.jpg?id=bg2.jpg">背景3</option>
          <option value="/api/getImage.jpg?id=bg3.jpg">背景4</option>
          <option value="/api/getImage.jpg?id=bg4.jpg">背景5</option>
          <option value="/api/getImage.jpg?id=bg5.png">背景6</option>
        </b-form-select>
      </div>
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
    name: "GlsComponentStageEditor",
    components: {
      GlsColorPicker: GlsColorPicker,
      GlsSlider: GlsSlider
    }
  })
  export default class GlsComponentStageEditor extends Vue {
    @Input() component: DisplayComponent;
  }
</script>

<style scoped lang="scss">
</style>
