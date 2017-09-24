<template>
  <gls-panel title="组件设置">
    <div class="container">
      <div class="label-content">
        <label>
          复选框
        </label>
        <div>
          <checkbox name="food[]" value="pizza" v-model="checkboxValue" checked>
            复选框测试
          </checkbox>
        </div>
      </div>

      <div class="label-content">
        <label>
          单选框
        </label>
        <div>
          <radio name="robot" value="yes" v-model="radioValue" checked>
            单选1
          </radio>
          <radio name="robot" value="no" v-model="radioValue">
            单选2
          </radio>
        </div>
      </div>

      <div class="label-content">
        <label>
          单行文本
        </label>
        <div>
          <input/>
        </div>
      </div>

      <div class="label-content">
        <label>
          多行文本
        </label>
        <div>
          <textarea></textarea>
        </div>
      </div>

      <div class="label-content">
        <label>
          数字
        </label>
        <div>
          <input type="number"/>
        </div>
      </div>

      <div class="label-content">
        <label>
          浮动框
        </label>
        <div>
          <gls-overlay-panel ref="colorPanel">
            666
          </gls-overlay-panel>
          <div style="width: 16px;height:16px;background-color: red" @click="$refs.colorPanel.show($event)"></div>
        </div>
      </div>
    </div>
  </gls-panel>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/19
   * 单选的时候的组件编辑器,也就是组件的属性编辑器了
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Scene} from "../../core/scene/Scene";
  import glsPanel from "../../common/panel/Panel";
  import checkbox from "../../common/checkbox/Checkbox.vue";
  import radio from "../../common/radio/Radio.vue";
  import GlsOverlayPanel from "../../common/overlayPanel/OverlayPanel.vue"

  @Component({
    name: "GlsSingleSelectEditor",
    components: {
      glsPanel: glsPanel,
      checkbox: checkbox,
      radio: radio,
      GlsOverlayPanel:GlsOverlayPanel
    }
  })
  export default class GlsSingleSelectEditor extends Vue {
    @Prop({required: true}) scene: Scene;

//    todo 测试数据，记得删
    checkboxValue = true;
    radioValue = "yes";

    show(){
      console.log(this.$refs.colorPanel);
    }
  }
</script>

<style scoped lang="scss">
  .label-content {
    padding: 5px 0;
    position: relative;
    > label {
      display: inline-block;
      width: 70px;
      position: absolute;
      left: 0;
      top: 5px;
      height: 18px;
      line-height: 18px;
    }
    > div {
      margin-left: 70px;
      >input{
        width: 100%;
      }
      textarea{
        width: 100%;
      }
    }
  }

  .container {
    padding: 0 20px;
  }
</style>
