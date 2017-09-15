<template>
  <div class="gls-scene-editor">
    <!--为了居中-->
    <div class="center">
      <div class="phone">
        <div class="header">
          <div class="title">编辑器</div>
        </div>
        <div class="editor">
          <gls-work-space :project="project"></gls-work-space>
        </div>
      </div>
      <div class="control-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import glsWorkSpace from './workspace/WorkSpace.vue';
  export default {
    name: 'gls-scene-editor',
    props:{
      project:Object
    },
    data() {
      return {

      }
    },
    components:{
      glsWorkSpace:glsWorkSpace
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .gls-scene-editor {
    overflow: auto;
    height: 100%;
    position: fixed !important;
    top: $header_height;
    bottom: 0;
    left: 333px;
    right: 260px;
  }

  .center {
    width: 326px;
    height: 620px;
    margin: 150px auto;
    position: relative;
  }

  .phone{
    border-radius: 35px;
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    position: relative;
    $header_top:37px;
    $header_height:60px;
    .header{
      position: absolute;
      left: 3px;
      top: $header_top;
      right: 3px;
      height: $header_height;
      background-image: url("./header.png");
    }

    .title{
      position: relative;
      top:30px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #FFFFFF;
    }

    .editor{
      position: absolute;
      top:$header_top + $header_height;
      left: 3px;
      right: 3px;
      height:486px;
    }
  }
</style>
