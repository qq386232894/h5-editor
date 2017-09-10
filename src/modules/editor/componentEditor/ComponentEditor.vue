<template>
  <div class="component-editor">
    <gls-header></gls-header>
    <div class="content">
      <gls-template-panel></gls-template-panel>
      <gls-scene-editor></gls-scene-editor>
      <gls-scene-manager :project="project"></gls-scene-manager>
    </div>
  </div>
</template>

<script>
  import Vue, {ComponentOptions} from 'vue'
  import glsHeader from "./header/Header";
  import {Project} from "../core/project/Project";
  import {Scene} from "../core/scene/Scene";
  import glsSceneManager from "./sceneManager/SceneManager";
  import glsTemplatePanel from "./templatePanel/TemplatePanel";
  import glsSceneEditor from "./sceneEditor/SceneEditor";

  export default {
    name: 'gls-component-editor',
    data() {
      return {
        project: new Project()
      }
    },
    beforeMount: function () {
//      todo 模拟数据，记得删除
      if (this.project.scenes.length == 0) {
        for(let index = 0;index < 10;index ++){
          let scene = new Scene();
          scene.config.name = `场景${index}`;
          scene.config.id = index;
          this.project.scenes.push(scene);
        }
      }
    },
    mounted: function () {
//      let text = new (glsHeader._Ctor[0])(glsHeader).$mount();
//      this.$el.appendChild(text.$el);
    },
    components: {
      glsHeader: glsHeader,
      glsSceneManager: glsSceneManager,
      glsTemplatePanel: glsTemplatePanel,
      glsSceneEditor: glsSceneEditor
    }
  }
</script>

<style scoped>
  @import "../common/scss/index.scss";
  .content {
    position: fixed;
    width: 100%;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #D0CFD9;
  }
</style>
