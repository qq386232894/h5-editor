<template>
  <div v-html="component.props.html"></div>
</template>

<script>
  /**
   * create by 给力叔 2017/9/10
   * 专门用于编辑文本
   */
  import {ComponentText, componentTextType} from "../../../../core/display/text/ComponentText";

export default {
  name: componentTextType,
  props: {
    /**
     * @type {ComponentText}
     */
    component: ComponentText
  },
  data() {
    return {}

  },
  components: {}
}
</script>

<style scoped lang="scss">

</style>
