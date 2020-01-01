<template>
  <div>
    <el-row>
      <el-col :offset="6" :span="12"
              style="background-color: #FFF; border:1px solid #ddd;border-radius: 0px;padding:20px 20px;display: inline-block;">
        <el-form :inline="true">
          <el-form-item label="地区">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="街道/住址">
            <el-input style="width:400px;" type="text" v-model="address"></el-input>
          </el-form-item>
        </el-form>

        <el-form>
          <el-button @click="getAddress">获取地址</el-button>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'



  export default {
    name: "ProvinceCityDemo",
    data(){
      return{
        options: regionData,
        selectedOptions:['','',''],
        address:'',
      }
    },
    methods:{
      handleChange(value) {
        console.log(value);
        console.log(CodeToText[this.selectedOptions[0]]);
        console.log(this.options);
        console.log(this.selectedOptions);
        console.log(this.address);

      },

      getAddress:function(){
        var addr = CodeToText[this.selectedOptions[0]]+" "+CodeToText[this.selectedOptions[1]]+" "+CodeToText[this.selectedOptions[2]]+" "+this.address;
        console.log(addr);
      }
    }
  }
</script>

<style scoped>

</style>
