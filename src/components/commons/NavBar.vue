<template>
  <div>
    <!--导航栏-->
    <header class="navbar navbar-inverse navbar-fixed-top docs-nav" role="banner">
      <div class="container" >
        <div class="navbar-header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="/index" class="navbar-brand">
            <img src="../../assets/images/logo.png" alt="亚州编程网欢迎您！">
          </a>
        </div>
        <nav id="hb-nav" class="collapse navbar-collapse bs-navbar-collapse" role="navigation">

          <ul class="nav navbar-nav">
            <li><a href="/tabs">论坛社区</a></li>
            <li><a href="/onlineCode">在线运行</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right profile" v-if="!isLogin">
            <li><a href="/login"><i class="el-icon-user-solid"></i> 登录 </a></li>
            <li><a href="/reg"><i class="el-icon-thumb"></i> 注册</a></li>
          </ul>

          <div class="login-register" v-if="isLogin">
            <!--<el-avatar :size="30" :src="circleUrl" style="margin-top: 5px"></el-avatar>-->
            <div class="dd" style="margin-top: 5px">
              欢迎您：{{this.loginSuccessUser.username}}<i class="el-icon-arrow-down"></i>
              <ul class="dd-menu">
                <li><a href="/myMavonEditor"><i class="el-icon-edit-outline"></i>发表文章</a></li>
                <li><a href="/upAndDown"><i class="el-icon-folder"></i>资源分享</a></li>
                <li><a href="/personalCenter"><i class="el-icon-date"></i>&nbsp;个人中心</a></li>
                <li><a href="/index" @click="doLogout"><i class="el-icon-back"></i>&nbsp;退出登录</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>
<script src="../../assets/scripts/login.min.js"></script>
<script>
  var graceChecker = require("../../assets/scripts/commons/graceChecker.js");
  export default {
    name: "NavBar",
    data() {
      return {
        isLogin: false, //判断用户登录状态
        loginSuccessUser: {}, //登录成功的用户对象。
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }

    },

    created() {

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
      doLogout: function () {
        if (this.isLogin) {
          if (sessionStorage.getItem("www.simoniu.com") != null) {
            sessionStorage.removeItem("www.simoniu.com");
          }
          if (localStorage.getItem("www.simoniu.com") != null) {
            localStorage.removeItem("www.simoniu.com");
          }
        }

        window.location.href = '/login'
      }
    }

  }
</script>

<style scoped>

  @import "../../assets/stylesheets/login.min.css";
  @import "../../assets/minified_css/index-header.min.css";
  @import "../../assets/minified_css/index.min.css";
  @import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";

</style>
