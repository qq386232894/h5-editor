/**
 * Created by 给力叔 on 2017/9/8.
 */
import {SceneConfig} from "./SceneConfig";

export class Scene {
  /**
   * 场景设置
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
}
