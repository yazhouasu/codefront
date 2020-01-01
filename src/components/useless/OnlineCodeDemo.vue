<template>
  <div>
    <el-row>
      <el-col :offset="2" :span="20">

        <br><br>
        <el-form label-width="120px">
          <el-form-item label="类名">
            <el-input v-model="code.className" placeholder="请输入类名" :readonly="flag"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createSourceCode">创建源代码</el-button>
          </el-form-item>
          <el-form-item label="源代码">
            <el-input v-model="code.sourceCode" type="textarea" :rows="4" placeholder="请输入代码"></el-input>
          </el-form-item>
        </el-form>


        <el-form label-width="120px">
          <el-form-item label="">
            <el-button type="primary" @click="executeCode" round>编译执行</el-button>
          </el-form-item>
          <el-form-item label="编译结果">
            <el-input v-model="resultCode.compileResult" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="执行结果">
            <el-input v-model="resultCode.executeResult" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "OnlineCodeDemo",
    data() {
      return {
        code: {
          calssName: '',
          sourceCode: ''
        },
        resultCode: {
          compileResult: '',
          executeResult: ''
        },
        flag: false
      }
    },
    mounted() {
    },
    methods: {
      //创建源代码
      createSourceCode: function () {
        this.code.sourceCode = "public class " + this.code.className + " {\n" + "   public static void main(String[] args){\n" +
          "   }\n" + "}\n";
        this.flag = true;
      },

      //执行编译执行动作
      executeCode: function () {
        let that = this;
        let url = this.websiteUrl + '/springbootdemo/onlinecode/runcode';
        this.axios.post(url, this.code,{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(function (response) {
            if (response.data.code == 200) {
              that.resultCode = response.data.data;
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
            message: '编译失败',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
