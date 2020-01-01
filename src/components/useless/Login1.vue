<template>
  <!--前端验证码之拼图验证码，需安装拼图组件-->
  <!--offset偏移，span跨度，label表单域标签，model表单数据对象-->
  <div>
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form :labelPosition="labelPosition" label-width="80px" :model="loginUser">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <!--验证码-->
          <el-form-item>
            <div id="slider">
              <slide-verify :l="42"
                            :r="10"
                            :w="310"
                            :h="155"
                            @success="onSuccess"
                            @fail="onFail"
                            @refresh="onRefresh"
                            :slider-text="text"
              ></slide-verify>
              <!--<div>{{msg}}</div>-->
            </div>
          </el-form-item>
          <el-button type="primary" round @click="doLogin">立即登录</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "Login1",
    data() {
      return {
        labelPosition: 'right',
        loginUser: {
          username: '',
          password: ''
        },
        validate:false,//默认拼图验证未通过
        //msg:'',
        text:'拖动滑块完成拼图',


      }
    },
    mounted:{
      
    },
    methods:{
      onSuccess:function () {
        //this.msg='拼图成功'
        this.validate=true;
      },
      onFail:function () {
        //this.msg=''
      },
      onRefresh:function () {
        //this.msg=''
      },
      doLogin:function () {
        if(!this.validate){
          this.$message({
            message:'拼图验证失败',
            type:'warning'
          });
          return;
        }
        console.log("真正去发送登录请求")
      }
    }
  }
</script>

<style scoped>

  #slider {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
