<template>
  <div class="content" ref="num_ref">
    <el-card shadow="hover" style="border-radius: 15px">
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
        事件数量排名
      </el-header>
      <el-main style="background-color: white">
        <el-table
          ref="tableClass"
          v-loading="loading"
          stripe
          border
          :data="tableData"
          style="width: 100%; margin-top: 20px; margin-bottom: -15px"
          class="tableClass"
          :default-sort="{ prop: 'num', order: 'descending' }"
        >
          <!-- :row-style="{height: '0px'}"
            :header-cell-style="{fontSize:'14px'}"
            :cell-style="{padding: '7px'}" -->
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
          <el-table-column prop="num" label="事件数量"> </el-table-column>
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
      loading: false,
      tableData: [],
      currentTime: this.$store.state.currentTime,
      unit_length: "",
    };
  },

  methods: {
    changeTime(data1) {
      this.loading = true;
      //console.log("事件数量排名执行了")
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
          this.unit_length = rep.data.length;
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
              if (rep.data.length < this.unit_length) {
                for (
                  var i = 0;
                  i < this.unit_length + 1 - rep.data.length;
                  i++
                ) {
                  rep.data.push({ index: "", num: "", province: "" });
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

  mounted() {
    // this.f1()
    // this.$store.dispatch('updatecompareip')
    // console.log(this.currentTime)

    this.$nextTick(() => {
      this.changeTime(this.currentTime);
    }); //用nextTick在内网再试试
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style>
.el-table__header {
  padding: 0;
  line-height: 16px;
}
.el-table .el-table__cell {
  padding: 11px 0;
}
.tableClass .cell {
  height: 14px;
  line-height: 14px !important;
}
</style>