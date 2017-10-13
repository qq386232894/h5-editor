<template>
  <div class="gls-component-image">
    <img :src="component.src" :style="{width:component.props.width + 'px',height:component.props.height + 'px'}"/>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/11/006
   */
  import Vue from 'vue'
  import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
  import {Stage} from "../../../../core/display/stage/Stage";
  import {Project} from "../../../../core/project/Project";
  import {DisplayComponent} from "../../../../core/display/DisplayComponent";
  import {Renderer} from "../../../../../../common/render/Renderer";
  import {ComponentImage, GLS_COMPONENT_IMAGE} from "../../../../core/display/image/ComponentImage";

  @Component({
    name: GLS_COMPONENT_IMAGE,
    components: {
    }
  })
  export default class GlsComponentImageDisplay extends Vue {
    @Prop({required: true}) component: ComponentImage;
    @Prop({required: true}) project: Project;
  }
</script>

<style scoped lang="scss">
  .gls-component-image {
    width: 100%;
    height: 100%;
  }
</style>
