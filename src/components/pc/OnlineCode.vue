<template>
  <div>
    <NavBar></NavBar>
    <br>
    <el-row :gutter="20">
      <br><br><br>
      <el-col :span="18" :offset="3"
              style="border:1px solid #aaa;border-radius: 10px;padding:20px 20px;display: inline-block;">
        <div>
          <h4>在线运行</h4>
          <br>
        </div>
        <el-form label-width="120px">
          <el-form-item label="类名">
            <el-input v-model="code.className" :readonly="flag" placeholder="请输入类名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="flag" type="primary" round @click="initSourceCode">创建源代码</el-button>
          </el-form-item>
          <el-form-item label="源代码">
            <el-input type="textarea" :rows="5" placeholder="请输入代码" v-model="code.sourceCode"></el-input>
          </el-form-item>
        </el-form>

        <el-form label-width="120px">
          <el-form-item>
            <el-button type="primary" @click="executeCode">编译执行</el-button>
          </el-form-item>
          <el-form-item label="编译结果">
            <el-input type="textarea" :rows="4" placeholder="" v-model="resultCode.compileResult"></el-input>
          </el-form-item>
          <el-form-item label="执行结果">
            <el-input type="textarea" :rows="4" placeholder="" v-model="resultCode.executeResult"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <br>
    <Tail></Tail>
  </div>
</template>

<script>
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";

  export default {
    name: "OnlineCode",
    components: {Tail, NavBar},
    data() {
      return {
        flag: false,
        code: {
          className: '',
          sourceCode: ''
        },
        resultCode: {
          compileResult: '',
          executeResult: ''
        }
      }
    },
    mounted() {

    },
    methods: {
      //创建源代码
      initSourceCode: function () {
        this.code.sourceCode = "public class " + this.code.className + " {\n" + "   public static void main(String[] args){\n" +
          "   }\n" + "}\n";
        this.flag = true;
      },
      //执行结果
      executeCode: function () {

        let that = this;
        let uri = this.websiteUrl + '/springbootdemo/onlinecode/runcode';

        this.axios.post(uri, this.code, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            that.resultCode = response.data.data;
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
            message: '程序发生错误！',
            type: 'error'
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
