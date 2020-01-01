<template>
  <div>
    <NavBar></NavBar>
    <br>
    <!--上方标签-->
    <el-row id="idrow">
      <el-col :offset="2" :span="20">
        <!--标签-->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(c,index) in tabsList" :key="index" :label="c.type" :name="c.type">
            <!--左边-->
            <div style="float: left ;width: 800px">
              <!--文章卡片-->
              <el-card v-for="(it,pos) in articlePager" :key="pos" :body-style="{ padding: '10px' }">
                <div style="padding: 14px;">
                  <div style="font-size: large;font-weight: bold;text-align: left">{{it.title}}</div>
                  <div class="bottom clearfix">
                    <div style="color: #9d9d9d;text-align: left">内容简介：{{it.sum}}</div>
                    <el-button type="text" class="button" @click="seeArticle(it.aid)">查看文章</el-button>
                  </div>
                </div>
              </el-card>
              <br>
              <br>
              <br>
              <!--分页组件-->
              <div id="article_pager" STYLE="text-align: center">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="pageSize"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :total="articleList.length">
                </el-pagination>
              </div>
            </div>

            <!--右边宣传栏-->
            <div style="">
              <h3 style="text-align: center">关于网站</h3>
              <div>这是我的个人编程网站</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>

    </el-row>
    <br>
    <br>
    <Tail></Tail>
  </div>
</template>

<script>
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";


  export default {
    name: "Tabs",
    components: {Tail, NavBar},
    data() {
      return {
        activeName: 'c',
        tabsList: [],
        articleList: [],
        pageSize: 3,//每页显示六条数据
        currentPage: 1,//默认第一页
      }
    },
    mounted() {
      this.initTabsList();
      this.initArticleList();
    },
    //计算属性分页
    computed: {
      articlePager: function () {
        return this.articleList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
    },
    methods: {
      // 点击tab栏更新文章卡片
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(tab.label);
        console.log(tab.name);
        this.initArticleList(); // 更新文章卡片列表
        console.log(this.articleList)
      },

      initTabsList() {
        let url = this.websiteUrl + '/springbootdemo/tabs/';
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            //console.log(response.data);
            if (response.data.code == 200) {
              that.tabsList = response.data.data;
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
          })
          .catch(function (error) {
            that.$message({
              message: '查询版块资料失败！',
              type: 'error'
            });
          })
      },

      // 更新文章卡片列表
      initArticleList: function () {
        let that = this;
        this.axios.get(this.websiteUrl + '/springbootdemo/article/cards?type=' + this.activeName)
          .then(function (response) {
            if (response.data.code == 200) {
              that.articleList = response.data.data;
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
            message: '查询失败！',
            type: 'error'
          });
        })
      },

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pageSize = size;
        console.log(this.pageSize)  //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },

      //路由跳转页面并传参
      seeArticle: function (aid) {
        this.$router.push({
          path: '/articleContent',
          query: {
            aid: aid
          }
        })

      }
    }
  }
</script>

<style scoped>

  #idrow {
    margin-top: 60px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 0px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1100px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 160px;
    height: 160px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
