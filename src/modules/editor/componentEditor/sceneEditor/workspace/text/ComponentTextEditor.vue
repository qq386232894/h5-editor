<template>
  <div>
    <div class="gls-label-content">
      <label>
        颜色选择器
      </label>
      <gls-color-picker></gls-color-picker>
    </div>
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

    @Component({
        name: "GlsComponentTextEditor",
        components: {
          GlsColorPicker:GlsColorPicker
        }
    })
    export default class GlsComponentTextEditor extends Vue {
    }
</script>

<style scoped lang="scss">
</style>
