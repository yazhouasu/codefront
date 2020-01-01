<template>
  <div>
    <van-nav-bar
      title=""
      :fixed="fix"
      left-text=""
      right-text=""
      style="background-color: #31708f"
      @click-right="onClickRight"
      @click-left=""
    >
      <a slot="title" href="/indexMobile">
        <img src="../../assets/images/logo.png" style="width: 150px ;height: 30px;margin-top: 9px;">
      </a>

      <slot slot="right" href="/loginMobile" v-if="!isLogin">
        <div style="color: white">登录</div>
      </slot>

      <slot slot="right" class="login-register" v-if="isLogin">
        <a  href="/centerMobile" @click="doCenter" style="color: white">{{this.loginSuccessUser.username}}</a>
        <!--<a href="/indexMobile" @click="doLogout"><i class="el-icon-back"></i>&nbsp;退出登录</a>-->
      </slot>
    </van-nav-bar>
  </div>
</template>

<script>
  var graceChecker = require("../../assets/scripts/commons/graceChecker.js");
  export default {
    name: "NavMobile",
    data() {
      return {
        fix: true,//是否固定在顶部,
        isLogin: false, //判断用户登录状态
        loginSuccessUser: {}, //登录成功的用户对象。
      }
    },
    mounted() {
      this.isLogin = graceChecker.isLogin();
      if (this.isLogin) {
        if (sessionStorage.getItem("www.simoniu.com") != null) {

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse(sessionStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);

        }
        if (localStorage.getItem("www.simoniu.com") != null) {

          this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);

        }
      }
    },

    methods: {
      //登录动作
      onClickRight: function () {
        this.$router.push({
          path: '/loginMobile',

        })

      },

      doCenter:function () {
        this.$router.push({
          path:'/centerMobile'
        })
      }

      //退出登录
      // doLogout: function () {
      //   if (this.isLogin) {
      //     if (sessionStorage.getItem("www.simoniu.com") != null) {
      //       sessionStorage.removeItem("www.simoniu.com");
      //     }
      //     if (localStorage.getItem("www.simoniu.com") != null) {
      //       localStorage.removeItem("www.simoniu.com");
      //     }
      //   }
      //
      //   window.location.href = '/indexMobile'
      // }

    }
  }
</script>

<style scoped>
  /*标题的颜色*/
  div.van-nav-bar__title.van-ellipsis, div.van-nav-bar__right > span {
    color: #FFF;
  }

  div.van-nav-bar__title.van-ellipsis, div.van-nav-bar__left > span {
    color: #FFF;
  }

  /*
    div.van-nav-bar__title.van-ellipsis a {
      color: #FFF;
    }*/
</style>
