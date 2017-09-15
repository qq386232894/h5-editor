<template>
  <div class="gls-template-panel">
    <div class="left">
      <div class="tab-item">单页模板</div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'gls-template-panel',
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/index.scss";

  .gls-template-panel {
    position: fixed;
    top: $header_height;
    left: 0;
    width: 330px;
    bottom: 0;
  }

  $left_width: 45px;
  .left {
    position: fixed;
    top: $header_height;
    left: 0;
    width: $left_width;
    bottom: 0;
    background-color: #76828E;
  }

  .tab-item {
    width: 100%;
    height: 80px;
    border-bottom: solid 2px #FFFFFF;
    color: #FFFFFF;
    font-size: 12px;
    padding: 25px 5px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .right {
    position: fixed;
    left: $left_width;
    width: 285px;
    top: $header_height;
    bottom: 0;
    background-color: #FFFFFF;
  }
</style>
