<template>
    <span :class="'gls-button ' + type + ' ' + hoverType + ' ' + borderRadiusType">
      {{label}}
      <slot></slot>
    </span>
</template>

<script lang="ts">
  export default {
    name: 'gls-button',
    props: {
      type: String,//gray.black,danger
      hoverType: String,  //hover-success,hover-danger
      label:String,
      borderRadiusType:String   //圆角
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/index.scss";

  .gls-button {
    display: inline-block;
    padding: 5px;
    color: #FFFFFF;
    background-color: #525C64;
    border-radius: 3px;
    cursor: pointer;
    @extend .ui-transition-all;
    &.gray{
      background-color: #76838F;
    }
    &.black{
      background-color: #525C64;
    }
    &.danger{
      background-color: #FF5448;
    }

    &.transparent{
      background-color: transparent;
    }

    &:hover {
      background-color: #FF5448;
    }
    &.hover-success {
      &:hover {
        background-color: #44CB83;
      }
    }

    &.hover-danger {
      &:hover {
        background-color: #FF5448;
      }
    }
  }
</style>
