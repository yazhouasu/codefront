<template>
  <div>
    <h2 style="text-align: center">文件下载案例</h2>
    <el-row>
      <el-col :offset="6" :span="12">
       <ul>
         <li v-for="(f,index) in fileList" :key="index">
           <a :href="urlPrefix+f">{{f}}</a>
         </li>
       </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "DownloadDemo",
    data(){
      return{
        fileList:[],
        urlPrefix:this.websiteUrl+'/springbootdemo/api/file/'
      }
    },
    mounted(){
      this.initFileNameList();
    },
    methods:{
      initFileNameList(){
        let url = this.websiteUrl + '/springbootdemo/commons/download';
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            console.log(response.data);
            if (response.data.code == 200) {
              that.fileList = response.data.data;
              console.log(response.data.data);
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '获取下载文件列表失败！',
            type: 'error'
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
