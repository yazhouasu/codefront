<template>
  <div>
    <!--导航栏-->
    <NavMobile></NavMobile>

    <!--轮播组件-->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item><img src="../../assets/images/slides/mobile1.png"></van-swipe-item>
      <van-swipe-item><img src="../../assets/images/slides/mobile2.png"></van-swipe-item>
      <van-swipe-item><img src="../../assets/images/slides/mobile3.png"></van-swipe-item>
      <van-swipe-item><img src="../../assets/images/slides/mobile4.png"></van-swipe-item>
    </van-swipe>

    <!--小喇叭通知-->
    <van-notice-bar
      text="亚州编程网作为一家有品质的网站，旨在帮助大家更好地学习编程知识，即学即练"
      left-icon="volume-o"
    ></van-notice-bar>

    <!--课程图片-->
    <van-row>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img2.imgtn.bdimg.com/it/u=4100803635,1906323951&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img0.imgtn.bdimg.com/it/u=2263534196,3918637004&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img1.imgtn.bdimg.com/it/u=2097057086,3275053503&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          fit="contain"
          src="http://img5.imgtn.bdimg.com/it/u=2480747687,3837162796&fm=11&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img4.imgtn.bdimg.com/it/u=536157504,1476621832&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img2.imgtn.bdimg.com/it/u=3000243445,586392055&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img2.imgtn.bdimg.com/it/u=386599024,4017280892&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
      <van-col span="12">
        <van-image
          width="150"
          height="100"
          src="http://img2.imgtn.bdimg.com/it/u=3952825962,3873587046&fm=26&gp=0.jpg"
          @click="seeVideo"
        />
      </van-col>
    </van-row>

    <br>
    <br>
    <br>

    <BottomMobile></BottomMobile>
  </div>
</template>

<script>
  import BottomMobile from "../commons/BottomMobile";
  import NavMobile from "../commons/NavMobile";

  export default {
    name: "IndexMobile",
    components: {NavMobile, BottomMobile},

    data() {
      return {
        active: 0
      }
    },
    methods:{
      //跳转到视频课程页面
      seeVideo:function () {
        this.$router.push({
          path:'/videoMobile',
        })
      }
    }
  }
</script>

<style scoped>
  div.van-swipe {
    margin-top: 46px;

    height: 160px;
    width: 100%;
    background-color: lightskyblue;
    line-height: 160px;
  }
</style>
