<template>
  <div>
    <NavBar></NavBar>
    <br><br><br><br>
    <!--在线视频-->
    <el-row :gutter="20">

      <el-col :span="12" :offset="6"
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
    <Audio></Audio>
    <br><br>
    <Tail></Tail>
  </div>
</template>

<script>
  import NavBar from "../commons/NavBar";
  import Tail from "../commons/Tail";
  import Audio from "./Audio";

  export default {
    name: "Video",
    components: {Tail, NavBar, Audio},
    data() {
      return {}
    },
    mounted() {
      this.initVideo();
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
          width: "640px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "320px"
        });
      }
    }
  }
</script>

<style scoped>

</style>
