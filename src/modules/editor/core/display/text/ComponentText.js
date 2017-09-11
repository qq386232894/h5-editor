/**
 * Created by 给力叔 on 2017/9/8.
 */
import {DisplayComponent} from "../DisplayComponent";
import {Properties} from "../property/Properties";
export const componentTextType = 'gls-component-text';

/**
 * 文本的属性
 */
export class ComponentTextProperties extends Properties{
  type = componentTextType;
  html = `<div ctype="2" class="element comp_paragraph editable-text" style="cursor: default; font-size: 24px; width: 310px; height: 38px; text-rendering: optimizeLegibility; -webkit-writing-mode: horizontal-tb; writing-mode: horizontal-tb; min-height: inherit;">双击此处进行编辑</div>`;
}

export class ComponentText extends DisplayComponent {
  /**
   * ComponentTextProperties
   * @type {Properties & ComponentTextProperties}
   */
  props = new ComponentTextProperties();
}
