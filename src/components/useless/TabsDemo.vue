<template>
  <div>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane  v-for="(c,index) in tabsList" :key="index" :label="c.type" :name="c.type">{{c.type}}</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "TabsDemo",
    data() {
      return {
        activeName: 'c',
        tabsList: []
      }
    },
    mounted(){
      this.initTabs();
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      initTabs: function () {
        let that = this;
        let url = 'http://localhost:8888/springbootdemo/catalog/';
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              that.tabsList = response.data.data;
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
            message:'查询失败',
            type:'error'
          })

        })
      }
    }
  }
</script>

<style scoped>

</style>
