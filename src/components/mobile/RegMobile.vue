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

        <slot slot="left" href="/loginMobile">
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

    <van-row>
      <van-col :offset="2" span="20">
        <van-cell-group>
          <br><br><br>
          <van-field
            v-model="regUser.mobile"
            label="手机号码"
            right-icon="question-o"
            placeholder="请输入手机号码"
            @click-right-icon="$toast('您有任何疑问请联系工作人员')"
          />

          <van-field
            v-model="regUser.username"
            label="用户名"
            placeholder="请输入用户名"
          />

          <van-field
            v-model="regUser.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
          />

          <van-field
            v-model="regUser.confirmpass"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
          />

          <van-field
            v-model="regUser.validateCode"
            label="验证码"
            placeholder="请输入验证码"
          />

        </van-cell-group>

        <van-button type="primary" size="small" @click="sendRandomCode">发送验证码</van-button>

        <br><br>
        <van-button type="primary" size="small" @click="doLogin">点击注册</van-button>
      </van-col>
    </van-row>

    <BottomMobile></BottomMobile>
  </div>
</template>

<script>

  import BottomMobile from "../commons/BottomMobile";

  export default {
    name: "RegMobile",
    components: {BottomMobile},
    data() {
      return {
        regUser:{
          mobile:'',
          username:'',
          password:'',
          confirmpass:'',
          validateCode:''
        },
        token: '', //获取验证码时，发给服务器的token值。
        randomCodeUrl: '',
        loginSuccessUser: {},
        fix: true,//是否固定在顶部,
        isLogin: false, //判断用户登录状态
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
      //执行用户注册
      doReg() {
        let url = this.websiteUrl+'/springbootdemo/users/reg?token=' + this.token;
        let that = this;
        this.axios.post(url,this.regUser).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {

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
      sendRandomCode:function(){
        let url = this.websiteUrl+'/springbootdemo/commons/mrcode?mobile=' + this.regUser.mobile;
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              //页面跳转了。
              window.location.href = '/loginMobile'; //跳转到移动端登录页面。
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
          path: '/loginMobile'
        })
      }

    }
  }
</script>

<style scoped>

</style>
