//修正导入.vue报错
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare var require: (files:Array<string> | string,resolve?:any)=>any;
