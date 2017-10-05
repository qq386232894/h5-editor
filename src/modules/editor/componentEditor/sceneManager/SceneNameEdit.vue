<template>
  <div>
    <span v-show="!showInput">{{scene.config.name}}</span>
    <input type="text" v-show="showInput" v-model="scene.config.name" class="no-padding"/>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/5/005
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Scene} from "../../core/scene/Scene";

  @Component({
    name: "GlsSceneNameEdit",
    components: {}
  })
  export default class GlsSceneNameEdit extends Vue {
    @Prop({required: true}) scene: Scene;
    showInput:boolean = false;
  }
</script>

<style scoped lang="scss">
</style>
