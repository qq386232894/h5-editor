<template>
  <div>
    <div class="gls-label-content-right">
      <div class="gls-color-blank">
        <div></div>
      </div>
    </div>
    <div class="gls-label-content-center">
      <div class="gls-color-picker">
        <!--这里用class不能触发popover奇葩,todo 看下popover的源码,估计作者没用computeStyle啊-->
        <div :id="triggerId" :style="style"  @click="onTriggerMouseDownHandler()" ref="trigger"></div>
        <b-popover :target="triggerId" triggers="click" placement="left">
          <sketch-picker @mousedown.native.stop="onMouseDownHandler" :value="value" @input="onColorChangeHandler($event)"/>
        </b-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/9/26
   * 颜色选择器,说真的,vue的脏检测真不如angular2,生命周期也不如,稍微喷一下,这种组件ng2,我一小时能做完,vue耗了3个小时,真奇葩,主要是value不能拦截.
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import Sketch from './vue-color/src/components/Sketch.vue'
  import {Renderer} from "../../../../common/render/Renderer";
  import {utils} from "../../../../common/utils";

  let index = 0;
  @Component({
    name: "GlsColorPicker",
    components: {
      'sketch-picker': Sketch
    }
  })
  export default class GlsColorPicker extends Vue {
    //记录颜色,触发脏检测
    color = {} as any;
    //避免id冲突
    triggerId:string = "";
    //是不是点击了触发器,点击了触发器,就不会隐藏弹出框
    _isMouseDownTrigger:boolean = false;
    //用于内存回收
    _clickRemoveHandler:()=>void;
    @Prop({required:true}) value:Object;

    mounted(){
      this.triggerId =  "colorPickerTrigger" + index ++;

      //点击到触发器或者颜色选择器就不隐藏,其他都隐藏
      this._clickRemoveHandler = Renderer.addEventListener(document,"click",(event)=>{
        if(!this._isMouseDownTrigger && !Renderer.findCloseElementByClass(event.target,"vc-sketch")){
          this.$root.$emit('bv::hide::popover');
        }
        this._isMouseDownTrigger = false;
      });

      //一开始就初始化颜色
      this.color = this.value as any;
    }

    onMouseDownHandler(){

    }

    onTriggerMouseDownHandler(){
      this._isMouseDownTrigger = true;
    }

    //更新颜色,抛出颜色
    onColorChangeHandler(color){
      this.color = color;
      this.$emit("input",color);
    }

    get style(){
      let backgroundColor = "#FFFFFF";
      if(!utils.isEmptyObject(this.color)){
        let rgba = this.color.rgba;
        backgroundColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      }
      return {
        width: '100%',
        height:'20px',
        border:'solid 1px #CCCCCC',
        'background-color': backgroundColor
      }
    }

    beforeDestroy(){
      this._clickRemoveHandler && this._clickRemoveHandler();
    }
  }
</script>

<style lang="scss">
  .gls-color-picker-trigger {

  }

  .gls-color-blank{
    border:solid 1px #E6EBED;
    width:50px;
    height: 20px;
    >div{
      width: 50px;
      height: 1px;
      position: absolute;
      background-color: red;
      transform: rotate(19deg);
      transform-origin: 0 0;
    }
  }
</style>
