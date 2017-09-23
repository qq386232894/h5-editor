<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  export default {};
</script>

<style lang="scss">
  @import "common/tooltip/_tooltip.scss";
  #app {
    font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 60px;
    font-size: 12px;
  }

  body {
    margin: 0;
    height: 100%;
    color: #76838E;
  }

  label, span, a, b, strong {
    display: inline-block;
  }
</style>
