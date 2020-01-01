<template>
  <div>
    <NavMobile ref="navmobile"></NavMobile>
    <br><br><br><br>
    <van-row>
      <van-col :offset="2" :span="20">
        <div><h3>用户资料</h3></div>
        <van-cell-group>
          <van-field
            v-model="User.username"
            clearable
            label="用户名"
          />

          <van-field
            v-model="User.mobile"
            clearable
            label="手机号"
          />

          <van-field
            v-model="User.password"
            clearable
            label="密码"
          />

          <van-radio-group v-model="User.sex">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </van-cell-group>

        <van-button type="primary" size="small" @click="submitUserData">确认更改</van-button>

        <van-button type="primary" size="small" @click="doLogout">退出账号</van-button>
      </van-col>
    </van-row>

    <BottomMobile></BottomMobile>
  </div>
</template>

<script>
  import NavMobile from "../commons/NavMobile";
  import BottomMobile from "../commons/BottomMobile";

  export default {
    name: "CenterMobile",
    components: {BottomMobile, NavMobile},
    data() {
      return {
        User: {
          username: '',
          password: '',
          sex: '',
          mobile: ''
        },
        loginSuccessUser: {}, //父组件的属性
        radio: ''
      }
    },
    mounted() {

      //将子组件的属性赋值给父组件
      this.loginSuccessUser = this.$refs.navmobile.loginSuccessUser;
      //查询用户资料
      this.selectUser();
    },
    methods: {
      //查询用户资料
      selectUser: function () {

        let that = this;
        let url = this.websiteUrl + '/springbootdemo/users/select?uid=' + this.loginSuccessUser.uid;
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              that.User = response.data.data;
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
            message: '请先登录账号',
            type: 'error'
          })
        })
      },

      //提交更改后的用户资料
      submitUserData: function () {
        let that = this;
        let url = this.websiteUrl + "/springbootdemo/users/update";
        this.axios.post(url, this.User)
          .then(function (response) {
            if (response.data.code == 200) {
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
            message: '提交失败',
            type: 'error'
          })
        })
      },

      //退出登录
      doLogout: function () {

          if (sessionStorage.getItem("www.simoniu.com") != null) {
            sessionStorage.removeItem("www.simoniu.com");
          }
          if (localStorage.getItem("www.simoniu.com") != null) {
            localStorage.removeItem("www.simoniu.com");
          }

        window.location.href = '/indexMobile'
      }

    }
  }
</script>

<style scoped>

</style>
