<template>
  <header>
    <div class="left">Editor </div>
    <div class="center">
      <gls-component-bar :project="project"></gls-component-bar>
    </div>
    <div class="right">
      <gls-button type="gray" label="预览和设置" hoverType="hover-success"></gls-button>
      <gls-button type="gray" label="保存" hoverType="hover-success" @click.native="save"></gls-button>
      <gls-button type="gray" label="发布" hoverType="hover-success"></gls-button>
      <gls-button type="danger" label="退出" hoverType="hover-success"></gls-button>
    </div>
  </header>
</template>

<script lang="ts">
  import glsComponentBar from "../componentBar/ComponentBar";
  import glsButton from '../../common/button/Button.vue';
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Project} from "../../core/project/Project";
  import {SceneService} from "../../core/factorys/scsne/SceneService";

  @Component({
    name: "GlsHeader",
    components: {
      glsComponentBar: glsComponentBar,
      glsButton: glsButton
    }
  })
  export default class GlsHeader extends Vue {
    @Prop({required: true}) project: Project;

    save(){
      SceneService.getInstance().save(this.project.selectedScene);
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  header {
    height: $header_height;
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    z-index: 500;
    background-color: #31364a;
    box-sizing: border-box;
  }

  .left {
    font-size: 30px;
    line-height: 36px;
    color: #FFFFFF;
    position: absolute;
    left: 0;
    top: 0;
    height: 36px;
    padding: 7px 0 0 7px;
  }

  .center {
    position: absolute;
    top: 0;
    left: 250px;
    right: 250px;
  }

  .right {
    $top: 13px;
    position: fixed;
    top: $top;
    right: 0;
    height: $header_height - $top;
    width: 200px;
  }
</style>
