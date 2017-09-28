<template>
  <input type="number" v-model="formatedValue"/>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/28
   * 数字输入框,限制用户输入最大值和最小值
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {utils} from "../../../../common/utils";

  @Component({
    name: "GlsStepper"
  })
  export default class GlsStepper extends Vue {
    @Prop() max: number;

    @Prop({
      default: function () {
        return 0;
      }
    }) value: number;

    @Prop() min: number;
//    格式化之后的值,vue的坑真坑,getter setter的双向绑定可能失效,自定义双向绑定上面,被ng2甩几条街
    formatedValue = 0;

    //一开始就获取输入的值
    beforeMount() {
      this.formatValue(this.value);
    }

    //限制大小
    formatValue(value) {
      if (utils.isDefined(this.max) && value > this.max) {
        value = this.max;
      }
      if (utils.isDefined(this.min) && value < this.min) {
        value = this.min;
      }
      this.formatedValue = value;
    }

    @Watch("formatedValue")
    onFormatedValueChange1(value) {
      this.formatValue(value);
      this.$emit("input", parseFloat(this.formatedValue.toString()));
    }

    //根据外部传入的值实时更新
    @Watch("value")
    onValueChange(newValue) {
      this.formatedValue = parseFloat(newValue);
    }
  }
</script>

<style scoped lang="scss">
  .gls-color-picker {

  }
</style>
