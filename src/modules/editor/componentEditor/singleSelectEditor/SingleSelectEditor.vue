<template>
</template>

<script lang="ts">
    /**
     * create by 给力叔 2017/9/19
     * 单选的时候的组件编辑器,也就是组件的属性编辑器了
     */
    import Vue from 'vue'
    import {Component, Inject, Model, Prop, Watch} from 'vue-property-decorator'
    import {Scene} from "../../core/scene/Scene";

    @Component({
        name: "GlsSingleSelectEditor",
        components: {}
    })
    export default class GlsSingleSelectEditor extends Vue {
        @Prop({required: true}) scene: Scene;
    }
</script>

<style scoped lang="scss">

</style>
