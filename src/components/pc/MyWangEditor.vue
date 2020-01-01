<template>
  <div>
    <NavBar></NavBar>
    <br><br><br><br><br><br>
    <!--<div class="markdown-body" v-html="htmlContent">-->
    <!--v-model="article.mdcontent"-->
    <el-row>
      <el-col :offset="2" :span="20">
        <div id="main" style="width: 100%">
          <div ref="editor" style="text-align:left"></div>
        </div>
        <br><br>
        <el-form>
          <el-form-item label="文章类型是：">
            <!--<el-input v-model="article.type"></el-input>-->
            <el-radio v-model="article.type" label="c">c</el-radio>
            <el-radio v-model="article.type" label="Js">Js</el-radio>
            <el-radio v-model="article.type" label="数据库">数据库</el-radio>
            <el-radio v-model="article.type" label="Linux">Linux</el-radio>
            <el-radio v-model="article.type" label="移动开发">移动开发</el-radio>
            <el-radio v-model="article.type" label="数据结构">数据结构</el-radio>
            <el-radio v-model="article.type" label="Java">Java</el-radio>
          </el-form-item>
          <el-button @click="publishArticle" type="primary" round>发布文章</el-button>
        </el-form>
      </el-col>
    </el-row>
    <br><br><br>
    <Tail></Tail>
  </div>
</template>

<script>

  import E from 'wangeditor';//引入wangeitor
  var editor;
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";

  export default {
    name: "MyWangEditor",
    components: {Tail, NavBar},
    data() {
      return {
        article: {
          mdcontent: '',
          content: '',
          type: '',
          title: 'a',
          sum: 'a',
          version: '0',
          modify_time: 'a',
          flag: 'true',
          create_time: 'a',
          aid: '100'
        }
      }
    },
    mounted() {
      // 加载wangeditor
      editor = new E(this.$refs.editor);
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        //'image',  // 插入图片
        'table',  // 表格
        //'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ];

      editor.customConfig.onchange = (html) => {
        this.article.content = html;
        this.article.mdcontent=editor.txt.text()

      };
      editor.create()
    },

    methods: {

      publishArticle: function () {
        console.log(this.article);
        let url = this.websiteUrl + '/springbootdemo/article/save?article=';
        let that = this;
        this.axios.post(url, this.article).then(function (response) {
          //console.log(response.data);
          if (response.data.code == 200) {

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
            message: '文章保存失败！',
            type: 'error'
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
