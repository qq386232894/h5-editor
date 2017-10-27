<template>
  <div>
    <span v-show="!showInput">{{scene.props.name}}</span>
    <input type="text" v-show="showInput" v-model="scene.props.name" class="no-padding"
           @input="changeSceneName(scene)"/>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/5/005
   */
  import Vue from 'vue'
  import {Component, Input, Inject} from 'angular2-decorators-for-vue'
  import {Scene} from "../../core/scene/Scene";
  import {SceneService} from "../../core/factorys/scsne/SceneService";

  @Component({
    name: "GlsSceneNameEdit",
    components: {}
  })
  export default class GlsSceneNameEdit extends Vue {
    @Input({required: true}) scene: Scene;

    @Inject(SceneService)
    SceneService: SceneService;

    showInput: boolean = false;

    changeSceneName(scene: Scene) {
      this.SceneService.changeSceneName(scene);
    }
  }
</script>

<style scoped lang="scss">
</style>
