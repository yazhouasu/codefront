<template>

</template>

<script>
  export default {
    name: "Welcome",
    created() {

    },
    mounted() {
      //这里判断是移动端还是pc端访问
      if (this._isMobile()) {
        console.log("手机端");
        this.$router.replace('/indexMobile');
      } else {
        console.log("pc端");
        this.$router.replace('/index');
      }
    },
    methods: {
      //判断是否是移动端
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
      }
    }
  }
</script>

<style scoped>

</style>
