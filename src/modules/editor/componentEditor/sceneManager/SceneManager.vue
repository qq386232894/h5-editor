<template>
  <div class="gls-scene-manager">
    <div class="manager-header">
      <a>场景编辑</a>
      <gls-button type="black" label="复制" hoverType="hover-success"></gls-button>
      <gls-button type="black" label="删除" class="delete-button" hoverType="hover-danger"></gls-button>
    </div>
    <div class="manager-content"></div>
  </div>
</template>

<script>
  import glsButton from '../../common/button/Button.vue';

  export default {
    name: 'gls-scene-manager',
    data() {
      return {}
    },
    components: {
      glsButton: glsButton
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  $width: 260px;
  .gls-scene-manager {
    position: fixed;
    top: $header_height;
    right: 0;
    bottom: 0;
    width: $width;
    background-color: #FFFFFF;
  }

  $manager_header_height: 45px;

  .manager-header {
    height: $manager_header_height;
    background-color: #76838F;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    position: relative;
    color: white;
    a {
      line-height: $manager_header_height - 10px;
    }
    /*两个按钮向右浮动*/
    .gls-button{
      float: right;
    }
    /*按钮之间增加间距*/
    .delete-button{
      margin-right: 3px;
    }
  }

  .manager-content {
    position: fixed;
    top: $header_height + $manager_header_height;
    right: 0;
    bottom: 0;
    width: $width;
  }
</style>
