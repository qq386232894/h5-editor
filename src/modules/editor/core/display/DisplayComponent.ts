/**
 * Created by 给力叔 on 2017/9/8.
 */
import {Properties} from "./property/Properties";
import {utils} from "../../../../common/utils";
import {IStyle} from "./style/IStyle";
import {Devices} from "../device/Devices";
import {AnimationConfig} from "./config/AnimationConfig";
import {Scene} from "../scene/Scene";

export class DisplayComponent {
  /**
   * 组件的所有属性,这个属性最终会保存在服务器,其他属性都不会保存在服务器.
   * @type {Properties}
   */
  props = new Properties();
  parent = null;
  element: HTMLElement;
  playingIndex = 0;            //动画有多个，标记动画播放的位置
  playingTimeout: number = -1; //每个动画播放，使用setTimeout
  scene: Scene = null;          //组件所属的场景，动态编译的时候会补上这个属性

  /**
   * 渲染出组件的位置,大小,角度
   */
  renderBounding() {
    this.element.style.cssText = this.boundingStyle;
  }

  /**
   * 从另外一个组件进行初始化
   * @param {DisplayComponent} target
   */
  initFromComponent(target: DisplayComponent) {
    let props: Properties = utils.copy(target.props);
    props.id = this.props.id;
    Object.assign(this.props, props);
    this.props.selected = true;
  }

  /**
   * 获取组件的样式,todo 目前只支持PC样式
   */
  get style(): IStyle {
    return this.props._style[Devices.PC];
  }

  set style(value) {
    this.props._style[Devices.PC] = value;
  }

  /**
   * 获取大小位置,角度的样式
   * @returns {string}
   */
  get boundingStyle(): string {
    let style = this.style;
    let resetTranslate = " translate3d(0,0,0)";
    return `
    position:absolute;
    top:${style.top}px;
    left:${style.left}px;
    width:${style.width}px;
    height:${style.height}px;
    transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -ms-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -moz-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -webkit-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    -o-transform:rotateZ(${style.rotate}deg)${resetTranslate};
    `;
  }

  get componentSelectStyle(): string {
    let style = this.style;
    return `
    position:absolute;
    top:0px;
    left:0px;
    width:${style.width}px;
    height:${style.height}px;
      `;
  }

  /**
   * 播放指定的动画
   * @param {number} duration
   * @param {number} delay
   * @param {number} time
   */
  animate(animationType: string, duration: number, delay: number, time: number = 1, loop: boolean = false) {
    let animationStyle = `${animationType} ${duration}s ease ${delay}s ${loop ? 'infinite' : time} normal both`;
    this.element.style.webkitAnimation = animationStyle
    this.element.style.animation = animationStyle;
  }

  /**
   * 停止播放动画
   */
  stop() {
    this.element.style.webkitAnimation = "";
    this.element.style.animation = "";
    this.playingIndex = 0;
    clearTimeout(this.playingTimeout);
  }

  /**
   * 开始播放动画
   */
  play() {
    this.stop();
    this.playNext();
  }

  /***
   * 播放下一个动画
   * @returns {boolean}
   */
  playNext() {
    let animationConfigs = this.props.animationConfigs;
    for (; this.playingIndex < this.props.animationConfigs.length; this.playingIndex++) {
      let animationConfig = animationConfigs[this.playingIndex];
      if (this.isAnimationConfigValid(animationConfig)) {
        this.animate(animationConfig.animationType, animationConfig.duration, animationConfig.delay, animationConfig.time, animationConfig.loop);
        if (!animationConfig.loop) {
          clearTimeout(this.playingTimeout);
          this.playingTimeout = setTimeout(() => {
            this.playNext();
          }, (animationConfig.duration + animationConfig.delay) * 1000 * animationConfig.time);
        }
        this.playingIndex++;
        return true;
      }
    }
    return false;
  }

  /**
   * 是不是有效的动画
   * @param {AnimationConfig} animationConfg
   * @returns {string | number}
   */
  isAnimationConfigValid(animationConfg: AnimationConfig) {
    if (animationConfg) {
      return animationConfg.animationType && animationConfg.duration && animationConfg.delay >= 0;
    }
  }
}
