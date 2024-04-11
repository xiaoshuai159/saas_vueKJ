<template>
  <div class="content" ref="num_ref">
    <el-card shadow="never" style="border-radius: 0px" >
      <el-header
        style="
          text-align: left;
          background-color: white;
          height: 15px;
          margin-bottom: -11px;
          font-size: 16px;
          margin-top: -15px;
        "
      >
        单位数量排名
      </el-header>
      <el-main style="background-color: white">
        <!-- :header-cell-style="{background:'#eef1f6',color:'#606266'}" -->
        <el-table
          stripe
          border
          ref="tableClass"
          v-loading="loading"
          class="tableClass"
          :data="tableData"
          style="width: 100%; margin-top: 20px; margin-bottom: -15px"
          id="tableClass"
          :default-sort="{ prop: 'num', order: 'descending' }"
        >
          <!-- max-height="250" -->
          <el-table-column type="index" label="排名" width="85">
            <template slot-scope="scope">
              <!-- :index="indexMethod" -->
              <div v-if="scope.row.province">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="province" label="省份" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="num" label="单位数量"> </el-table-column>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
// import {compareNum} from '@/api/compareNum.js'
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      currentTime: this.$store.state.currentTime,
      event_length: "",
    };
  },
  methods: {
    changeTime(data1) {
      this.loading = true;
      //console.log("涉及单位执行了")
      axios({
        method:"post",
        url:"/simple_event_data",
        data:{
          s_time: data1[0],
          e_time: data1[1],
          data: [
            this.$store.state.userinfo.province || "",
            this.$store.state.userinfo.city || "",
            this.$store.state.userinfo.district || "",
            this.$store.state.userinfo.adcode || "",
          ],
        },
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      }).then((rep) => {
          this.event_length = rep.data.length;
          axios({
            method:"post",
            url:"/simple_unit_data",
            data:{
              s_time: data1[0],
              e_time: data1[1],
              data: [
                this.$store.state.userinfo.province || "",
                this.$store.state.userinfo.city || "",
                this.$store.state.userinfo.district || "",
                this.$store.state.userinfo.adcode || "",
              ],
            },
            headers:{
              'X-CSRFToken':this.$store.state.token
            }
          }).then((rep) => {
              if (rep.data.length < this.event_length) {
                for (
                  var i = 0;
                  i < this.event_length + 1 - rep.data.length;
                  i++
                ) {
                  rep.data.push({ num: "", province: "" });
                }
              }
              this.tableData = rep.data;
              this.loading = false;
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
        });
    },
  },
  // beforeMount(){
  //   // this.changeTime(this.currentTime)
  //
  // },

  mounted() {
    // console.log(this.currentTime)
    // this.$store.dispatch('updatecomparearea')
    this.$nextTick(() => {
      this.changeTime(this.currentTime);
    });
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        // console.log(newValue)
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style>
</style>