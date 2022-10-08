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
      <div style="font-size: 20px; margin-top: 10px; text-align: left;width:570px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        <span @click="textlink1()" style="cursor:pointer;">全国</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span @click="textlink2()" style="cursor:pointer;">{{
          this.$store.state.province
        }}</span>&nbsp;&nbsp;>&nbsp;&nbsp;<span style="cursor:pointer;">{{ this.$store.state.city }}</span>
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
            <span
              v-if="
                $store.state.province == '海南省' ||
                $store.state.province == '重庆市' ||
                $store.state.province == '上海市' ||
                $store.state.province == '北京市' ||
                $store.state.province == '天津市' ||
                $store.state.city == '中山市'
              "
            >
              涉及单位数量：{{ unit_num }}<br />
              涉及IP数量：{{ ip_num }}
            </span>
            <span v-else>
              涉及区县数量：{{ area_num }}<br />
              涉及单位数量：{{ unit_num }}<br />
              涉及IP数量：{{ ip_num }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import axios from "axios";
import { getNameCode } from "@/utils/map_utils";
import { getDate } from "@/api/get_currentTime.js";
export default {
  data() {
    return {
      loading: false,
      chartInstance: null,
      area_num: null,
      unit_num: null,
      ip_num: null,
      mapData: {},
      // nameTemp:this.$route.params.arg,
      nameTemp2: this.$route.params.arg2,
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
      query: this.$store.state.IPorUnit || "01",
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
      value1: "",
      currentTime:
        this.$store.state.currentTime ||
        getDate.getDateRange(new Date(), 1, true),
      // city_name:this.$route.params.city_name,
      // city_adcode:this.$route.params.city_adcode,
    };
  },
  created() {
    // this.$store.dispatch('updateprovince',this.$route.params.province_name)
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
    this.chooseName();
  },
  mounted() {
    // console.log(this.city_name)
    this.getData();
    // this.chooseMap()
    // this.initChart()
    // this.updateChart()
    window.addEventListener("resize", this.screenAdapter);
    // this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    textlink1(){
      if (
            this.$store.state.userLevel === 1||this.$store.state.userLevel === 5
          ) {
            this.$router.push({
              name: "countryPage",
            });
            this.$store.dispatch("updatecity", "");
            this.$store.dispatch("updateprovince", "");
          }else{
            return
          }
    },
    textlink2(){
      if (
            this.$store.state.userLevel === 2 ||
            this.$store.state.userLevel === 1 ||
            this.$store.state.userLevel === 5
          ) {
            this.$router.push({
              name: "provincePage",
            });
            this.$store.dispatch("updatecity", "");
          }else{
            return
          }
    },
    sendTime(v1) {
      v1 = this.currentTime;
      // this.$bus.$emit("time", v1);
      this.$store.dispatch("updatecurrenttime", v1);
    },
    async getData() {
      this.loading = true;
      if (this.query == "01") {
        if (
          this.$store.state.province == "北京市" ||
          this.$store.state.province == "上海市" ||
          this.$store.state.province == "重庆市" ||
          this.$store.state.province == "天津市"
        ) {
          axios({
            method:"post",
            url:"/map_ip_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
              data: [
                this.$store.state.province ||
                  this.$store.state.userinfo.province ||
                  "",
                this.$store.state.province ||
                  this.$store.state.userinfo.city ||
                  "",
                this.$store.state.userinfo.district || "",
                this.$store.state.userinfo.adcode || "",
              ],
            },
            headers:{
              'X-CSRFToken':this.$store.state.token
            }
          }).then((rep) => {
              this.$store.dispatch("updateprovincemapdata", rep.data);
              this.chooseMap();
              //   console.log({ "s_time":this.currentTime[0],"e_time":this.currentTime[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
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
        } else {
          axios({
            method:"post",
            url:"/map_ip_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
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
              this.$store.dispatch("updatecitymapdata", rep.data);
              this.chooseMap();
              //   console.log({ "s_time":this.currentTime[0],"e_time":this.currentTime[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
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
      }
      if (this.query == "02") {
        if (
          this.$store.state.province == "北京市" ||
          this.$store.state.province == "上海市" ||
          this.$store.state.province == "重庆市" ||
          this.$store.state.province == "天津市"
        ) {
          axios({
            method:"post",
            url:"/map_unit_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
              data: [
                this.$store.state.province ||
                  this.$store.state.userinfo.province ||
                  "",
                this.$store.state.province ||
                  this.$store.state.userinfo.city ||
                  "",
                this.$store.state.userinfo.district || "",
                this.$store.state.userinfo.adcode || "",
              ],
            },
            headers:{
              'X-CSRFToken':this.$store.state.token
            }
          }).then((rep) => {
              //   this.$store.state.cityMapData=rep.data
              //   console.log(this.$store.state.cityMapData)
              this.$store.dispatch("updateprovincemapdata", rep.data);
              this.chooseMap();
              //   console.log({ "s_time":this.currentTime[0],"e_time":this.currentTime[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
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
        } else {
          axios({
            method:"post",
            url:"/map_unit_data",
            data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
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
              //   this.$store.state.cityMapData=rep.data
              //   console.log(this.$store.state.cityMapData)
              this.$store.dispatch("updatecitymapdata", rep.data);
              this.chooseMap();
              //   console.log({ "s_time":this.currentTime[0],"e_time":this.currentTime[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
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
      }

      axios({
        method:"post",
        url:"/map_info",
        data:{
          s_time: this.currentTime[0],
          e_time: this.currentTime[1],
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
          //   console.log({ "s_time":this.currentTime[0],"e_time":this.currentTime[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||''] })
          this.$store.dispatch("updateareanum", rep.data[0].area_num);
          this.$store.dispatch("updateunitnum", rep.data[1].unit_num);
          this.$store.dispatch("updateipnum", rep.data[2].ip_num);
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
    screenAdapter() {
      if(this.computeMax()==0){
        this.chartInstance.resize()
        return
      }else{
        const visualSize = this.$refs.map_ref.offsetWidth /4.2
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
      this.chartInstance.resize();
      }
      
    },

    chooseName() {
      if (this.$route.params.city_name) {
        this.value1 = getNameCode(this.$route.params.city_name);
      } else if (this.$store.state.city) {
        this.value1 = getNameCode(this.$store.state.city);
      }

      // console.log(provinceInfo)}
    },
    async chooseMap() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref);
      if (!this.mapData[this.value1.key]) {
        
        const ret = await axios({
        method: 'GET',
        url: `../../map/省级/市级/${this.$store.state.city || this.$route.params.city_name}.json`
      });
        // const ret = await axios.get(`http://10.127.208.203:8080/map/省级/市级/${this.$store.state.city||this.$route.params.city_name}.json`)
        this.mapData[this.value1.key] = ret.data;
        this.$echarts.registerMap(this.value1.key, ret.data);
      }
      if (
        this.$store.state.province == "北京市" ||
        this.$store.state.province == "上海市" ||
        this.$store.state.province == "重庆市" ||
        this.$store.state.province == "天津市"
      ) {
        if (this.computeMax2() == 0) {
          const initOption = {
            geo: [
              {
                type: "map",
                map: this.value1.key,
                roam: false,
                zoom: 0.8,
              },
            ],

            series: [
              {
                data: this.$store.state.provinceMapData,
                geoIndex: 0, //将数据与第0个geo配置关联在一起
                type: "map",
              },
            ],
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
                map: this.value1.key,
                roam: false,
                zoom: 0.8,
              },
            ],
            visualMap: {
              min: 0,
              max: this.computeMax2(),
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
            series: [
              {
                data: this.$store.state.provinceMapData,
                geoIndex: 0, //将数据与第0个geo配置关联在一起
                type: "map",
              },
            ],
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
              },
            },
          };
          this.$nextTick(() => {
            this.chartInstance.setOption(initOption, true);
            this.loading = false;
          });
        }
      } else {
        if (this.computeMax() == 0) {
          const initOption = {
            geo: [
              {
                type: "map",
                map: this.value1.key,
                roam: false,
                zoom: 0.8,
              },
            ],

            series: [
              {
                data: this.$store.state.cityMapData,
                geoIndex: 0, //将数据与第0个geo配置关联在一起
                type: "map",
              },
            ],
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
                map: this.value1.key,
                roam: false,
                zoom: 0.8,
              },
            ],
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
            series: [
              {
                data: this.$store.state.cityMapData,
                geoIndex: 0, //将数据与第0个geo配置关联在一起
                type: "map",
              },
            ],
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
              },
            },
          };
          this.$nextTick(() => {
            this.chartInstance.setOption(initOption, true);
            this.loading = false;
          });
        }
      }

      this.chartInstance.on("click", (arg) => {
        
        // console.log(this.$store.state.province)
        if (
          this.$store.state.province == "海南省" ||
          this.$store.state.province == "重庆市" ||
          this.$store.state.province == "上海市" ||
          this.$store.state.province == "北京市" ||
          this.$store.state.province == "天津市" ||
          this.$store.state.city == "中山市"
        ) {
          return;
        }
        this.$store.dispatch("updatearea", arg.name); //把点击的市存入store
        this.$router.push({
          name: "areaPage",
          params: {
            arg: arg,
            // arg2:this.nameTemp.name,
            arg3: this.nameTemp2,
          },
        });
        // console.log(this.$store.state.province)
        // console.log(this.$store.state.city)
        // console.log(this.$store.state.area)
      }),
        this.chartInstance.getZr().on("click", (event) => {
          if (!event.target) {
            if (
              this.$store.state.userLevel === 5 ||
              this.$store.state.userLevel === 2 ||
              this.$store.state.userLevel === 1
            ) {
              this.$router.push({
                name: "provincePage",
              });
              this.$store.dispatch("updatecity", "");
              this.$store.dispatch("updatearea", "");
            }
          }
        });
    },
    computeMax() {
      let num_array = [];
      if (this.$store.state.cityMapData.length == 0) {
        return 0;
      }
      for (var i = 0; i < this.$store.state.cityMapData.length; i++) {
        num_array.push(this.$store.state.cityMapData[i].value);
      }
      return Math.max(...num_array);
    },
    //北京等直辖市计算tooltip最大值方法
    computeMax2(){
      for (var i=0;i<this.$store.state.provinceMapData.length;i++){
        if(this.$store.state.provinceMapData[i].name == this.$store.state.city){
          return this.$store.state.provinceMapData[i].value
        }
      }
      return 0
    },
    sendQuery(v1) {
      v1 = this.query;
      this.$store.dispatch("updateiporunit", v1);
    },
    async updateChart() {
      if (this.computeMax() == 0) {
        const dataOption = {
          geo: [
            {
              type: "map",
              map: this.value1.key,
              roam: false,
              zoom: 0.8,
            },
          ],
          series: {
            data: this.$store.state.cityMapData,
            //data:this.$store.state.cityMapData
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
              map: this.value1.key,
              roam: false,
              zoom: 0.8,
            },
          ],
          series: {
            data: this.$store.state.cityMapData,
            //data:this.$store.state.cityMapData
            geoIndex: 0,
            type: "map",
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
            },
          },
        };
        this.$nextTick(() => {
          this.chartInstance.setOption(dataOption, true);
          this.loading = false;
        });
      }
    },
    //北京、上海等几个特殊的更新图表函数
    async updateChart2() {
      if (this.computeMax2() == 0) {
        const dataOption = {
          geo: [
            {
              type: "map",
              map: this.value1.key,
              roam: false,
              zoom: 0.8,
            },
          ],
          series: {
            data: this.$store.state.provinceMapData,
            //data:this.$store.state.cityMapData
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
              map: this.value1.key,
              roam: false,
              zoom: 0.8,
            },
          ],
          series: {
            data: this.$store.state.provinceMapData,
            // data:this.$store.state.cityMapData,
            //data:this.$store.state.cityMapData
            geoIndex: 0,
            type: "map",
          },
          visualMap: {
            min: 0,
            max: this.computeMax2(),
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
            },
          },
        };
        this.$nextTick(() => {
          this.chartInstance.setOption(dataOption, true);
          this.loading = false;
        });
      }
    },
  },
  watch: {
    //时间发生变化
    currentTime: {
      handler(newValue) {
        this.loading = true;
        // console.log(newValue)
        // console.log("s_time:", newValue[0], "e_time:", newValue[1]);
        this.sendTime(newValue);
        //判断当前地图是IP数还是单位数
        if (this.query === "01") {
          if (
            this.$store.state.province == "北京市" ||
            this.$store.state.province == "上海市" ||
            this.$store.state.province == "重庆市" ||
            this.$store.state.province == "天津市"
          ) {
            axios({
              method:"post",
              url:"/map_ip_data",
              data:{
                s_time: newValue[0],
                e_time: newValue[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updateprovincemapdata", rep.data);
                this.updateChart2();
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          } else {
            axios({
              method:"post",
              url:"/map_ip_data",
              data:{
                s_time: newValue[0],
                e_time: newValue[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updatecitymapdata", rep.data);
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
        }
        if (this.query === "02") {
          if (
            this.$store.state.province == "北京市" ||
            this.$store.state.province == "上海市" ||
            this.$store.state.province == "重庆市" ||
            this.$store.state.province == "天津市"
          ) {
            axios({
              method:"post",
              url:"/map_unit_data",
              data:{
                s_time: newValue[0],
                e_time: newValue[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updateprovincemapdata", rep.data);
                this.updateChart2();
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          } else {
            axios({
              method:"post",
              url:"/map_unit_data",
              data:{
                s_time: newValue[0],
                e_time: newValue[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updatecitymapdata", rep.data);
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          // console.log({ "s_time":newValue[0],"e_time":newValue[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
        }
      },
    },
    query: {
      handler(newValue) {
        this.loading = true;
        this.sendQuery(newValue);
        // console.log("query改变了", newValue);
        if (newValue === "01") {
          if (
            this.$store.state.province == "北京市" ||
            this.$store.state.province == "上海市" ||
            this.$store.state.province == "重庆市" ||
            this.$store.state.province == "天津市"
          ) {
            axios({
              method:"post",
              url:"/map_ip_data",
              data:{
                s_time: this.currentTime[0],
                e_time: this.currentTime[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updateprovincemapdata", rep.data);
                this.updateChart2();
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          } else {
            axios({
              method:"post",
              url:"/map_ip_data",
              data:{
                s_time: this.currentTime[0],
                e_time: this.currentTime[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updatecitymapdata", rep.data);
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          // console.log({ "s_time":newValue[0],"e_time":newValue[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
        }
        if (newValue === "02") {
          if (
            this.$store.state.province == "北京市" ||
            this.$store.state.province == "上海市" ||
            this.$store.state.province == "重庆市" ||
            this.$store.state.province == "天津市"
          ) {
            axios({
              method:"post",
              url:"/map_unit_data",
              data:{
                s_time: this.currentTime[0],
                e_time: this.currentTime[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updateprovincemapdata", rep.data);
                this.updateChart2();
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          } else {
            axios({
              method:"post",
              url:"/map_unit_data",
              data:{
                s_time: this.currentTime[0],
                e_time: this.currentTime[1],
                data: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.userinfo.district || "",
                  this.$store.state.userinfo.adcode || "",
                ],
              },
              headers:{
                'X-CSRFToken':this.$store.state.token
              }
            }).then((rep) => {
                //   this.$store.state.cityMapData=rep.data
                this.$store.dispatch("updatecitymapdata", rep.data);
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
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
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
                // console.log(this.$store.state.cityMapData)
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
          // console.log({ "s_time":newValue[0],"e_time":newValue[1],data:[ this.$store.state.province||this.$store.state.userinfo.province||'', this.$store.state.city||this.$store.state.userinfo.city||'', this.$store.state.userinfo.district||'',this.$store.state.userinfo.adcode||'']})
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
</style>