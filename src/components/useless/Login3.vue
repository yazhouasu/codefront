<template>
  <!--前端验证之数字字母验证-->
  <div>
    <el-row>
      <el-col :offset="8" :span="8">
        <el-form :lablePosition="lablePosition" label-width="80px" size="mini" :model="loginUser" style="background-color:beige">
          <el-form-item label="用户名">
            <el-input  v-model="loginUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <!--数字字母验证码-->
          <el-form-item>
            <div class="s-canvas">
              <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                      :height="contentHeight"
                      @click="handleClick"></canvas>
            </div>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="loginUser.randomCode"></el-input>
          </el-form-item>

          <el-button type="primary" @click="doLogin" round>立即登录</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Login3",
    props: {
      fontSizeMin: {
        type: Number,
        default: 32
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 20
      },
      colorMax: {
        type: Number,
        default: 40
      },
      lineColorMin: {
        type: Number,
        default: 20
      },
      lineColorMax: {
        type: Number,
        default: 80
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 136
      },
      contentHeight: {
        type: Number,
        default: 48
      }
    },
    data() {
      return {
        lablePosition:'right',
        loginUser: {
          username: '',
          password: '',
          randomCode:''//用户填写的验证码
        },
        identifyCode: '',//前端生成的验证码
      }
    },
    methods:{
      checkValidateCode: function () {
        if (this.randomCode == this.identifyCode) {
          this.$alert('验证通过', '提示信息', {
            confirmButtonText: '确定'

          });
        } else {
          this.$alert('验证码错误', '提示信息', {
            confirmButtonText: '确定'
          });
        }
      },

      //点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
      handleClick() {
        let num = "";
        for (let i = 0; i < 4; i++) {
          num += Math.floor(Math.random() * 10)
        }
        this.identifyCode = num
        let newN = this.identifyCode
        this.$emit('changeCode', newN)
      },

      // 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },

      // 生成一个随机的颜色
      randomColor(min, max) {
        var r = this.randomNum(min, max)
        var g = this.randomNum(min, max)
        var b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },

      drawPic() {
        var canvas = document.getElementById('s-canvas')
        var ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        ctx.fillStyle = this.randomColor(
          this.backgroundColorMin,
          this.backgroundColorMax
        )
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },

      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font =
          this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },

      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = this.randomColor(
            this.lineColorMin,
            this.lineColorMax
          )
          ctx.beginPath()
          ctx.moveTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.lineTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.stroke()
        }
      },

      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight),
            1,
            0,
            2 * Math.PI
          )
          ctx.fill()
        }
      },

      doLogin:function () {
        if(this.identifyCode!=this.loginUser.randomCode){
          this.$message({
            message:'验证码错误',
            type:'warning'
          })
          return;
        }
        console.log("真正执行登录动作")
      }
    },
    watch: {
      identifyCode() {
        this.drawPic()
      }
    },
    mounted() {
      this.drawPic()
      this.handleClick()
    }
  }
</script>

<style scoped>

</style>
