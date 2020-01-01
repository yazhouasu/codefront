<template>
  <div>
    <NavBar ref="header"></NavBar>
    <br><br><br><br><br>
    <el-row>
      <div><h4>用户资料管理</h4></div>
      <br>
      <el-col :offset="6" :span="12"
              style="background-color: #FFF; border:1px solid #ddd;border-radius: 0px;padding:20px 20px;display: inline-block;">
        <el-form label-width="80px">
          <el-form-item label="头像">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="User.username" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="User.mobile" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="User.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="User.sex" label="男">男</el-radio>
            <el-radio v-model="User.sex" label="女">女</el-radio>
          </el-form-item>
          <!--省市级联-->
          <el-form-item label="省市区">
            <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="街道住址">
            <el-input v-model="User.adress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="submitUserData">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <br><br>
    <Tail></tail>
  </div>
</template>

<script>
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";

  export default {
    name: "PersonalCenter",
    components: {Tail, NavBar},
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        User: {
          username: '',
          password: '',
          sex: '',
          province: '',
          city: '',
          area: '',
          adress: '',
          mobile: ''

        },
        selectedOptions: ['130000', '130300', '130306'],
        options: regionData,//从组件库引入选项
        loginSuccessUser: {} //父组件的属性
      }
    },
    created() {

    },

    mounted() {

      //将子组件的属性赋值给父组件
      this.loginSuccessUser = this.$refs.header.loginSuccessUser;
      //查询用户资料
      this.selectUser();

    },
    methods: {
      //赋值给省市区
      handleChange(value) {

        this.User.province = this.selectedOptions[0];
        this.User.city = this.selectedOptions[1];
        this.User.area = this.selectedOptions[2];

      },

      //查询用户资料
      selectUser: function () {

        let that = this;
        let url = this.websiteUrl + '/springbootdemo/users/select?uid=' + this.loginSuccessUser.uid;
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              that.User = response.data.data;
             that.$set(that.selectedOptions, 0, that.User.province);
              that.$set(that.selectedOptions, 1, that.User.city);
              that.$set(that.selectedOptions, 2, that.User.area);
              console.log("User.province是：" + that.User.province);
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
            message: '查询用户资料失败',
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
      }

    }
  }
</script>

<style scoped>

</style>
