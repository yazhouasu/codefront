<template>
  <div>
    <NavBar></NavBar>
    <!--使用NavBar会造成格式错误-->
    <br><br><br><br><br>
    <!--文件上传-->
    <el-row>
      <el-col :offset="2" :span="8"
              style=" border:1px solid #aaa;border-radius: 10px;padding:20px 20px;">
        <h4>上传文件</h4>
        <el-upload
          class="upload-demo"
          name="file"
          :action="this.websiteUrl+'/springbootdemo/commons/upload'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :before-upload="beforeUploadFiles"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip1" style="font-size: smaller">能上传任意文件，且不超过5M</div>
        </el-upload>

        <br>
        <br>

        <el-upload
          class="avatar-uploader"
          name="file"
          :action="this.websiteUrl+'/springbootdemo/commons/upload'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUploadFiles2"
        >
          <h4>上传头像</h4>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" >
          <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid;"></i>
        </el-upload>
      </el-col>

      <!--文件下载-->
      <el-col :offset="2" :span="8"
              style=" border:1px solid #aaa;border-radius: 10px;">
        <h4 style="text-align: center">下载文件</h4>
        <ul>
          <li v-for="(f,index) in fileListDownload" :key="index">
            <a :href="urlPrefix+f">{{f}}</a>
          </li>
        </ul>
      </el-col>

    </el-row>

    <br><br>
    <Tail></Tail>
  </div>
</template>

<script>

  import Tail from "../commons/Tail";
  import NavBar from "../commons/NavBar";

  export default {
    name: "UpAndDown",
    components: {NavBar, Tail},
    data() {
      return {
        fileList: [],
        imageUrl: '',
        fileListDownload: [],
        urlPrefix: this.websiteUrl + '/springbootdemo/api/file/'
      }
    },
    mounted() {
      this.initFileNameList();
    },
    methods: {
      //文件上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      //头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUploadFiles(file) {

        const isLt5M = file.size / 1024 / 1024 < 5;

        /*
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      beforeUploadFiles2(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';

        const isLt5M = file.size / 1024 / 1024 < 5;


        if (!(isJPG || isPNG || isBMP)) {
          this.$message.error('上传头像图片只能是图片格式!');

        }

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M && (isJPG || isPNG || isBMP);
      },

      //文件下载
      initFileNameList() {
        let url = this.websiteUrl + '/springbootdemo/commons/download';
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            console.log(response.data);
            if (response.data.code == 200) {
              that.fileListDownload = response.data.data;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
