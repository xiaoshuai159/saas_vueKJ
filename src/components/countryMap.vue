<template>
  <div style="background-color: white">
    <el-header
      style="
        background-color: white;
        height: 30px;
        margin-top: -20px;
        margin-bottom: 10px;
      "
    >
      <div style="font-size: 20px; margin-top: 10px; text-align: left;cursor:pointer;">
        全国
      </div>

      <div
        class="block"
        style="text-align: right; height: 30px; margin-top: -38px"
      >
        <el-date-picker
          v-model="currentTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          style="height: 40px"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </el-header>
    <el-divider></el-divider>
    <el-main style="background-color: white; height: 456px">
      <el-row style="height: 30px; text-align: left; margin-top: -15px">
        <el-col style="margin-left: 15%">
          <el-select v-model="query" class="sel" style="width: 140px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-loading="loading">
        <el-col :span="4">
          <div style="width: 100%">&nbsp;</div>
        </el-col>
        <el-col :span="13">
          <div class="content">
            <div ref="map_ref" style="height: 400px"></div>
          </div>
        </el-col>
        <el-col :span="4">
          <div style="text-align: left; line-height: 40px;width:200px;">
            涉及省份数量：{{ area_num }}<br />
            涉及单位数量：{{ unit_num }}<br />
            涉及IP数量：{{ ip_num }}
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
import { getDate } from "@/api/get_currentTime.js";
// import map from "../../public/map/中华人民共和国";
export default {
  data() {
    return {
      chartInstance: null,
      area_num: null,
      unit_num: null,
      ip_num: null,
      mapData: {},
      loading: false,
      options: [
        {
          value: "01",
          label: "涉及IP数量",
        },
        {
          value: "02",
          label: "涉及单位数量",
        },
      ],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //["2022-06-18","2022-07-18"]
      currentTime:
        this.$store.state.currentTime ||
        getDate.getDateRange(new Date(), 1, true),
      query: this.$store.state.IPorUnit || "01",
    };
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      sessionStorage.removeItem("store");
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    this.sendTime(this.currentTime);
    this.sendQuery(this.query);
  },
  mounted() {
    // console.log(this.currentTime)
    this.getData();

    // this.initChart();
    // this.updateChart();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async getData() {
      this.loading = true;
      if (this.query == "01") {
        axios({
          method:"post",
          url:"/map_ip_data",
          data:{
            s_time: this.currentTime[0],
            e_time: this.currentTime[1],
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
            // this.$store.state.countryMapData=rep.data
            this.$store.dispatch("updatecountrymapdata", rep.data);
            this.initChart();
            this.screenAdapter();
          }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
      }
      if (this.query == "02") {
        axios({
        method:"post",
        url:"/map_unit_data",
        data:{
            s_time: this.currentTime[0],
            e_time: this.currentTime[1],
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
            // this.$store.state.countryMapData=rep.data
            this.$store.dispatch("updatecountrymapdata", rep.data);
            this.initChart();
            this.screenAdapter();
          }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
      }
      axios({
        method:"post",
        url:"/map_info",
        data:{
          s_time: this.currentTime[0],
          e_time: this.currentTime[1],
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
          this.$store.dispatch(
            "updateprovince",
            this.$store.state.userinfo.province
          );
          this.$store.dispatch("updatecity", this.$store.state.userinfo.city);
          this.$store.dispatch(
            "updatearea",
            this.$store.state.userinfo.district
          );
          this.$store.dispatch(
            "updateadcode",
            this.$store.state.userinfo.adcode
          );
          // this.$store.dispatch('updateprovincenum',rep.data[0].area_num)
          // this.$store.dispatch('updateunitnum',rep.data[1].unit_num)
          // this.$store.dispatch('updateipnum',rep.data[2].ip_num)
          this.area_num = rep.data[0].area_num;
          this.unit_num = rep.data[1].unit_num;
          this.ip_num = rep.data[2].ip_num;
        }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref);
      const ret = await axios.get(`../../map/china.json`);
      // const ret = await axios.get(`http://10.127.208.203:8080/map/china.json`)
      // console.log(ret.data)
      this.$echarts.registerMap("china", ret.data);
      // console.log(this.computeMax())
      if (this.computeMax() == 0) {
        const initOption = {
          geo: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.2,
            },
          ],

          series: {
            data: this.$store.state.countryMapData,
            geoIndex: 0, //将数据与第0个geo配置关联在一起
            type: "map",
          },

          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            padding: 10,
            formatter: function (params) {
              if (params.data == undefined) {
                return `${params.name}</br>数量：0`;
              } else {
                return `${params.data.name}</br>数量：${params.data.value}`;
              }
              // if(params.data.name) { }
              // else { return }
            },
          },
        };
        this.$nextTick(() => {
          this.chartInstance.setOption(initOption, true);
          this.loading = false;
        });
      } else {
        const initOption = {
          geo: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.2,
            },
          ],

          series: {
            data: this.$store.state.countryMapData,
            geoIndex: 0, //将数据与第0个geo配置关联在一起
            type: "map",
          },

          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            padding: 10,
            formatter: function (params) {
              if (params.data == undefined) {
                return `${params.name}</br>数量：0`;
              } else {
                return `${params.data.name}</br>数量：${params.data.value}`;
              }
              // if(params.data.name) { }
              // else { return }
            },
          },
          visualMap: {
            min: 0,
            max: this.computeMax(),
            inRange: {
              color: ["white", "red"], //控制颜色渐变的范围
            },
            calculable: true, //出现滑块
            // demension: 2, //数据维度
            // seriesIndex: 0,
            left: "5%",
            itemHeight: this.$refs.map_ref.offsetWidth /4.2,
            itemWidth:this.$refs.map_ref.offsetWidth /4.2/6
          },
        };
        this.$nextTick(() => {
          this.chartInstance.setOption(initOption, true);
          this.loading = false;
        });
      }
      this.chartInstance.on("click", (arg) => {
        // console.log(arg.name)
        if (arg.name == "南海诸岛") {
          return;
        }
        this.$store.dispatch("updateprovince", arg.name); //把当前的省份存入store
        this.$router.push({
          name: "provincePage",
          params: {
            arg: arg,
          },
        });
      });
    },
    async updateChart() {
      // console.log("地图数据更新啦，新的数据为",this.$store.state.countryMapData)
      if (this.computeMax() == 0) {
        const dataOption = {
          geo: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.2,
            },
          ],
          series: {
            data: this.$store.state.countryMapData,
            geoIndex: 0,
            type: "map",
          },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            padding: 10,
            formatter: function (params) {
              if (params.data == undefined) {
                return `${params.name}</br>数量：0`;
              } else {
                return `${params.data.name}</br>数量：${params.data.value}`;
              }
              // if(params.data.name) { }
              // else { return }
            },
          },
        };

        this.$nextTick(() => {
          this.chartInstance.setOption(dataOption, true);
          this.loading = false;
        });
      } else {
        const dataOption = {
          geo: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.2,
            },
          ],
          series: {
            data: this.$store.state.countryMapData,
            geoIndex: 0,
            type: "map",
          },
          tooltip: {
            show: true,
            trigger: "item",
            triggerOn: "mousemove",
            padding: 10,
            formatter: function (params) {
              if (params.data == undefined) {
                return `${params.name}</br>数量：0`;
              } else {
                return `${params.data.name}</br>数量：${params.data.value}`;
              }
              // if(params.data.name) { }
              // else { return }
            },
          },
          visualMap: {
            min: 0,
            max: this.computeMax(),
            inRange: {
              color: ["white", "red"], //控制颜色渐变的范围
            },
            calculable: true, //出现滑块
            // demension: 2, //数据维度
            // seriesIndex: 0,
            left: "5%",
            itemHeight: this.$refs.map_ref.offsetWidth /4.2,
            itemWidth:this.$refs.map_ref.offsetWidth /4.2/6
          },
        };

        this.$nextTick(() => {
          this.chartInstance.setOption(dataOption, true);
          this.loading = false;
        });
      }
    },
    screenAdapter(){
      const visualSize = this.$refs.map_ref.offsetWidth /4.2
      if(this.computeMax()==0){
        this.chartInstance.resize()
        return
      }else{
        const adapterOption = {
        visualMap:{
            min: 0,
            max: this.computeMax(),
            inRange: {
              color: ["white", "red"], //控制颜色渐变的范围
            },
            calculable: true, //出现滑块
            // demension: 2, //数据维度
            // seriesIndex: 0,
            left: "5%",
            itemHeight: visualSize,
            itemWidth:visualSize/6
          },
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
      }
      
    },
    computeMax() {
      let num_array = [];
      if (this.$store.state.countryMapData.length == 0) {
        return 0;
      }
      for (var i = 0; i < this.$store.state.countryMapData.length; i++) {
        num_array.push(this.$store.state.countryMapData[i].value);
      }

      return Math.max(...num_array);
    },
    sendTime(v1) {
      v1 = this.currentTime;
      // this.$bus.$emit("time", v1);
      this.$store.dispatch("updatecurrenttime", v1);
    },
    sendQuery(v1) {
      v1 = this.query;
      this.$store.dispatch("updateiporunit", v1);
    },
  },
  watch: {
    //时间发生变化
    currentTime: {
      handler(newValue) {
        this.loading = true;
        // console.log("s_time:", newValue[0], "e_time:", newValue[1]);
        // console.log({"现在的时间为":newValue,data:[ this.$store.state.userinfo.province, this.$store.state.userinfo.city, this.$store.state.userinfo.district,this.$store.state.userinfo.adcode]})
        this.sendTime(newValue);
        //判断当前地图是IP数还是单位数
        if (this.query === "01") {
          axios({
            method:"post",
            url:"/map_ip_data",
            data:{
              s_time: newValue[0],
              e_time: newValue[1],
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
              // this.$store.state.countryMapData=rep.data
              this.$store.dispatch("updatecountrymapdata", rep.data);
              this.updateChart();
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
            axios({
              method:"post",
              url:"/map_info",
              data:{
              s_time: newValue[0],
              e_time: newValue[1],
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
              this.area_num = rep.data[0].area_num;
              this.unit_num = rep.data[1].unit_num;
              this.ip_num = rep.data[2].ip_num;
              // console.log(this.$store.state.countryMapData)
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
        }
        if (this.query === "02") {
          axios({
            method:"post",
            url:"/map_unit_data",
            data:{
              s_time: newValue[0],
              e_time: newValue[1],
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
              // this.$store.state.countryMapData=rep.data
              this.$store.dispatch("updatecountrymapdata", rep.data);
              this.updateChart();
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
            axios({
              method:"post",
              url:"/map_info",
              data:{
              s_time: newValue[0],
              e_time: newValue[1],
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
              this.area_num = rep.data[0].area_num;
              this.unit_num = rep.data[1].unit_num;
              this.ip_num = rep.data[2].ip_num;
              // console.log(this.$store.state.countryMapData)
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
        }
      },
    },
    query: {
      handler(newValue) {
        this.loading = true;
        this.sendQuery(newValue);
        if (newValue === "01") {
          axios({
            method:"post",
            url:"/map_ip_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
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
              // this.$store.state.countryMapData=rep.data
              this.$store.dispatch("updatecountrymapdata", rep.data);
              this.updateChart();
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
            axios({
              method:"post",
              url:"/map_info",
              data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
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
              this.area_num = rep.data[0].area_num;
              this.unit_num = rep.data[1].unit_num;
              this.ip_num = rep.data[2].ip_num;
              // console.log(this.$store.state.countryMapData)
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
        }
        if (newValue === "02") {
          axios({
            method:"post",
            url:"/map_unit_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
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
              this.$store.dispatch("updatecountrymapdata", rep.data);
              this.updateChart();
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
            axios({
              method:"post",
              url:"/map_info",
              data: {
                s_time: this.currentTime[0],
                e_time: this.currentTime[1],
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
              this.area_num = rep.data[0].area_num;
              this.unit_num = rep.data[1].unit_num;
              this.ip_num = rep.data[2].ip_num;
            }).catch(()=>{
          this.$message.error("用户信息异常，请重新登录")
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
        }
      },
    },
  },
};
</script>

<style>
.el-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 40px;
}
.el-main {
  background-color: white;

  text-align: center;
}
.el-divider--vertical {
  height: 10px;
  margin-left: 20px;
}

.sel {
  position: absolute;
  clip: rect(5px 130px 30px 10px);
  width: 120px;
  height: 24px;
  line-height: 24px;
  font-size: 15px;
}
</style>