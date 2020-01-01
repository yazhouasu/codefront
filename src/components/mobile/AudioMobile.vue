<template>
  <van-row :gutter="20">
    <van-col :span="20" :offset="2"
            style="border:1px solid #aaa;border-radius: 10px;padding:20px 20px;display: inline-block;">
      <div>
        在线音频播放<br><br>
      </div>

      <div class="test_two_box">
        <video id="myAudio" class="video-js">
          <source src="http://media.simoniu.com/Applause.mp3" type="audio/mpeg">
        </video>
      </div>

    </van-col>
  </van-row>
</template>

<script>
    export default {
        name: "AudioMobile",
      data() {
        return {}
      },
      mounted() {
        this.initVideo();
      },
      methods: {
        //初始化音频方法
        initVideo() {
          let myPlayer = this.$video(myAudio, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "300px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "40px"
          });
        }
      }
    }
</script>

<style scoped>

</style>
