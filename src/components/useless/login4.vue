<template>
  <!--后端验证码之数学公式验证-->
  <div>
    <el-row>
      <el-col :offset="8" :span="8">
        <el-form :labelPosition="labelPosition" label-width="80px" :model="loginUser" style="background-color: beige"
                 size="mini">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <!--数学公式验证-->
          <el-form-item>
            <img style="cursor: pointer" title="看不清换一张" @click="changeRandomCode" :src="randomCodeUrl"></img>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="loginUser.validateCode"></el-input>
          </el-form-item>
          <el-button type="primary" round @click="doLogin">立即登录</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "login4",
    data() {
      return {
        labelPosition:'right',
        loginUser: {
          username: '',
          password: '',
          validateCode: ''
        },
        token: '',//发送给服务器的token值
        randomCodeUrl: '',
        loginSuccessUser:{}
      }
    },
    mounted() {
      //向浏览器发送请求生成验证码，生成并传递token值（使用jsonwebtoken组件）
      this.changeRandomCode();
    },
    methods: {
      //向浏览器发送请求生成验证码，生成并传递token值（使用jsonwebtoken组件）
      changeRandomCode: function () {
        const jwt = require('jsonwebtoken');
        let payload = new Date().getTime() + "";//当前时间的毫秒数
        let secret = 'www.simoniu.com'; //网站的域名
        this.token = jwt.sign(payload, secret);//公钥加私钥生成唯一token
        this.randomCodeUrl = 'http://localhost:8888/springbootdemo/commons/mathRandomCode?token=' + this.token
      },

      doLogin:function () {
        let that=this;
        let url=this.websiteUrl+'/springbootdemo/users/login?token='+this.token;
        this.axios.get(url,
          {
            params: {
              username: that.loginUser.username,
              password: that.loginUser.password,
              validateCode: that.loginUser.validateCode
            }
          })
          .then(function (response) {
            if(response.data.code=200){
              //返回登录成功的用户对象
              that.loginSuccessUser=response.data.data;
              //保存登录成功的用户资料
              localStorage.setItem("www.simoniu.com", JSON.stringify(that.loginSuccessUser));
              //跳转页面
              window.location.href = '#';
              that.$message({
                message:response.data.msg,
                type:'success'
              })
            }else{
              that.$message({
                message:response.data.msg,
                type:'error'
              })
            }
          }).catch(function (error) {
          that.$message({
            message:"登录失败",
            type:'error'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
