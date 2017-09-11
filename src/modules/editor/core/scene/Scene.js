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

  /**
   * 当前所选的组件
   * @type {DisplayComponent}
   */
  selectedComponent = null;
  initFromJson(){

  }
}
