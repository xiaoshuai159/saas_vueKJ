<template>
    <el-container style="border: 1px solid #eee">
    <el-header>
      <el-row>
        <el-col :span="23" style="margin-top: 30px;font-size: 23px; font-weight: bold">
          <!--   -->
          <!--  -->
          <div style="margin-top: -20px">
            <!-- <img :src="imgurl" alt="imgurl" title="首页" @click="logolink()" style="width:90px;height:40px;margin-left:1%;margin-top:1px;cursor:pointer;">  
                  <div style="margin-top:-20px; margin-left:10%; font-family:'Helvetica Neue'">网络安全事件态势感知</div>-->
            <img :src="imgurl" alt="imgurl" title="首页" style="
                width: 130px;
                height: 40px;
                /* margin-left: 1%; */
                margin-top: 1px;
                cursor: pointer;
              " @click="logolink()" />
            <div style="
                margin-top: -20px;
                margin-left: 140px;
                /* font-family: 'Helvetica Neue'; */
                
              ">
              网络安全事件态势感知
            </div>
          </div>
        </el-col>
        <el-col :span="1" style="margin-top: 20px">
          <div @click="tuichu">
            <img :src="imgurl2" title="退出" alt="imgurl2" style="
                width: 20px;
                height: 20px;
                margin-top: 1px;
                cursor: pointer;
              " />
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="background-color: white">
      <el-row>
        <el-col :span="24">
          <div>
            <country-map></country-map>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-header style="
            background-color: white;
            text-align: left;
            font-size: 20px;
            height: 52px;
            margin-top: -5px;
          ">全国网络安全事件概览</el-header>
        <div id="two">
          <el-col :span="12">
            <div class="grid-content bg-purple" id="left">
              <num></num>
            </div>
          </el-col>

          <el-col :span="12">
            <div id="right">
              <shejidanwei></shejidanwei>
            </div>
          </el-col>
        </div>
      </el-row>
      <div style="height: 18px"></div>
      <el-row>
        <el-col :span="24">
          <div>
            <xiangqing></xiangqing>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  
</template>

<script>
import axios from "axios";
import CountryMap from "./countryMap.vue";
import Num from "./num.vue";
import Shejidanwei from "./shejidanwei.vue";
import Xiangqing from "./xiangqing.vue";
export default {
  data() {
    return {
      // imgurl: require("@/assets/logo2.png"),
      imgurl: require("@/assets/zhongxinlogo3.png"),
      imgurl2: require("@/assets/exit2.png"),
    };
  },
  components: {
    CountryMap,
    Num,
    Shejidanwei,
    Xiangqing,
  },
  methods: {
    logolink() {
      if (this.$store.state.userLevel == 1||this.$store.state.userLevel == 5) {
        return;
      } else if (this.$store.state.userLevel == 2) {
        this.$router.push({
          name: "provincePage",
        });
        this.$store.dispatch("updatearea", "");
        this.$store.dispatch("updatecity", "");
        return;
      } else if (this.$store.state.userLevel == 3) {
        this.$router.push({
          name: "cityPage",
        });
        this.$store.dispatch("updatearea", "");
        return;
      } else if (this.$store.state.userLevel == 4) {
        this.$router.push({
          name: "areaPage",
        });
        return;
      }
    },
    tuichu() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var user_info = this.$store.state.userinfo;
          axios({
            method: "post",
            url: "/login_out",
            data: { user_info: user_info },
            headers: {
              'X-CSRFToken': this.$store.state.token
            }
          }).then(() => {
            this.$message({
              message: "退出成功！",
              type: "success",
            });
            // console.log(typeof(user_info)) //string
            // window.sessionStorage.removeItem("user_info")
            console.log("执行了then");
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
        })

        .catch(() => {
          // console.log(err)
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>
        

<style>
.el-container>.el-header {
  /* position: fixed;
  z-index: 100;
  width:100%; */
  text-align: left;
  font-size: 21px;
  background-color: rgb(195, 198, 211);
  color: #1a1a1a;
  letter-spacing: 3px;
}

.el-container>.el-main {
  background-color: white;
  /* color: #333; */
  color: rgb(195, 198, 211);
  text-align: center;
  line-height: 130px;
  padding: 20px 150px 0 150px;
}

.el-row {
  margin-bottom: 0.5px;
  line-height: 1px;
}

.el-divider--vertical {
  height: 2em;
  margin-left: 20px;
}
/* #building{
  background:url("../assets/beijing1.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
} */

</style>