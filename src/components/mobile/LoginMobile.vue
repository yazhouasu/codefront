<template>
  <div>
    <div>
      <van-nav-bar
        title=""
        :fixed="fix"
        left-text=""
        right-text=""
        style="background-color: #31708f"
        @click-right="onClickRight"
        @click-left="onClickLeft"
      >
        <a slot="title" href="/indexMobile">
          <img src="../../assets/images/logo.png" style="width: 150px ;height: 30px;margin-top: 9px;">
        </a>

        <slot slot="right" href="/loginMobile" v-if="!isLogin">
          <div style="color: white">< 登录</div>
        </slot>

        <slot slot="left" href="/indexMobile">
          <div style="color: white;font-size: 14px">
            <van-icon color="white" size="15px" name="arrow-left"/>
            返回
          </div>
        </slot>

        <slot slot="right" class="login-register" v-if="isLogin">
          <a href="/centerMobile" @click="doCenter" style="color: white">{{this.loginSuccessUser.username}}</a>
          <!--<a href="/indexMobile" @click="doLogout"><i class="el-icon-back"></i>&nbsp;退出登录</a>-->
        </slot>
      </van-nav-bar>
    </div>
    <br>
    <br>
    <br>
    <van-row>
      <van-col :offset="2" :span="20">
        <van-cell-group>
          <van-field
            v-model="loginUser.username"
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('您有任何疑问请联系工作人员')"
          />

          <van-field
            v-model="loginUser.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
          />

          <van-field
            v-model="loginUser.validateCode"
            label="验证码"
            placeholder="请输入验证码"
          />
        </van-cell-group>

        <br>
        <img style="cursor:pointer" title="看不清换一张" :src="randomCodeUrl" @click="changeRandomCode">

        <br><br>
        <van-button type="primary" size="small" @click="doLogin">点击登录</van-button>

      </van-col>
    </van-row>
    <br><br><br><br>
    <div>还没有账号，赶紧去<a href="/regMobile"><span style="color: red">注册</span></a>吧</div>
    <BottomMobile></BottomMobile>
  </div>
</template>

<script>

  import BottomMobile from "../commons/BottomMobile";

  export default {
    name: "LoginMobile",
    components: {BottomMobile},
    data() {
      return {
        loginUser: {
          username: '',
          password: '',
          validateCode: ''//用户输入的验证码
        },
        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',//验证码图片的值
        loginSuccessUser: {},
        fix: true,//是否固定在顶部,
        isLogin: false, //判断用户登录状态
      }
    },

    mounted() {
      //调用可以生成token的方法
      this.changeRandomCode();
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
      //执行登录动作的方法
      doLogin: function () {
        let url = this.websiteUrl + '/springbootdemo/users/login?token=' + this.token;
        console.log(url);
        let that = this;
        this.axios.get(url, {
          params: {
            username: that.loginUser.username,
            password: that.loginUser.password,
            validateCode: that.loginUser.validateCode
          }
        })
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {

              console.log("登录成功用户对象->" + response.data.data);
              that.loginSuccessUser = response.data.data;
              /* that.$message({
                 message: response.data.msg,
                 type: 'success'
               });*/

              //1.登录成功后，登录成功用户资料，保存到localStorage;
              localStorage.setItem("www.simoniu.com", JSON.stringify(that.loginSuccessUser));

              //2.页面跳转了。
              window.location.href = '/indexMobile'; //跳转到移动端默认的首页。


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

        this.randomCodeUrl = this.websiteUrl + '/springbootdemo/commons/mathRandomCode?token=' + this.token
      },

      //登录动作
      onClickRight: function () {
        this.$router.push({
          path: '/loginMobile',

        })

      },

      doCenter: function () {
        this.$router.push({
          path: '/centerMobile'
        })
      },
      onClickLeft: function () {
        this.$router.push({
          path: '/indexMobile'
        })
      }

    }
  }
</script>

<style scoped>

</style>
