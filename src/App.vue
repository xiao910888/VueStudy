<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/MainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
