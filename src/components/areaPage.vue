<template>
    <el-container style=" border: 1px solid #eee">
        <el-header style="text-align: left;font-size: 21px; background-color:rgb(195, 198, 211); color:black;letter-spacing:3px">
          <el-row >
            <el-col :span="23" style="margin-top:29px; font-size:23px; font-weight:bold;">
              
                <div style="margin-top:-20px">
                  <!-- <img :src="imgurl" alt="imgurl" title="首页" @click="logolink()" style="cursor:pointer;width:90px;height:40px;margin-left:1%;margin-top:1px"> <div style="margin-top:-20px; margin-left:10%; font-family:'Helvetica Neue'">网络安全事件态势感知</div> -->
                  <img :src="imgurl" alt="imgurl" title="首页" @click="logolink()" style="width:40px;height:40px;margin-left:1%;margin-top:1px;cursor:pointer;"> 
                  <div style="margin-top:-20px; margin-left:6%; font-family:'Helvetica Neue'">网络安全事件态势感知</div>                
                </div>
              </el-col>
              <el-col :span="1" style="margin-top:20px;">
                <div @click="tuichu">
                  <img :src="imgurl2" alt="imgurl2" title="退出" style="width:20px;height:20px;margin-top:1px;cursor:pointer;">
                </div>
              </el-col>
            </el-row>        
        </el-header>
        
        <el-main style="background-color: white;">
            <el-row>
              <el-col :span="24">
                <div>
                  <areaMap></areaMap>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <!-- <el-row :gutter="20">
              <el-header style="background-color: white; text-align: left; font-size: 20px;  height:52px; margin-top:-5px;">全国网络安全事件概览</el-header>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <num2></num2>
                </div>
              </el-col>
              
              <el-col :span="12">
                <div>
                  <shejidanwei2></shejidanwei2>
                </div>
              </el-col>
            </el-row>  -->
            <div style="height:18px;"></div>
            <el-row>
              <el-header style="background-color: white; text-align: left; font-size: 20px;  height:52px; margin-top:-23px; margin-left:-10px;">{{$store.state.area}}网络安全事件概览</el-header>
              <el-col :span="24">
                <div>
                  <xiangqing4></xiangqing4>
                </div>
              </el-col>
            </el-row>
        </el-main>
    </el-container>
  
</template>

<script>
import areaMap from './areaMap.vue';
import axios from 'axios'
// import Num2 from './num2.vue';
// import Shejidanwei2 from './shejidanwei2.vue';
import Xiangqing4 from './xiangqing4.vue';
export default {
    data(){
      return {
        imgurl:require("@/assets/logo2.png"),
        imgurl2:require("@/assets/exit2.png")
      }
    },
    components:{
      areaMap,
        // Num2,
        // Shejidanwei2,
        Xiangqing4
    },
    methods:{
      logolink(){
      if (
            this.$store.state.userLevel == 1
          ) {
            this.$router.push({
              name: "countryPage",
            });
            this.$store.dispatch("updatearea", "");
            this.$store.dispatch("updatecity", "");
            this.$store.dispatch("updateprovince", "");
            return;
          }else if (
            this.$store.state.userLevel == 2
          ) {
            this.$router.push({
              name: "provincePage",
            });
            this.$store.dispatch("updatearea", "");
            this.$store.dispatch("updatecity", "");
            return;
          }else if (
            this.$store.state.userLevel == 3
          ) {
            this.$router.push({
              name: "cityPage",
            });
            this.$store.dispatch("updatearea", "");
            return;
          }else if (
            this.$store.state.userLevel == 4
          ){
            return;
          }
      },
      tuichu(){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            
             var user_info = this.$store.state.userinfo
            // console.log(typeof(JSON.parse(user_info)))
            axios({
            method:"post",
            url:"/login_out",
            data:{ user_info: user_info },
            headers:{
              'X-CSRFToken':this.$store.state.token
            }
          }).then(()=>{
            this.$message({
                  message: '退出成功！',
                  type: 'success'
                });
            //console.log(typeof(user_info)) //string
            // window.sessionStorage.removeItem("user_info")
            window.sessionStorage.clear()
            this.$store.dispatch('updateuserinfo',[]);
            this.$router.replace("/");
            //触发后禁止浏览器的后退键
            history.pushState(null, null, document.URL);
            window.addEventListener("popstate", function (e) {
              history.pushState(null, null, document.URL);
            }, false);
          }).catch(() => {
              //console.log(err)
              window.sessionStorage.clear();
            this.$store.dispatch("updateuserinfo", []);
            this.$router.replace("/");
            //触发后禁止浏览器的后退键
            history.pushState(null, null, document.URL);
            window.addEventListener(
              "popstate",
              function (e) {
                history.pushState(null, null, document.URL);
              },
              false
            );
            });
            
          }).catch((err) => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
            //console.log(err)
          });

        
      }
    }
};

</script>
        

<style>

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 130px;
}
.el-row {
    margin-bottom: 0.5px;
    line-height:1px;
    
}
.el-divider--vertical{
height: 2em;
margin-left: 20px;
}
</style>