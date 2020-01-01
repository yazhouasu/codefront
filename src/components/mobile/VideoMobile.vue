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

        <slot slot="left" href="/indexMobile">
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
    <!--在线视频-->
    <el-row :gutter="20">

      <el-col :span="20" :offset="2"
              style="border:1px solid #aaa;border-radius: 10px;padding:20px 20px;display: inline-block;">
        <div>
          在线课程视频<br><br>
        </div>

        <div class="test_two_box">
          <video id="myVideo" class="video-js">
            <source src="http://media.simoniu.com/test.mp4" type="video/mp4">
          </video>
        </div>
      </el-col>
    </el-row>
    <br>

    <!--在线音频-->
    <AudioMobile></AudioMobile>
    <br><br>
    <BottomMobile></BottomMobile>
  </div>
</template>

<script>
  var graceChecker = require("../../assets/scripts/commons/graceChecker.js");
  import BottomMobile from "../commons/BottomMobile";
  import AudioMobile from "./AudioMobile";

  export default {
    name: "VideoMobile",
    components: {AudioMobile, BottomMobile},
    data() {
      return {
        fix: true,//是否固定在顶部,
        isLogin: false, //判断用户登录状态
        loginSuccessUser: {}, //登录成功的用户对象。
      }
    },
    mounted() {
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
          path: '/indexMobile'
        })
      }
    }
  }
</script>

<style scoped>
  /*标题的颜色*/
  div.van-nav-bar__title.van-ellipsis, div.van-nav-bar__right > span {
    color: #FFF;
  }

  div.van-nav-bar__title.van-ellipsis, div.van-nav-bar__left > span {
    color: #FFF;
  }

</style>
