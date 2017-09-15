/**
 * Created by 给力叔 on 2017/9/8.
 */
import {SceneConfig} from "./SceneConfig";

export class Scene {
  /**
   * 场景设置,这个会保存在服务器
   * @type {SceneConfig}
   */
  config = new SceneConfig();

  /**
   * 每个场景里面有一个舞台
   * @type {Stage}
   */
  stage = null;

  initFromJson(){

  }

  /**
   * 获取所有选中的组件
   * @returns {Array.<DisplayComponent>}
   */
  get selectedComponents(){
    return this.stage.children.filter((child)=>{
      return child.props.selected;
    })
  }

  /**
   * 清除所选的组件
   */
  clearSelection(){
    this.stage.children.forEach((child)=>{
      child.props.selected = false;
    });
  }
}
