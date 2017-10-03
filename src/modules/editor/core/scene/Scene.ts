/**
 * Created by 给力叔 on 2017/9/8.
 */
import {SceneConfig} from "./SceneConfig";
import {Stage} from "../display/stage/Stage";
import {DisplayComponent} from "../display/DisplayComponent";
import {Renderer} from "../../../../common/render/Renderer";
import {Rect} from "../geom/Rect";

export class Scene {
  /**
   * 场景设置,这个会保存在服务器
   * @type {SceneConfig}
   */
  config: SceneConfig = new SceneConfig();

  /**
   * 每个场景里面有一个舞台
   * @type {Stage}
   */
  stage: Stage = null;

  initFromJson() {

  }

  /**
   * 获取所有选中的组件
   * @returns {Array.<DisplayComponent>}
   */
  get selectedComponents() {
    return this.stage.children.filter((child) => {
      return child.props.selected;
    })
  }

  /**
   * 清除所选的组件
   */
  clearSelection() {
    this.stage.children.forEach((child) => {
      child.props.selected = false;
    });
  }

  /**
   * 删除所选的组件
   */
  removeSelection() {
    this.selectedComponents.forEach((component) => {
      component.parent.removeChild(component);
    })
    console.log(this.stage.children.length);
  }

  get firstSelectedComponent() {
    return this.selectedComponents[0];
  }

  renderSelectedComponentBounding() {
    this.selectedComponents.forEach((component: DisplayComponent) => {
      component.renderBounding();
    })
  }

  //上对齐,左对齐等的原子方法
  align(positionKey: string, offsetKey: string) {
    let rects: Array<{ rect: Rect, component: DisplayComponent }> = this.selectedComponents.map((component: DisplayComponent) => {
      return {rect: Renderer.getBoundingClientRect(component.element), component: component};
    });
    let first = rects[0];
    rects.slice(1).forEach((info) => {
      info.component.style[positionKey] += first.rect[offsetKey] - info.rect[offsetKey];
      info.component.renderBounding();
    })
  }

  /**
   * 左对齐
   */
  leftAlign() {
    this.align("left", "left");
  }

  /**
   * 水平居中对齐
   */
  horizontalCenterAlign() {
    this.align("left", "centerX");
  }

  /**
   * 右对齐
   */
  rightAlign() {
    this.align("left", "right");
  }

  /**
   * 上对齐
   */
  topAlign() {
    this.align("top", "top");
  }

  /**
   * 垂直居中对齐
   */
  verticalCenterAlign() {
    this.align("top", "centerY");
  }

  /**
   * 下对齐
   */
  bottomAlign() {
    this.align("top", "bottom");
  }

  /**
   * 均分对齐
   */
  equalAlign(positionKey:string,offsetKey:string){
    let selectedComponents = this.selectedComponents;
    let rects: Array<{ rect: Rect, component: DisplayComponent }> = selectedComponents.map((component: DisplayComponent) => {
      return {rect: Renderer.getBoundingClientRect(component.element), component: component};
    });

    //先调转位置,小的靠前,不然就算出负的
    let first = rects[0], last = rects[rects.length - 1], temp;
    if (last.rect[offsetKey] < first.rect[offsetKey]) {
      temp = first;
      first = last;
      last = temp;
    }

    //算出间距
    let offset = (last.rect[offsetKey] - first.rect[offsetKey]) / (selectedComponents.length - 1);

    //先上对齐或者左对齐,然后再均分
    let index = 1;
    rects.slice(1, -1).forEach((info) => {
      info.component.style[positionKey] += first.rect[offsetKey] - info.rect[offsetKey];
      info.component.style[positionKey] += offset * index;
      info.component.renderBounding();
      index++;
    })
  }

  /**
   * 垂直均分
   */
  verticalEqual() {
    this.equalAlign("top","centerY");
  }

  /**
   * 水平均分
   */
  horizontalEqual() {
    this.equalAlign("left","centerX");
  }
}
