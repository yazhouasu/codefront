<template>
  <div>
    <!--手机号注册-->
    <el-row>
      <el-col :offset="8" :span="8">
        <el-form :labelPosition="labelPosition" label-width="80px" :model="regUser" size="mini">

          <el-form-item label="手机号">
            <el-input v-model="regUser.mobile"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="regUser.username"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" v-model="regUser.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">·
            <el-input type="password" v-model="regUser.confirmpass"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="sendRandomCode">发送验证码</el-button>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="regUser.validateCode"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doReg" round>注册</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Reg1",
    data() {
      return {
        labelPosition: 'right',
        regUser: {
          mobile: '',
          username: '',
          password: '',
          confirmpass: '',
          validateCode: ''
        },
        token: ''
      }
    },
    mounted() {

    },
    methods: {
      //发送验证码
      sendRandomCode: function () {
        let that = this;
        let url = this.websiteUrl + '/springbootdemo/commons/mrcode?mobile=' + this.regUser.mobile;
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code = 200) {
              that.token = response.data.data;
              that.$message({
                message: response.data.msg,
                type: 'success'
              })
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }).catch(function (error) {
          that.$message({
            message: "验证码发送失败",
            type: 'error'
          })
        })

      },

      //执行注册
      doReg: function () {
        let that = this;
        let url = this.websiteUrl + '/springbootdemo/users/reg?token=' + this.token;
        this.axios.post(url, this.regUser)
          .then(function (response) {
            if (response.data.code == 200) {
              //跳转页面
              window.location.href = '/login';
              that.$message({
                message: response.data.msg,
                type: 'success'
              })
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }).catch(function (error) {
          that.$message({
            message: "注册失败",
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
