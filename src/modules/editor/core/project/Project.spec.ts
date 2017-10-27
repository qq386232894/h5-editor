/**
 *  create by 给力叔 2017/10/5/005
 **/
import {Project} from "./Project";
import {SceneService} from "../factorys/scsne/SceneService";
import {GLS_COMPONENT_STAGE, Stage} from "../display/stage/Stage";
import {DisplayComponentFactory} from "../factorys/display/DisplayComponentFactory";
import {Inject} from 'angular2-decorators-for-vue';

describe('Project', () => {
  DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_STAGE, Stage)
  it('#removeSelectedScene', () => {

    class Test {
      @Inject(SceneService)
      SceneService: SceneService;

      constructor() {
        let project = new Project();
        for (let index = 0; index < 3; index++) {
          project.scenes.push(this.SceneService.createScene(project));
        }

        project.selectedScene = project.scenes[1];
        expect(project.removeSelectedScene().props.id).toEqual("2");
        expect(project.removeSelectedScene().props.id).toEqual("3");
        expect(project.removeSelectedScene()).toEqual(null);
      }
    }

    new Test();
  });
});
