/**
 * Created by 给力叔 on 2017/9/8.
 */
import axios from "axios";
import {Project} from "./Project";
import {SceneService} from "../factorys/scsne/SceneService";
import {Scene} from "../scene/Scene";
import {Inject,Injectable} from "angular2-decorators-for-vue";

@Injectable()
export class ProjectService {

  @Inject(SceneService)
  SceneService: SceneService;

  /**
   * @type {Project}
   */
  currentProject = null;

  fetchById(projectId: string) {
    let promise = new Promise((resolve, reject)=>{
      axios.get("/api/getProject?id=" + projectId).then((result) => {
        let project = new Project();
        let data = result.data;
        project.numSceneCreated = data.numSceneCreated;
        project.numComponentCreated = data.numComponentCreated;
        project.creator = data.creator;
        project.name = data.name;
        project.id = data.id;
        result.data.scenes.forEach((sceneData) => {
          let scene = this.SceneService.createScene(project, sceneData);
          project.scenes.push(scene)
        })
        resolve(project);
      }).catch(function () {
        reject();
      })
    })
    return promise;
  }

  save(project: Project) {
    let data = {
      numSceneCreated: project.numSceneCreated,
      numComponentCreated: project.numComponentCreated,
      id: project.id,
      name: project.name,
      creator: project.creator,
      scenes: []
    };

    data.scenes = project.scenes.map(function (scene: Scene) {
      return {id: scene.props.id, name: scene.props.name};
    });

    return axios.put("/api/getProject?id=" + project.id, JSON.stringify(data), {
      headers: {'Content-Type': "application/json"}
    });
  }
}
