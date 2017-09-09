/**
 * Created by 给力叔 on 2017/9/8.
 */
export class SceneManager {
  /**
   * @type {SceneManager}
   * @private
   */
  static _instance = null;

  constructor() {
    if (SceneManager._instance) {
      throw new Error("SceneManager不能实例化!");
    }
    SceneManager._instance = this;
  }

  /**
   * 获取工厂的单例
   * @return {DisplayComponentFactory}
   */
  static getInstance() {
    if (!SceneManager._instance) {
      return new SceneManager();
    }
    return SceneManager._instance;
  }

  createScene(){

  }
}
