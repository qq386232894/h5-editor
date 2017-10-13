/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "../DisplayComponent";
import {Properties} from "../property/Properties";
import {utils} from "../../../../../common/utils";
import {GlsEvent} from "../../../../../common/event/GlsEvent";

export const GLS_COMPONENT_IMAGE = 'gls-component-image';

export class ComponentImageProperties extends Properties {
  src = "";                                          //图片的路径
  originalWidth: number = -1;                      //图片原本的宽度
  originalHeight: number = -1;                     //图片原本的高度
  hasGetImageSize: string = "";                    //是不是获取过图片的大小
  width: number = 100;
  height: number = 100;
}

export class ComponentImage extends DisplayComponent {
  props = new ComponentImageProperties();

  constructor() {
    super();
    this.style = {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      rotate: 0
    }
  }

  //这里跟易企秀的不一样，感觉这样的图片好用点,算法是让图片永远不超框
  onResize() {
    super.onResize();
    this.caculateImageSize();
  }

  caculateImageSize() {
    let props = this.props,
      style = this.style;
    if (props.originalWidth == -1) {
      props.width = style.width;
      props.height = style.height;
    } else {
      let radio = style.width / style.height;
      let originalRadio = props.originalWidth / props.originalHeight;
      let width, height;
      if (radio > originalRadio) {
        height = style.height;
        width = height * originalRadio;
      } else {
        width = style.width;
        height = style.width / originalRadio;
      }
      props.width = width;
      props.height = height;
    }
  }

  get src() {
    return this.props.src;
  }

  set src(value) {
    let props = this.props;
    if (value != props.src && value) {
      utils.getImageSize(value).then((image: any) => {
        if (props.hasGetImageSize != value) {
          props.originalWidth = image.width;
          props.originalHeight = image.height;

          this.style.width = Math.max(this.style.width, 150);
          this.style.height = this.style.width / props.originalWidth * props.originalHeight;

          this.caculateImageSize();

          this.renderBounding();

          props.hasGetImageSize = value;

          this.dispatchEvent(new GlsEvent(GlsEvent.LOADED, this));
        }
      })
    }
    props.src = value;
  }
}
