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
        <el-table
          stripe
          border
          v-loading="loading"
          :data="tableData"
          style="width: 100%; margin-top: 20px; margin-bottom: -15px"
          class="tableClass"
          :default-sort="{ prop: 'num', order: 'descending' }"
        >
          <el-table-column
            type="index"
            label="排名"
            width="85"
            
          >
           <template slot-scope="scope">
                          <!-- :index="indexMethod" -->
                      <div v-if="scope.row.province">
                            {{scope.$index+1}}
                      </div>
                    </template>
          </el-table-column>
          <el-table-column prop="province" label="区县" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="num" label="单位数量"> </el-table-column>
        </el-table>
      </el-main>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { compareNum } from "@/api/compareNum.js";
export default {
  data() {
    return {
      tableData: [],
      event_length:'',
      loading: false,
      currentTime: this.$store.state.currentTime,
    };
  },
  methods: {
    
    changeTime(data1) {
      this.loading = true;
      if (
        this.$store.state.province == "海南省" ||
        this.$store.state.city == "中山市"
      ) {
        axios({
          method:"post",
          url:"/simple_event_data",
          data:{
            s_time: data1[0],
            e_time: data1[1],
            data: [
              this.$store.state.province ||
                this.$store.state.userinfo.province ||
                "",
              this.$store.state.city || this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
          },
          headers:{
            'X-CSRFToken':this.$store.state.token
          }
        }).then(rep=>{
            this.event_length = rep.data.length
            axios({
              method:"post",
              url:"/simple_unit_data",
              data:{
                s_time: data1[0],
                e_time: data1[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city || this.$store.state.userinfo.city || "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            })
          .then((rep) => {
            if(rep.data.length<this.event_length){
                for(var i=0;i<this.event_length+1-rep.data.length;i++){

                  rep.data.push({'num':"",'province':""})
                }
              }
            this.tableData=rep.data
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
          })
        
      } else if (
        this.$store.state.province == "重庆市" ||
        this.$store.state.province == "上海市" ||
        this.$store.state.province == "北京市" ||
        this.$store.state.province == "天津市"
      ) {
        axios({
        method:"post",
        url:"/simple_event_data",
        data:{
            s_time: data1[0],
            e_time: data1[1],
            data: [
              this.$store.state.province ||
                this.$store.state.userinfo.province ||
                "",
              this.$store.state.province || this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
          },
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      }).then(rep=>{
            this.event_length = rep.data.length
            axios({
              method:"post",
              url:"/simple_unit_data",
              data:{
                s_time: data1[0],
                e_time: data1[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province || this.$store.state.userinfo.city || "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
            if(rep.data.length<this.event_length){
                for(var i=0;i<this.event_length+1-rep.data.length;i++){

                  rep.data.push({'num':"",'province':""})
                }
              }
            this.tableData=rep.data
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
          })
        
      } else {
        axios({
          method:"post",
          url:"/simple_event_data",
          data:{
            s_time: data1[0],
            e_time: data1[1],
            data: [
              this.$store.state.province ||
                this.$store.state.userinfo.province ||
                "",
              this.$store.state.city || this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
          },
          headers:{
            'X-CSRFToken':this.$store.state.token
          }
        }).then(rep=>{
            this.event_length = rep.data.length
            axios({
              method:"post",
              url:"/simple_unit_data",
              data:{
                s_time: data1[0],
                e_time: data1[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city || this.$store.state.userinfo.city || "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
            if(rep.data.length<this.event_length){
                for(var i=0;i<this.event_length+1-rep.data.length;i++){

                  rep.data.push({'num':"",'province':""})
                }
              }
            this.tableData=rep.data
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
          })
        
      }
    },
  },

  mounted() {
    // this.$store.dispatch("updatecomparearea");
    this.$nextTick(() => {
      this.changeTime(this.currentTime);
    });
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        //console.log(newValue);
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style>
</style>