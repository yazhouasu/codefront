<template>
  <div>
    <el-row>
      <el-col :offset="2" :span="20">
        <!--<div>aid：{{aid}}</div>-->
        <div>文章标题：{{article.title}}</div>
        <div>文章内容：</div>
        <!--<div v-model="article.mdcontent"></div>&lt;!&ndash;因格式问题所以不显示内容&ndash;&gt;-->
        <div  v-html="article.content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "ArticleContent",
    data() {
      return {
        aid: '',
        article:[]
      }
    },
    mounted() {
      //路由传参
      this.aid = this.$route.query.aid;
      //根据aid查找并显示文章内容
      this.initSelectArticle();
    },
    methods: {
      initSelectArticle: function () {
        let that = this;
        let url = this.websiteUrl + '/springbootdemo/article/content?aid=' + this.aid;
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              that.article = response.data.data;
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
            message: '获取文章内容失败',
            type: 'error'
          })
        })

      }
    }
  }
</script>

<style scoped>

</style>
