/**
 *  create by 给力叔 2017/10/5/005
 **/
import {Project} from "./Project";
import {SceneService} from "../factorys/scsne/SceneService";
import {GLS_COMPONENT_STAGE, Stage} from "../display/stage/Stage";
import {DisplayComponentFactory} from "../factorys/display/DisplayComponentFactory";

describe('Project', () => {
  DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_STAGE, Stage)
  it('#removeSelectedScene', () => {
    let project = new Project();
    for (let index = 0; index < 3; index++) {
      project.scenes.push(SceneService.getInstance().createScene(project));
    }

    project.selectedScene = project.scenes[1];
    expect(project.removeSelectedScene().props.id).toEqual("2");
    expect(project.removeSelectedScene().props.id).toEqual("3");
    expect(project.removeSelectedScene()).toEqual(null);
  });
});
