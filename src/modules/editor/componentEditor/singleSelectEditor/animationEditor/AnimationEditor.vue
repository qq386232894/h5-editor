<template>
  <div>
    <div class="gls-animation-editor-header">
      <div class="add-animation" @click="addAnimation">
        <span class="iconfont icon-add"></span>
        <span>添加动画</span>
      </div>
      <div class="preview" @click="preview">
        <span class="iconfont icon-play"></span>
        <span>预览动画</span>
      </div>
    </div>

    <!--每个动画的配置-->
    <div class="gls-animation-editor-content">
      <div class="gls-animation-editor-content-configs">
        <div v-for="(animationConfig,index) in component.props.animationConfigs">
          <div class="gls-animation-header ui-padding-md ui-cursor-pointer">
            <span class="iconfont icon-remove ui-float-right" @click="removeAnimation(index)"></span>
            动画{{index}}
          </div>
          <div class="ui-padding-md">
            <div class="gls-label-content">
              <label>
                方式
              </label>
              <div>
                <b-form-select v-model="animationConfig.animationType" class="mb-3" @input="preview">
                  <optgroup label="Attention Seekers">
                    <option value="bounce">bounce</option>
                    <option value="flash">flash</option>
                    <option value="pulse">pulse</option>
                    <option value="rubberBand">rubberBand</option>
                    <option value="shake">shake</option>
                    <option value="swing">swing</option>
                    <option value="tada">tada</option>
                    <option value="wobble">wobble</option>
                    <option value="jello">jello</option>
                  </optgroup>

                  <optgroup label="Bouncing Entrances">
                    <option value="bounceIn">bounceIn</option>
                    <option value="bounceInDown">bounceInDown</option>
                    <option value="bounceInLeft">bounceInLeft</option>
                    <option value="bounceInRight">bounceInRight</option>
                    <option value="bounceInUp">bounceInUp</option>
                  </optgroup>

                  <optgroup label="Bouncing Exits">
                    <option value="bounceOut">bounceOut</option>
                    <option value="bounceOutDown">bounceOutDown</option>
                    <option value="bounceOutLeft">bounceOutLeft</option>
                    <option value="bounceOutRight">bounceOutRight</option>
                    <option value="bounceOutUp">bounceOutUp</option>
                  </optgroup>

                  <optgroup label="Fading Entrances">
                    <option value="fadeIn">fadeIn</option>
                    <option value="fadeInDown">fadeInDown</option>
                    <option value="fadeInDownBig">fadeInDownBig</option>
                    <option value="fadeInLeft">fadeInLeft</option>
                    <option value="fadeInLeftBig">fadeInLeftBig</option>
                    <option value="fadeInRight">fadeInRight</option>
                    <option value="fadeInRightBig">fadeInRightBig</option>
                    <option value="fadeInUp">fadeInUp</option>
                    <option value="fadeInUpBig">fadeInUpBig</option>
                  </optgroup>

                  <optgroup label="Fading Exits">
                    <option value="fadeOut">fadeOut</option>
                    <option value="fadeOutDown">fadeOutDown</option>
                    <option value="fadeOutDownBig">fadeOutDownBig</option>
                    <option value="fadeOutLeft">fadeOutLeft</option>
                    <option value="fadeOutLeftBig">fadeOutLeftBig</option>
                    <option value="fadeOutRight">fadeOutRight</option>
                    <option value="fadeOutRightBig">fadeOutRightBig</option>
                    <option value="fadeOutUp">fadeOutUp</option>
                    <option value="fadeOutUpBig">fadeOutUpBig</option>
                  </optgroup>

                  <optgroup label="Flippers">
                    <option value="flip">flip</option>
                    <option value="flipInX">flipInX</option>
                    <option value="flipInY">flipInY</option>
                    <option value="flipOutX">flipOutX</option>
                    <option value="flipOutY">flipOutY</option>
                  </optgroup>

                  <optgroup label="Lightspeed">
                    <option value="lightSpeedIn">lightSpeedIn</option>
                    <option value="lightSpeedOut">lightSpeedOut</option>
                  </optgroup>

                  <optgroup label="Rotating Entrances">
                    <option value="rotateIn">rotateIn</option>
                    <option value="rotateInDownLeft">rotateInDownLeft</option>
                    <option value="rotateInDownRight">rotateInDownRight</option>
                    <option value="rotateInUpLeft">rotateInUpLeft</option>
                    <option value="rotateInUpRight">rotateInUpRight</option>
                  </optgroup>

                  <optgroup label="Rotating Exits">
                    <option value="rotateOut">rotateOut</option>
                    <option value="rotateOutDownLeft">rotateOutDownLeft</option>
                    <option value="rotateOutDownRight">rotateOutDownRight</option>
                    <option value="rotateOutUpLeft">rotateOutUpLeft</option>
                    <option value="rotateOutUpRight">rotateOutUpRight</option>
                  </optgroup>

                  <optgroup label="Sliding Entrances">
                    <option value="slideInUp">slideInUp</option>
                    <option value="slideInDown">slideInDown</option>
                    <option value="slideInLeft">slideInLeft</option>
                    <option value="slideInRight">slideInRight</option>

                  </optgroup>
                  <optgroup label="Sliding Exits">
                    <option value="slideOutUp">slideOutUp</option>
                    <option value="slideOutDown">slideOutDown</option>
                    <option value="slideOutLeft">slideOutLeft</option>
                    <option value="slideOutRight">slideOutRight</option>

                  </optgroup>

                  <optgroup label="Zoom Entrances">
                    <option value="zoomIn">zoomIn</option>
                    <option value="zoomInDown">zoomInDown</option>
                    <option value="zoomInLeft">zoomInLeft</option>
                    <option value="zoomInRight">zoomInRight</option>
                    <option value="zoomInUp">zoomInUp</option>
                  </optgroup>

                  <optgroup label="Zoom Exits">
                    <option value="zoomOut">zoomOut</option>
                    <option value="zoomOutDown">zoomOutDown</option>
                    <option value="zoomOutLeft">zoomOutLeft</option>
                    <option value="zoomOutRight">zoomOutRight</option>
                    <option value="zoomOutUp">zoomOutUp</option>
                  </optgroup>

                  <optgroup label="Specials">
                    <option value="hinge">hinge</option>
                    <option value="jackInTheBox">jackInTheBox</option>
                    <option value="rollIn">rollIn</option>
                    <option value="rollOut">rollOut</option>
                  </optgroup>
                </b-form-select>
              </div>
            </div>


            <div class="gls-label-content">
              <label>
                时间
              </label>
              <gls-slider v-model="animationConfig.duration" :max="20" :min="0" type="integer"></gls-slider>
            </div>


            <div class="gls-label-content">
              <label>
                延迟
              </label>
              <gls-slider v-model="animationConfig.delay" :max="20" :min="0" type="integer"></gls-slider>
            </div>

            <div class="gls-label-content">
              <label>
                次数
              </label>
              <div>
                <div class="gls-label-content-right width-100">
                  <b-form-checkbox
                    v-model="animationConfig.loop"
                    :value="true"
                    :unchecked-value="false">
                    循环
                  </b-form-checkbox>
                </div>
                <div class="gls-label-content-center margin-right-100">
                  <gls-stepper v-model="animationConfig.time" :max="20" :min="0"></gls-stepper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/3/003
   * 组件动画编辑器
   */
  import Vue from 'vue'
  import {Component, Input} from 'angular2-decorators-for-vue'
  import {DisplayComponent} from "../../../core/display/DisplayComponent";
  import {AnimationConfig} from "../../../core/display/config/AnimationConfig";
  import GlsSlider from '../../../common/slider/Slider.vue';
  import GlsStepper from '../../../common/stepper/Stepper.vue';
  import {Renderer} from "../../../../../common/render/Renderer";

  let index = 0;
  @Component({
    name: "GlsAnimationEditor",
    components: {
      GlsSlider: GlsSlider,
      GlsStepper: GlsStepper
    }
  })
  export default class GlsAnimationEditor extends Vue {
    @Input({required: true}) component: DisplayComponent;
    index = 0;

    contentName = "animationEditorContent";

    beforeMount() {
      this.index = ++index;
    }

    addAnimation() {
      this.component.props.animationConfigs.push(new AnimationConfig());
    }

    preview() {
      this.component.stop();
      setTimeout(() => {
        this.component.play();
      })
    }

    removeAnimation(index) {
      this.component.props.animationConfigs.splice(index, 1);
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../common/scss/index.scss";
  //头部
  .gls-animation-editor-header {
    border-bottom: solid 1px $devide_color;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;

    .preview, .add-animation {
      text-align: center;
      width: 50%;
      display: inline-block;
      float: left;
      cursor: pointer;
      &:hover {
        color: $hover_color;
      }
    }
  }

  .width-100 {
    width: 100px;
  }

  .margin-right-100 {
    margin-right: 100px;
  }

  //每个动画的头部
  .gls-animation-header {
    height: 40px;
    line-height: 20px;
    box-sizing: border-box;
    border-top: solid 1px $devide_color;
  }

  //内容
  .gls-animation-editor-content {
    position: absolute;
    bottom: 0;
    top: 102px
  }

  .gls-animation-editor-content-configs{
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
