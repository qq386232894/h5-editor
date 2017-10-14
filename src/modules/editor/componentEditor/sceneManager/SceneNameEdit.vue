<template>
  <div>
    <span v-show="!showInput">{{scene.props.name}}</span>
    <input type="text" v-show="showInput" v-model="scene.props.name" class="no-padding" @input="changeSceneName(scene)"/>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/5/005
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Scene} from "../../core/scene/Scene";
  import {SceneService} from "../../core/factorys/scsne/SceneService";

  @Component({
    name: "GlsSceneNameEdit",
    components: {}
  })
  export default class GlsSceneNameEdit extends Vue {
    @Prop({required: true}) scene: Scene;
    showInput:boolean = false;

    changeSceneName(scene:Scene){
      SceneService.getInstance().changeSceneName(scene);
    }
  }
</script>

<style scoped lang="scss">
</style>
