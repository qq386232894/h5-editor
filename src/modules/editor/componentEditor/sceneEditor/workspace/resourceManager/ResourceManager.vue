<template>
  <!--todo 没对接后端，细节就不弄了-->
  <div class="gls-resource-manager">
    <!--左边的大分类-->
    <div class="left">
      <span class="selected">图片库</span>
      <span>我的购买</span>
      <span>我的上传</span>
      <span>最近使用</span>
    </div>

    <!--右边的详情-->
    <div class="right">
      <!--头部-->
      <div class="header">
        <!--搜索框-->
        <div class="search-container">
          <input/>
          <span class="iconfont icon-search"></span>
        </div>

        <!--分类-->
        <div class="type-container">
          <span class="selected">最热</span>
          <span>背景</span>
          <span>动态</span>
          <span>文字</span>
          <span>边框</span>
          <span>线条</span>
          <span>图标</span>
          <span>卡通</span>
          <span>正版表情</span>
          <span>免费</span>
          <span>摄影</span>
        </div>
      </div>
      <div class="images-container">
        <div class="image" :style="{'background-image': 'url(\''+image+'\')'}" v-for="image in images">
          <div class="overlay">
            <div class="button-use" @click="selectImage(image)">
              使用
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  /**
   * create by 给力叔 2017/10/12/012
   * 资源管理器
   */
  import Vue from 'vue'
  import {Component} from 'angular2-decorators-for-vue'
  import {ResourceManagerEvent} from "./ResourceManagerEvent";
  import axios from 'axios';

  @Component({
    name: "GlsResourceManager",
    components: {}
  })
  export default class GlsResourceManager extends Vue {
    images = [];

    mounted() {
      axios.get('/api/getImages')
        .then((response) => {
          this.images = response.data;
        })
        .catch(function (error) {
//          console.log(error);
        });
    }

    selectImage(image) {
      this.$emit(ResourceManagerEvent.imageSelected,image)
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../common/scss/index.scss";

  $left_width: 160px;
  $padding: 20px;

  .gls-resource-manager {
    padding-top: $padding;
  }

  .left {
    width: $left_width;
    float: left;

    span {
      display: block;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      font-size: 14px;
      box-sizing: border-box;
      padding-left: $padding;

      &:hover {
        color: $hover_color;
      }

      &.selected {
        background-color: #F7F7F7;
      }
    }
  }

  .right {
    $search_width: 160px;
    margin-left: $left_width;
    margin-right: $padding;

    .header {
      height: 70px;
      padding-bottom: $padding;
      border-bottom: solid 1px $devide_color;
    }

    .type-container {
      margin-right: $search_width;

      span {
        margin-top: 15px;
        margin-right: 30px;
        cursor: pointer;

        &:hover {
          color: $hover_color;
        }

        &.selected {
          color: $hover_color;
        }
      }
    }

    .search-container {
      width: $search_width;
      float: right;
      position: relative;

      input {
        width: 100%;
        border-radius: 30px;
      }

      span {
        position: absolute;
        right: 10px;
        top: 8px;
        cursor: pointer;
      }
    }

    .images-container {
      height: 345px;
      padding: $padding;
      .image {
        width: 115px;
        height: 115px;
        float: left;
        margin-right: 15px;
        margin-bottom: 15px;
        background-position: center center;
        background-repeat: no-repeat;
        cursor: pointer;
        background-size: contain;

        &:hover {
          .overlay {
            display: block;
          }
        }

        .overlay {
          display: none;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.3);
          height: 100%;
          .button-use {
            padding: 5px 15px;
            border-radius: 3px;
            background-color: $hover_color;
            color: #FFFFFF;
            margin-top: 30px;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
