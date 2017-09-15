<template>
  <div class="icon-label">
    <div :class="'iconfont icon-' + icon"></div>
    <div class="label">{{label}}</div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'gls-icon-label',
    props: {
      icon:String,
      label:String
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .icon-label{
    color: #fff;
    opacity: 1;
    width:60px;
    height:50px;
    padding-top: 7px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
  }
  .icon-label:hover{
    background-color: #484d64;
  }

  .label{
    font-size: 12px;
  }
</style>
