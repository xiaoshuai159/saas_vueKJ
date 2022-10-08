<template>
  <el-container style=" border: 1px solid #eee">
    <el-header>
      <el-row>
        <el-col :span="23" style="margin-top:29px; font-size:23px; font-weight:bold;">

          <div style="margin-top:-20px">
            <!-- <img :src="imgurl" alt="imgurl" title="首页" @click="logolink()" style="width:90px;height:40px;margin-left:1%;cursor:pointer;margin-top:1px"> <div style="margin-top:-20px; margin-left:10%; font-family:'Helvetica Neue'">网络安全事件态势感知</div> -->
            <img :src="imgurl" alt="imgurl" title="首页" @click="logolink()"
              style="width: 130px;height:40px;margin-top:1px;cursor:pointer;">
            <div style="margin-top:-20px; margin-left: 140px; font-family:'Helvetica Neue'">网络安全事件态势感知</div>
          </div>
        </el-col>
        <el-col :span="1" style="margin-top:20px;">
          <div @click="tuichu">
            <img :src="imgurl2" title="退出" alt="imgurl2" style="width:20px;height:20px;margin-top:1px;cursor:pointer;">
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="background-color: white; ">
      <el-row>
        <el-col :span="24">
          <div>
            <provinceMap></provinceMap>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-header style="background-color: white; text-align: left; font-size: 20px;  height:52px; margin-top:-5px;">
          {{$store.state.province}}网络安全事件概览</el-header>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span
              v-if="$store.state.province =='海南省'||$store.state.province =='重庆市'||$store.state.province =='上海市'||$store.state.province =='北京市'||$store.state.province =='天津市'||$store.state.city =='中山市'">
              <num3></num3>
            </span>
            <span v-else>
              <num2></num2>
            </span>

          </div>
        </el-col>

        <el-col :span="12">
          <div>
            <span
              v-if="$store.state.province =='海南省'||$store.state.province =='重庆市'||$store.state.province =='上海市'||$store.state.province =='北京市'||$store.state.province =='天津市'||$store.state.city =='中山市'">
              <shejidanwei3></shejidanwei3>
            </span>
            <span v-else>
              <shejidanwei2></shejidanwei2>
            </span>
          </div>
        </el-col>
      </el-row>
      <div style="height:18px;"></div>
      <el-row>
        <el-col :span="24">
          <div>
            <span
              v-if="$store.state.province =='海南省'||$store.state.province =='重庆市'||$store.state.province =='上海市'||$store.state.province =='北京市'||$store.state.province =='天津市'||$store.state.city =='中山市'">
              <xiangqing3></xiangqing3>
            </span>
            <span v-else>
              <xiangqing2></xiangqing2>
            </span>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
import provinceMap from './provinceMap.vue';
import Num2 from './num2.vue';
import Num3 from './num3.vue';
import Shejidanwei2 from './shejidanwei2.vue';
import Shejidanwei3 from './shejidanwei3.vue';
import Xiangqing2 from './xiangqing2.vue';
import Xiangqing3 from './xiangqing3.vue';
import axios from 'axios'
export default {
  data() {
    return {
      imgurl: require("@/assets/zhongxinlogo3.png"),
      // imgurl:require("@/assets/changanlogo4.png"),
      imgurl2: require("@/assets/exit2.png")
    }
  },
  components: {
    provinceMap,
    Num2,
    Shejidanwei2,
    Shejidanwei3,
    Xiangqing2,
    Xiangqing3,
    Num3
  },
  methods: {
    logolink() {
      if (
        this.$store.state.userLevel == 1||this.$store.state.userLevel == 5
      ) {
        this.$router.push({
          name: "countryPage",
        });
        this.$store.dispatch("updatearea", "");
        this.$store.dispatch("updatecity", "");
        this.$store.dispatch("updateprovince", "");
        return;
      } else if (
        this.$store.state.userLevel == 2
      ) {

        return;
      } else if (
        this.$store.state.userLevel == 3
      ) {
        this.$router.push({
          name: "cityPage",
        });
        this.$store.dispatch("updatearea", "");
        return;
      } else if (
        this.$store.state.userLevel == 4
      ) {
        this.$router.push({
          name: "areaPage",
        });
        return;
      }
    },
    tuichu() {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var user_info = this.$store.state.userinfo
        // console.log(typeof(JSON.parse(user_info)))
        axios({
          method: "post",
          url: "/login_out",
          data: { user_info: user_info },
          headers: {
            'X-CSRFToken': this.$store.state.token
          }
        }).then(() => {
          this.$message({
            message: '退出成功！',
            type: 'success'
          });
          //console.log(typeof(user_info)) //string
          // window.sessionStorage.removeItem("user_info")
          window.sessionStorage.clear()
          this.$store.dispatch('updateuserinfo', []);
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

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
        //console.log(err)
      });


    }
  },

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
  line-height: 1px;

}

.el-divider--vertical {
  height: 2em;
  margin-left: 20px;
}
</style>