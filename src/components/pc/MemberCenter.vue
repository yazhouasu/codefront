<template>
  <div>
    <Header ref="header"></Header>
    <main class="container-fluid content">
      <div class="container">
        <div class="row">
          <!--div md9 部分，显示文章详情和评论列表和发表评论开始-->
          <div class="col-md-9"
               style="background-color: #FFF; border:1px solid #ddd;border-radius: 0px;padding:20px 20px;display: inline-block;">
            <div class="col-md-4 col-md-offset-4" style="text-align: center">

              <el-avatar v-show="loginUser.gender=='男'" shape="circle" :size="120" :fit="fits[0]">
                <img src="../../assets/images/membercenter/logo.png"/>
              </el-avatar>

              <el-avatar v-show="loginUser.gender=='女'" shape="circle" :size="120" :fit="fits[0]">
                <img src="../../assets/images/membercenter/logo2.png"/>
              </el-avatar>

            </div>
            <br>
            <div class="col-md-12">
              <br>
              <hr>
            </div>
            <div class="col-md-12">
              <el-form ref="form" :model="loginUser" :inline="true" label-width="80px">
                <el-form-item label="用户名">
                  <el-input style="width:400px;" v-model="loginUser.username"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                  <div>
                    <span v-if="loginUser.type=='0'">普通用户</span><span v-if="loginUser.type=='1'">讲师/教师</span>
                    &nbsp;&nbsp;<span style="color: red" v-if="loginUser.isAdmin=='1'">管理员</span>
                  </div>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="loginUser.gender" style="width:220px;">
                    <el-radio :label="'男'">男</el-radio>
                    <el-radio :label="'女'">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="loginUser.birthday"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input style="width:220px;" v-show="loginUser.regType=='1'" disabled readonly
                            v-model="loginUser.email"></el-input>
                  <el-input style="width:220px;" v-show="loginUser.regType=='0'||loginUser.regType=='2'" v-model="loginUser.email"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-show="loginUser.regType=='0'" disabled readonly v-model="loginUser.mobile"></el-input>
                  <el-input v-show="loginUser.regType=='1' ||loginUser.regType=='2' " v-model="loginUser.mobile"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="街道/住址">
                  <el-input style="width:400px;" v-model="loginUser.address"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                  <el-input style="width:400px;" v-model="loginUser.school"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                  <el-input style="width:400px;" v-model="loginUser.idCard"></el-input>
                </el-form-item>
                <el-form-item label="积分">
                  <el-input readonly disabled v-model="loginUser.score"></el-input>
                </el-form-item>
                <el-form-item label="推荐人">
                  <el-input style="width:400px;" disabled readonly v-model="loginUser.recommendation"></el-input>
                </el-form-item>
                <el-form-item label="推荐码">
                  <el-input style="width:400px;" readonly v-model="loginUser.recommendId"></el-input>
                </el-form-item>

              </el-form>

              <br>
              <el-row style="text-align: center">
                <el-button round style="width: 180px" @click="onSubmit">保存</el-button>
              </el-row>
              <br>
            </div>


          </div>
          <!--右侧md3 部分，博客说明公告，热门文章，友情链接部分开始-->
          <div class="col-md-3 clearfix">
            <div class="blog-unit">
              <div class="blog-unit-title">关于博客</div>
              <hr>
              <div class="blog-unit-content">
                这是我的个人技术博客，主要记录和总结教学和工作中常用的知识及我的生活。
              </div>
            </div>
            <div class="blog-unit">
              <div class="ad">
                300x300
                <!--<img src="/static/images/blog/placehold.png" style="width: 100%;margin-bottom: 1px;" alt="">-->
              </div>
            </div>
            <div class="blog-unit hot-article">
              <div class="blog-unit-title">热门文章</div>
              <hr>
              <div class="blog-unit-content ">
                <ul>
                  <li><a href="/blog/html/25" title="HTML转义字符对照表"><span class="number0">1</span>HTML转义字符对照表</a></li>
                  <li><a href="/blog/javascript/19" title="HTML data-* 属性"><span class="number1">2</span>HTML data-*
                    属性</a></li>
                  <li><a href="/blog/javascript/32" title="JavaScript 运算符&表达式"><span class="number2">3</span>JavaScript
                    运算符&表达式</a></li>
                  <li><a href="/blog/javascript/34" title="JavaScript switch 语句"><span class="number3">4</span>JavaScript
                    switch 语句</a></li>
                  <li><a href="/blog/javascript/16" title="JavaScript 简介"><span class="number4">5</span>JavaScript
                    简介</a>
                  </li>
                  <li><a href="/blog/javascript/42" title="详解 js 跨域"><span class="number5">6</span>详解 js 跨域</a></li>
                  <li><a href="/blog/javascript/29" title="JavaScript 注释"><span class="number6">7</span>JavaScript
                    注释</a>
                  </li>
                  <li><a href="/blog/javascript/39" title="JavaScript 函数参数&Arguments"><span class="number7">8</span>JavaScript
                    函数参数&Arguments</a></li>
                </ul>
              </div>
            </div>
            <div class="blog-unit links">
              <div class="blog-unit-title">友情链接</div>
              <hr>
              <div class="blog-unit-content ">
                <ul class="clearfix">
                  <li class="col-md-6"><a href="http://www.jq22.com/" title="jquery插件库">jquery插件库</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>

  </div>
</template>

<script>
  import Header from '../include/Header';
  import Footer from '../include/Footer';
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'

  export default {
    name: "MemberCenter",
    components: {
      Header,
      Footer

    },
    data() {
      return {

        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: '../assets/images/membercenter/logo.png',
        options: regionData,

        loginUser: {
          username: '',
          gender: '男',
          birthday: '',
          email: '',
          mobile: '',
          province: '',
          city: '',
          zone: '',
          address: '',
          idCard: '',
          score: '',
          recommendation: '',
          recommendId: ''
        },

        selectedOptions: ['','','']
      }
    },
    mounted() {
      console.log("是否登录：" + this.$refs.header.isLogin);
      if (this.$refs.header.isLogin) {
        this.isLogin = true;
        this.loginUser = this.$refs.header.loginSuccessUser;
        if (this.loginUser.gender == null) {
          this.loginUser.gender = '男';
        }

        //初始化地区资料
        this.$set(this.selectedOptions,0,this.loginUser.province+'0000');
        this.$set(this.selectedOptions,1,this.loginUser.city+'00');
        this.$set(this.selectedOptions,2,this.loginUser.zone+'');

        //console.log("-----selectedOptions-------");
        //console.log(this.selectedOptions);
      }

    }
    ,
    methods: {
      onSubmit: function () {
        //console.log(this.loginUser);

        var that = this;
        this.axios.put(that.websiteUrl + '/examdemo/members/update', JSON.stringify(this.loginUser), {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response.data);
          if (response.data.code == 200) {
            that.$message({
              message: '用户资料更新成功！',
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
            message: '更新失败！',
            type: 'error'
          });
        })
      }
      ,
      handleChange(value) {
        console.log(value);
        console.log(this.options);
        console.log(this.selectedOptions);

        this.loginUser.province = value[0].substr(0, 2);
        this.loginUser.city = value[1].substr(0, 4);
        this.loginUser.zone = value[2];

        console.log(this.loginUser);
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css";
  @import "../../assets/minified_css/index-header.min.css";
  @import "../../assets/minified_css/index.min.css";
  @import "../../assets/minified_css/blog/index.min.css";
  @import "../../assets/minified_css/index-footer.min.css";
  @import "http://cdn.staticfile.org/emoji/0.2.2/emoji.css";
</style>
