<template>
  <div>
    <NavMobile></NavMobile>
    <br><br><br>

    <van-row>
      <van-col :span="2">
        <!--左侧标签-->
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item v-for="(c,index) in tabsList" :title=c.type :key="index"/>
        </van-sidebar>
      </van-col>

      <van-col :offset="3" :span="18">
        <!--右侧-->
        <div style="">
          <van-cell-group v-for="(it,pos) in articlePager" :key="pos">
            <van-cell :title="it.title" :label="'简介：'+it.sum"/>
            <van-cell title="" value="查看文章" @click="seeArticle(it.aid)"/>
          </van-cell-group>
          <br><br>
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
      </van-col>
    </van-row>
    <br><br><br>
    <BottomMobile></BottomMobile>
  </div>
</template>

<script>
  import NavMobile from "../commons/NavMobile";
  import BottomMobile from "../commons/BottomMobile";

  export default {
    name: "Panel",
    components: {BottomMobile, NavMobile},
    data() {
      return {
        activeKey: 'c',
        tabsList: [],
        articleList: [],
        pageSize: 4,//每页显示六条数据
        currentPage: 1//默认第一页
      }
    },
    computed: {
      //计算属性分页
      articlePager: function () {
        return this.articleList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }

    },
    mounted() {
      this.initTabsList();
      this.initArticleList();
    },

    methods: {
      onChange(index) {
        console.log("它是：" + index);
        if (index == 0) {
          this.activeKey = 'c';
        } else if (index == 1) {
          this.activeKey = 'Java';
        } else if (index == 2) {
          this.activeKey = 'Js';
        } else if (index == 3) {
          this.activeKey = '数据库';
        } else if (index == 4) {
          this.activeKey = 'Linux';
        } else if (index == 5) {
          this.activeKey = '移动开发';
        } else if (index == 6) {
          this.activeKey = '数据结构';
        } else if (index == 7) {
          this.activeKey = '大数据';
        } else if (index == 8) {
          this.activeKey = '区块链';
        }

        this.initArticleList(); // 更新文章卡片列表

      },

      // 点击tab栏更新文章卡片
      handleClick(sidebar, event) {
        console.log(sidebar, event);
        console.log(sidebar.label);
        console.log(sidebar.name);
        this.initArticleList(); // 更新文章卡片列表
        console.log(this.articleList)
      },
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
        this.axios.get(this.websiteUrl + '/springbootdemo/article/cards?type=' + this.activeKey)
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
          path: '/ArticleMobile',
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
