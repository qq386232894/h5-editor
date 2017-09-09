<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  class Parent{
    height = 100;
    onAdded(){

    }
    showHeight(){
      alert(this.height);
    }
  }

  class Child extends Parent {
    showHeight(){
      alert("Child:" + this.height);
      super.showHeight();
    }
  }

  class SubChild extends Child{
    bad =1;
    showHeight(){
      alert("SubChild:" + this.height);
      super.showHeight();
    }

    get name(){
      return "1";
    }
  }

  console.log(new SubChild());

  let prop = SubChild.prototype;
  let props = [];
  let result = {};
  do{
    props.push(prop);
    prop = Object.getPrototypeOf(prop);
  }while(prop && prop.constructor != Object);
  console.log(props);
  props.reverse().forEach((prop)=>{
    Object.getOwnPropertyNames(prop).forEach((name)=>{
      if(name == "constructor"){
        return;
      }
      result[name] = prop[name];
    })
  });
  console.log(result);
//  subChild.methods.showHeight();

export default {

};
</script>

<style>
#app {
  font-family: Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 12px;
}
  body{
    margin: 0;
    height: 100%;
  }
</style>
