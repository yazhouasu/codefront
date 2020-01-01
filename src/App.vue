<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  /*解决wangEditor遮盖界面问题*/
  .w-e-menu {
    z-index: 2 !important;
  }

  .w-e-text-container {
    z-index: 1 !important;
  }

</style>
