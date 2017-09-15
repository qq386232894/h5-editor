/**
 * Created by 给力叔 on 2017/9/10.
 */
export class ProjectManager {
  /**
   * @type {ProjectManager}
   * @private
   */
  static _instance = null;

  /**
   * @type {Project}
   */
  currentProject = null;

  constructor() {
    if (ProjectManager._instance) {
      throw new Error("ProjectManager不能实例化!");
    }
    ProjectManager._instance = this;
  }

  /**
   * 获取工厂的单例
   * @return {ProjectManager}
   */
  static getInstance() {
    if (!ProjectManager._instance) {
      return new ProjectManager();
    }
    return ProjectManager._instance;
  }


}
