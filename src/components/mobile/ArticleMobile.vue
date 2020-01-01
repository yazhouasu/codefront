<template>
  <div>
    <div>
      <van-nav-bar
        title=""
        :fixed="fix"
        left-text=""
        right-text=""
        style="background-color: #31708f"
        @click-right="onClickRight"
        @click-left="onClickLeft"
      >
        <a slot="title" href="/indexMobile">
          <img src="../../assets/images/logo.png" style="width: 150px ;height: 30px;margin-top: 9px;">
        </a>

        <slot slot="right" href="/loginMobile" v-if="!isLogin">
          <div style="color: white">< 登录</div>
        </slot>

        <slot slot="left" href="/panel">
          <div style="color: white;font-size: 14px">
            <van-icon color="white" size="15px" name="arrow-left"/>
            返回
          </div>
        </slot>

        <slot slot="right" class="login-register" v-if="isLogin">
          <a href="/centerMobile" @click="doCenter" style="color: white">{{this.loginSuccessUser.username}}</a>
          <!--<a href="/indexMobile" @click="doLogout"><i class="el-icon-back"></i>&nbsp;退出登录</a>-->
        </slot>
      </van-nav-bar>
    </div>
    <br><br><br>
    <van-row>
      <van-col :offset="2" :span="20">
        <div>文章标题：{{article.title}}</div><br>
        <div>文章内容：</div>
        <div v-html="article.content"></div>
      </van-col>
    </van-row>
    <br><br><br>
    <BottomMobile></BottomMobile>
  </div>
</template>

<script>

  import BottomMobile from "../commons/BottomMobile";

  export default {
    name: "ArticleMobile",
    components: {BottomMobile},
    data() {
      return {
        aid: '',
        article: [],
        fix: true,//是否固定在顶部,
        isLogin: false, //判断用户登录状态
        loginSuccessUser: {}, //登录成功的用户对象。
      }
    },
    mounted() {
      //路由传参
      this.aid = this.$route.query.aid;
      //根据aid查找并显示文章内容
      this.initSelectArticle();
      this.initVideo();
      this.isLogin = graceChecker.isLogin();
      if (this.isLogin) {
        if (sessionStorage.getItem("www.simoniu.com") != null) {

          //JSON.parse
          //JSON.stringify   是jQuery的方法，在vue 默认是不能用。

          this.loginSuccessUser = JSON.parse(sessionStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);

        }
        if (localStorage.getItem("www.simoniu.com") != null) {

          this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
          console.log(this.loginSuccessUser);

        }
      }
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

      },

      //初始化视频方法
      initVideo() {
        let myPlayer = this.$video(myVideo, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "300px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "150px"
        });
      },
      //登录动作
      onClickRight: function () {
        this.$router.push({
          path: '/loginMobile',

        })

      },

      doCenter: function () {
        this.$router.push({
          path: '/centerMobile'
        })
      },
      onClickLeft: function () {
        this.$router.push({
          path: '/panel'
        })
      }
    }
  }
</script>

<style scoped>

</style>
