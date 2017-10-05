/**
 *  create by 给力叔 2017/10/5/005
 **/
import {Project} from "./Project";
import {SceneFactory} from "../factorys/scsne/SceneFactory";

describe('Project', () => {
  it('#removeSelectedScene', () => {
    let project = new Project();
    for (let index = 0; index < 3; index++) {
      project.scenes.push(SceneFactory.getInstance().createScene(project));
    }

    project.selectedScene = project.scenes[1];
    expect(project.removeSelectedScene().config.id).toEqual("2");
    expect(project.removeSelectedScene().config.id).toEqual("3");
    expect(project.removeSelectedScene()).toEqual(null);
  });
});
