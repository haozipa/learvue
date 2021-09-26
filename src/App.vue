<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tabbar v-show="tabbar" />
  </div>
</template>

<script>
import MainTabbar from "components/content/maintabbar/MainTabbar";
export default {
  name: 'App',
  components: {
    MainTabbar
  },
  data() {
    return {
      tabbar: true
    }
  },
  watch: {
    $route(to,from) {
      // console.log(to,from)
      if(to.path.indexOf('detail') != -1) {
        this.tabbar = false
      }
      else{
        this.tabbar = true
      }
    }
  }
}
</script>

<style>
@import "assets/css/base.css";</style>
