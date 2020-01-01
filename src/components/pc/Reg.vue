<template>
  <div>
    <!--头部-->
    <head>
      <meta charset="utf-8">
      <title>用户注册 - 亚州编程网</title>
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

      <link rel="stylesheet" href="../../assets/stylesheets/register.min.css">

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
      <el-col :offset="4" :span="7" class="left">

        <h3 style="text-align:center;">用户注册</h3>
        <el-divider></el-divider> <!--分割线-->

        <el-form ref="form" label-width="80px" :label-position="labelPosition" size="mini">

          <el-form-item label="手机号码">
            <el-input v-model="regUser.mobile"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="regUser.username"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" v-model="regUser.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input type="password" v-model="regUser.confirmpass"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button @click="sendRandomCode">发送验证码</el-button>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="regUser.validateCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doReg">立即注册</el-button>
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

<script src="../../assets/scripts/register.min.js"></script>

<script>
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";

  export default {
    name: "register",
    components: {Tail, NavBar},
    data() {
      return {
        token: '', //获取验证码时，服务器生成的token值
        regUser: {
          mobile: '',
          username: '',
          password: '',
          confirmpass: '',
          validateCode: ''
        },
      };

    },
    created() {

    },
    methods: {
      //执行用户注册
      doReg() {
        let url = this.websiteUrl + '/springbootdemo/users/reg?token=' + this.token;
        let that = this;
        this.axios.post(url, this.regUser).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {
            //未返回成功用户对象，所以需要手动登录
            //跳转页面
            window.location.href = '/login';
            that.$message({
              message: response.data.msg,
              type: 'success'
            });
          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '验证码发送失败！',
            type: 'error'
          });
        })

      },

      //给手机发送验证码
      sendRandomCode: function () {
        let url = this.websiteUrl + '/springbootdemo/commons/mrcode?mobile=' + this.regUser.mobile;
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.token = response.data.data;
              that.$message({
                message: response.data.msg,
                type: 'success'
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '验证码发送失败！',
            type: 'error'
          });
        })
      },
    },
  }
</script>

<style scoped>

  @import "../../assets/stylesheets/register.min.css";

  .left {
    background-color: whitesmoke;
  }

  el-row {
    margin-top: 500px;
    margin-bottom: 400px;
  }

</style>
