<template>
  <div class="gls-scene-editor">
    <!--为了居中-->
    <div class="center">
      <div class="phone">
        <div class="header">
          <span class="menu"></span>
          <span class="horn"></span>
          <span class="battery"></span>
          <div class="title"></div>
        </div>
        <div class="editor"></div>
      </div>
      <div class="control-bar"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gls-scene-editor',
    data() {
      return {}
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
    .header{
      position: relative;
      left:3px;
      top:37px;
      right:30px;
      height:60px;
      background-color: #333333;
    }
  }
</style>
