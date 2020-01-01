<template>
  <div class="hb-index">

    <!--导航栏-->
    <header class="navbar navbar-inverse navbar-fixed-top docs-nav" role="banner">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="/index" class="navbar-brand">
            <img src="../../assets/images/logo.png" alt="亚州编程网欢迎你！">
          </a>
        </div>
        <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
          <ul class="nav navbar-nav">
            <li><a href="/tabs">论坛社区</a></li>
            <li><a href="/onlineCode">在线运行</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right" v-if="!isLogin">
            <li><a href="/login"><i class="el-icon-user-solid"></i> 登录 </a></li>
            <li><a href="/reg"><i class="el-icon-thumb"></i> 注册</a></li>
          </ul>

          <div class="login-register" v-if="isLogin">
            <div class="dd" style="color: whitesmoke">欢迎您:{{this.loginSuccessUser.username}}<i class="el-icon-arrow-down"></i> <!--<span class="glyphicon glyphicon-menu-down"></span>-->
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

    <!--首页图片及部分文字-->
    <div class="container" style="width: 100%">
      <div class="row section">
        <img src="http://img1.juimg.com/160908/330142-160ZQ1310075.jpg" class="banner-bg">
        <div class="tBanner">
          <div>
            <h1>随时随地有创意，随时随地写程序</h1>
            <p>不是得到就是学到，不是学到就是做到</p>
            <a href="/video" class="btn btn-primary btn-lg">
              <i style="margin-right: 10px;" class="el-icon-switch-button"></i>
              开始学习
            </a>
          </div>
        </div>
      </div>
    </div>

    <!--课程板块-->
    <el-row>
      <br><br>
      <el-col :offset="1" :span="2">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width: 250px;height: 350px;">
          <img src="../../assets/images/slides/eth.png" class="image">
          <div style="padding: 14px;">
            <div style="text-align: left">课程内容涵盖以太坊智能合约等开发相关的诸多核心......</div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="seeVideo" style="color: #2ECC71"><i class="el-icon-video-play"></i>观看课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :offset="4" :span="2">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width: 250px;height: 350px;">
          <img src="../../assets/images/slides/tensorflow.png" class="image">
          <div style="padding: 14px;">
            <div style="text-align: left">结合机器算法与流行数据集，完成Tensorflow机器学习项目.....</div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="seeVideo" style="color: #2ECC71"><i class="el-icon-video-play"></i>观看课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :offset="4" :span="2">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width: 250px;height: 350px;">
          <img src="../../assets/images/slides/html.png" class="image">
          <div style="padding: 14px;">
            <div style="text-align: left">本教程将通过一个博客案例建立更加丰富多彩的Web世界......</div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="seeVideo" style="color: #2ECC71"><i class="el-icon-video-play"></i>观看课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :offset="4" :span="2">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" style="width: 250px;height: 350px;">
          <img src="../../assets/images/slides/vue-toolchain.png" class="image">
          <div style="padding: 14px;">
            <div style="text-align: left">从Vue.js单文件组件入手，梳理了前端工程化实践的概念与原理.....</div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="seeVideo" style="color: #2ECC71"><i class="el-icon-video-play"></i>观看课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--不用搭建学习环境-->
    <section class="true-environment">
      <div class="title">
        <h2>真实的学习环境</h2>
        <span>Real learning environment</span>
        <hr>
      </div>
      <div class="row content container">
        <div class="col-md-4 col-lg-4 true_img">
          <img class="img-responsive" src="http://book.img.hubwiz.com/index!true.png" alt="练习环境"></div>
        <div class="col-md-8 col-lg-8 true-content">
          <h2>不用搭建学习环境</h2>
          <p></p>
          <p>搭建学习环境的繁琐过程，足以熄灭你刚刚燃起的学习兴趣。终于，以后再也不用烦恼了。</p>
          <p>每个课程都有内置的学习环境，即到即学，心无旁骛，学习起来自然事半功倍。</p>
          <img class="img-responsive" src="http://book.img.hubwiz.com/index!true_icon.png" alt='course'>
          <a class="enter btn btn-warning" href="/login">立即体验</a>
        </div>
      </div>
    </section>
    <!--随时可用云端工具-->
    <section class="cloud-tools">
      <div class="title">
        <h2>云端练习工具</h2>
        <span>The cloud practice tools</span>
        <hr>
      </div>
      <div class="row content container">
        <div class="col-md-8 col-lg-8 tool-content">
          <h2>随处可用的云端练习工具</h2>
          <p></p>
          <p>当你在阅读技术博客时，是不是希望把里面的代码跑起来？</p>
          <p>云端练习工具可以在任何一个网站上使用，看到代码，就运行它！</p>
          <img class="img-responsive left" src="http://book.img.hubwiz.com/index!action.png" alt='云端练习工具'>
          <a target="_blank" class="enter right btn btn-warning" href="http://lab123.hubwiz.com">如何使用</a>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 tool_img">
          <img class="img-responsive" src="http://book.img.hubwiz.com/index!tool.png" alt='云端练习工具'>
        </div>
      </div>
    </section>
    <!--结束栏-->
    <Tail></Tail>
  </div>
</template>


<script src="../../assets/scripts/index.min.js"></script>

<script>
  var graceChecker = require("../../assets/scripts/commons/graceChecker.js");
  import Tail from "../commons/Tail";
  export default {
    name: "Index",
    components: {Tail},
    data(){
      return{
        isLogin: false , //判断用户登录状态
        loginSuccessUser:{}, //登录成功的用户对象。
      }

    },

    mounted(){
      this.isLogin = graceChecker.isLogin();
      if(this.isLogin){
        if(sessionStorage.getItem("www.simoniu.com")!=null){

          //使用JSON.parse, JSON.stringify是jQuery的方法，在vue 默认是不能用。
          this.loginSuccessUser = JSON.parse( sessionStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);

        }
        if(localStorage.getItem("www.simoniu.com")!=null){

          this.loginSuccessUser = JSON.parse( localStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);
        }
      }
    },

    methods:{
      doLogout:function () {
        if(this.isLogin){
          if(sessionStorage.getItem("www.simoniu.com")!=null){
            sessionStorage.removeItem("www.simoniu.com");
          }
          if(localStorage.getItem("www.simoniu.com")!=null){
            localStorage.removeItem("www.simoniu.com");
          }
        }

        window.location.href = '/index'
      },

      //跳转到视频课程页面
      seeVideo:function () {
        this.$router.push({
          path:'/video',
        })
      }
    }
  }
</script>

<style scoped>

  @import "../../assets/stylesheets/index.min.css";
  @import "../../assets/minified_css/index-header.min.css";
  @import "https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css";

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
