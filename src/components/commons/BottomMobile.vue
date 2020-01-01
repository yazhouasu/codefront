<template>
  <div>
    <!--tabbar底部标签栏-->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/indexMobile" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/panel" icon="friends-o">社区</van-tabbar-item>
      <van-tabbar-item replace to="/centerMobile" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "BottomMobile",
    data() {
      return {
        active: 0
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped>

</style>
