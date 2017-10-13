<template>
  <div v-if="project">
    <gls-header :project="project"></gls-header>
    <div class="gls-component-editor-content">
      <gls-template-panel></gls-template-panel>
      <gls-scene-editor :project="project"></gls-scene-editor>
      <gls-scene-manager :project="project"></gls-scene-manager>
    </div>
    <!--多选编辑-->
    <modal name="multiSelectEditor"
           width="270px"
           height="169px"
           :draggable="true"
           :clickToClose="false"
           :showBackground="false"
           :pivotX="0.8"
           :pivotY="0.12"
           title="多选操作"
    >
      <gls-multi-select-editor :scene="project.selectedScene"
                               v-if="project && project.selectedScene && project.selectedScene.selectedComponents.length > 1"
      >
      </gls-multi-select-editor>
    </modal>
    <!--单选编辑-->
    <gls-single-select-editor :scene="project.selectedScene"
                              v-if="project && project.selectedScene && project.selectedScene.selectedComponents.length == 1"
    >
    </gls-single-select-editor>

    <!--选择图片的弹窗-->
    <b-modal ref="resourceDialog" size="lg" title="图片素材" v-model="resourceDialogVisible">
      <gls-resource-manager @imageSelected="onImageSelected($event)"></gls-resource-manager>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" variant="primary" @click="resourceDialogVisible=false">
          确定
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
  import Vue, {ComponentOptions} from 'vue'
  import glsHeader from "./header/Header";
  import {Project} from "../core/project/Project";
  import {Scene} from "../core/scene/Scene";
  import glsSceneManager from "./sceneManager/SceneManager";
  import glsTemplatePanel from "./templatePanel/TemplatePanel";
  import glsSceneEditor from "./sceneEditor/SceneEditor";
  import {GLS_COMPONENT_STAGE, Stage} from "../core/display/stage/Stage";
  import {ComponentText, GLS_COMPONENT_TEXT} from "../core/display/text/ComponentText";
  import {DisplayComponentFactory} from "../core/factorys/display/DisplayComponentFactory";
  import {Component, Inject, Model, Prop, Watch, Provide} from 'vue-property-decorator';
  import GlsSingleSelectEditor from './singleSelectEditor/SingleSelectEditor';
  import GlsMultiSelectEditor from './multiSelectEditor/MultiSelectEditor';
  import {Renderer} from "../../../common/render/Renderer";
  import {CopyPasteManager} from "../core/parse/CopyPasteManager";
  import {AnimationConfig} from "../core/display/config/AnimationConfig";
  import {SceneService} from "../core/factorys/scsne/SceneService";
  import {ComponentImage, GLS_COMPONENT_IMAGE} from "../core/display/image/ComponentImage";
  import GlsResourceManager from './sceneEditor/workspace/resourceManager/ResourceManager.vue';
  import {ComponentEditorEvent} from "./ComponentEditorEvent";
  import {ProjectService} from "../core/project/ProjectService";

  @Component({
    name: "GlsComponentEditor",
    components: {
      glsHeader: glsHeader,
      glsSceneManager: glsSceneManager,
      glsTemplatePanel: glsTemplatePanel,
      glsSceneEditor: glsSceneEditor,
      GlsSingleSelectEditor: GlsSingleSelectEditor,
      GlsMultiSelectEditor: GlsMultiSelectEditor,
      GlsResourceManager: GlsResourceManager
    }
  })
  export default class GlsComponentEditor extends Vue {
    project: Project = null;
    @Prop({default:function () {
      return "1"
    }}) projectId:string;
    resourceDialogVisible: boolean = false;
    resourceDialogCallback = function (image: string) {

    }

    onImageSelected(image) {
      this.resourceDialogCallback && this.resourceDialogCallback(image);
      this.resourceDialogVisible = false;
    }

    beforeMount() {
//      todo 模拟数据，记得删除
      DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_TEXT, ComponentText);
      DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_STAGE, Stage);
      DisplayComponentFactory.getInstance().registerComponent(GLS_COMPONENT_IMAGE, ComponentImage);

      ProjectService.getInstance().fetchById(this.projectId).then((project: Project) => {
        this.project = project;
        if (this.project.scenes.length == 0) {
          let scene = SceneService.getInstance().createScene(this.project);
          this.project.scenes.push(scene);
        }
        project.selectedScene = project.scenes[0];
        ProjectService.getInstance().currentProject = this.project;
        CopyPasteManager.getInstance().init(this.project);
      })
    }

    get initPosition() {
      return {top: '50px', left: `${Renderer.getWindowWidth() - 530}px`}
    }

    mounted() {
      this.$root.$on(ComponentEditorEvent.showResourceDialog, (callback) => {
        this.resourceDialogVisible = true;
        this.resourceDialogCallback = callback;
      });

      document.onselectstart = function () {
        return false;
      }

      //多选的时候，显示多选的弹窗
      this.$watch(function () {
        let project = this.project;
        return project && project.selectedScene && project.selectedScene.selectedComponents.length || 0;
      }, function (newValue) {
        if (newValue > 1) {
          this["$modal"].show('multiSelectEditor');
        } else if (newValue == 1) {
          this["$modal"].hide('multiSelectEditor');
        } else {
          this["$modal"].hide('multiSelectEditor');
        }
      })
//      let text = new (glsHeader._Ctor[0])(glsHeader).$mount();
//      this.$el.appendChild(text.$el);
    }
  }
</script>

<style scoped>
  @import "../common/scss/index.scss";
  @import "../common/scss/icons/iconfont.scss";

  .gls-component-editor-content {
    position: fixed;
    width: 100%;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #D0CFD9;
  }
</style>
