/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "../DisplayComponent";
import {Properties} from "../property/Properties";
export const GLS_COMPONENT_TEXT = 'gls-component-text';

/**
 * 文本的属性
 */
export class ComponentTextProperties extends Properties{
  type = GLS_COMPONENT_TEXT;
  html = `<span ctype="2" class="element comp_paragraph editable-text" style="cursor: default;display: inline-block; font-size: 24px; width: 200px; height: 38px; text-rendering: optimizeLegibility; -webkit-writing-mode: horizontal-tb; writing-mode: horizontal-tb; min-height: inherit;">双击此处进行编辑</span>`;
}

export class ComponentText extends DisplayComponent {
  /**
   * ComponentTextProperties
   * @type {Properties & ComponentTextProperties}
   */
  props = new ComponentTextProperties();

  constructor(){
    super();
    this.style = {
      left:0,
      top:0,
      width:200,
      height:38,
      rotate:0,
      color:null,
      lineHeight:300
    }
  }
}
