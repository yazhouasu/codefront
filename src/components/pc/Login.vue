<template>
  <div>
    <!--头部-->
    <head>
      <title>用户登录 - 亚州编程网</title>
      <meta charset="utf-8"/>
      <!--极速模式-->
      <meta name="renderer" content="webkit">
      <!--支持IE-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--支持移动设备,禁用缩放-->
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
      <meta name="keywords"
            content="亚州编程, 亚州编程网, node, node.js, mongodb, javascript, jquery, ajax, mongoose, 在线编程, 互动式编程, 编程, IT教育"/>
      <meta name="Description"
            content="亚州编程网是一个学习最前沿编程技术的平台，提供了mongodb，node.js，javascript，jquery等相关的课程。互动式的学习和实时在线的练习，能让你迅速进入状态，快速完成课程学习。">

      <link rel="stylesheet" href="../../assets/stylesheets/login.min.css">

    </head>
    <!--导航栏-->
    <NavBar></NavBar>
    <br>
    <br>
    <br>
    <br>
    <!--登录部分-->
    <el-row>
      <!--左半部分-->
      <br><br>
      <el-col :offset="4" :span="7" class="left">

        <h3 style="text-align:center;">用户登录</h3>

        <el-form ref="form" label-width="80px" :label-position="labelPosition" size="mini">

          <el-form-item label="用户名">
            <el-input v-model="loginUser.username"></el-input>
          </el-form-item>

          <el-form-item label="密  码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>

          <!--下面是滑块验证组件-->
          <el-form-item>
            <img style="cursor:pointer" title="看不清换一张" :src="randomCodeUrl" @click="changeRandomCode">
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="loginUser.validateCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">立即登录</el-button>

          </el-form-item>
        </el-form>
      </el-col>

      <!--右半部分-->
      <el-col :offset="2" :span="7">
        <div id="oAuth">
          <div class="page-header">
            <h3>欢迎来到亚州编程网</h3>
            <p style="font-size: 14px">在这里，认识更多的朋友！</p>
          </div>
          <div class="col-sm-12 social-buttons">
            <button type="button" data-type="qq" class="btn btn-block btn-social btn-twitter">
              <i class="el-icon-d-arrow-right"></i> QQ 登录
            </button>
            <button type="button" data-type="sina" class="btn btn-block btn-social btn-google-plus">
              <i class="el-icon-d-arrow-right"></i> 微信登录
            </button>
            <button type="button" data-type="github" class="btn btn-block btn-social btn-github">
              <i class="el-icon-d-arrow-right"></i> 微博登录
            </button>
            <div class="page-header">
              <p style="font-size: 14px">与更多一线开发者互动</p>
            </div>
            <div class="row">
              <div class="col-md-6 col-xs-6"><!--jACKY 2016-3-29-->
                <a
                  href="//shang.qq.com/wpa/qunwpa?idkey=f0d01a41d8c20dc054380d5d57002b03e32b189186cde8cf6858e62288f0bef8"
                  class="btn btn-block btn-dropbox" disabled="disabled">
                  <i class="el-icon-bell"></i>
                  交流群①(已满)
                </a>
              </div>
              <div class="col-md-6 col-xs-6"><!--jACKY 2016-6-20-->
                <a target="_blank"
                   href="//shang.qq.com/wpa/qunwpa?idkey=f0d01a41d8c20dc054380d5d57002b03e32b189186cde8cf6858e62288f0bef8"
                  class="btn btn-block btn-dropbox">
                  <i class="el-icon-bell"></i>
                  交流群②
                </a>
              </div>
            </div>
          </div>
        </div>


      </el-col>
    </el-row>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!--结束栏-->
    <Tail></Tail>
  </div>
</template>

<script src="../../assets/scripts/login.min.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>

<script>

  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";

  export default {
    name: "login",
    components: {Tail, NavBar},
    component: {
      NavBar
    },

    data() {
      return {
        //activeIndex: '1',
        // activeIndex2: '1',
        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',//验证码图片的值
        loginUser: {
          username: '',
          password: '',
          validateCode: ''//用户输入的验证码
        },

        loginSuccessUser: {}
      };
    },
    created() {

    },
    mounted() {

    },
    methods: {
      //执行登录动作的方法
      doLogin: function () {
        let url = this.websiteUrl+'/springbootdemo/users/login?token=' + this.token;
        let that = this;
        this.axios.get(url, {
          params: {
            username: that.loginUser.username,
            password: that.loginUser.password,
            validateCode: that.loginUser.validateCode
          }
        })
          .then(function (response) {
            if (response.data.code == 200) {

              that.loginSuccessUser = response.data.data;

              //1.登录成功后，登录成功用户资料，保存到localStorage;
              localStorage.setItem("www.simoniu.com", JSON.stringify(that.loginSuccessUser));

              //2.页面跳转了。
              window.location.href = '/index'; //跳转到pc端默认的首页。


            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '登录失败！',
            type: 'error'
          });
        })
      },
      //生成token值的方法
      changeRandomCode: function () {
        const jwt = require('jsonwebtoken');
        let payload = new Date().getTime() + ""; //当前时间的毫秒数
        let secret = 'www.simoniu.com'; //网站的域名
        this.token = jwt.sign(payload, secret);//那你的公钥+私钥，生成唯一token

        this.randomCodeUrl = this.websiteUrl+'/springbootdemo/commons/mathRandomCode?token=' + this.token
      }

    },
    watch: {},
    mounted() {
      //调用可以生成token的方法
      this.changeRandomCode();
    }
  }
</script>

<style scoped>

  @import "../../assets/stylesheets/login.min.css";

  .left {
    background-color: whitesmoke;
  }

  el-row {
    margin-top: 500px;
    margin-bottom: 400px;
  }

</style>
