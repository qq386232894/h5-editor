/**
 * Created by 给力叔 on 2017/9/8.
 * 每个场景一个舞台
 */
import {DisplayComponentContainer} from "../DisplayComponentContainer";
import {Properties} from "../property/Properties";

export const GLS_COMPONENT_STAGE = 'gls-component-stage';

export class ComponentStageProperties extends Properties {
  type = `gls-component-stage`;
  selectAble = false;
  moveable = false;
  resizeable = false;
  rotateable = false;
}

export class Stage extends DisplayComponentContainer {
  props = new ComponentStageProperties();

  constructor() {
    super();
    this.style = {
      top: 0,
      left: 0,
      width: 320,
      height: 486,
      rotate: 0
    }

    this.props.resizeable = false;
  }
}
