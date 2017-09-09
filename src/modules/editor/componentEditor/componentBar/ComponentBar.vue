<template>
  <div class="icon-label-list"  @click="createCompponent">
    <gls-icon-label :label="'文本'" :icon="'text'"></gls-icon-label>
    <gls-icon-label :label="'图片'" :icon="'image'"></gls-icon-label>
    <gls-icon-label :label="'背景'" :icon="'background'"></gls-icon-label>
    <gls-icon-label :label="'音乐'" :icon="'music'"></gls-icon-label>
    <gls-icon-label :label="'形状'" :icon="'svg'"></gls-icon-label>
  </div>
</template>

<script>
  import glsIconLabel from './IconLabel';

  export default {
    name: 'gls-component-bar',
    data() {
      return {
      }
    },
    components: {
      glsIconLabel: glsIconLabel
    },
    methods:{
      createCompponent:function () {
      }
    }
  }
</script>

<style scoped>
  .icon-label-list {
    text-align: center;
  }
</style>
