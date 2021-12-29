<template>
  <div
    class="right_main_under"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="Maptop">
      <div>
        <el-form size="mini" label-width="80px">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find1"
              type="daterange"
              :change="dataCreate_change1(newdomainSimpleVo.dateValue_find1)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>

            <el-button
              type="primary"
              size="mini"
              style="margin-left: 30px"
              @click="xuanze"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 30px"
              @click="chongzhi"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="title">
        <div> 成都历史访问分析</div>
      </div> -->
    </div>
    <div class="Mapcenter">
      <!-- //左侧条形 -->
      <div class="leftmap">
        <div class="leftmapson">
          <div id="bar_qx" ref="chart" style="width: 100%; height: 100%"></div>
        </div>
      </div>
      <!-- //中间地图 -->
      <div class="centermap">
        <div class="Mapcenter1">
          <el-button
            type="primary"
            size="mini"
            v-if="oldmaploading"
            @click="fanhui"
            class="btn"
            ><span class="el-icon-back"></span>返回上一级</el-button
          >
          <div
            id="myEcharts"
            ref="chartmap"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
      <!-- //右侧条形 -->
      <div class="rightmap">
        <div class="leftmapson1">
          <div
            id="bar_qx1"
            ref="chart1"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
    </div>
    <div class="Mapbtom">
      <div class="leftmapson2">
        <div id="bar_qx2" ref="chart2" style="width: 100%; height: 100%"></div>
      </div>
    </div>

    <el-dialog
      :title="'访问详情——' + this.mapName1"
      :visible.sync="dialogTableVisible"
      class="dialogInfo"
      width="75%"
      style="color: #fff"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-table
        :data="gridData"
        class="tableStyle"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading1"
        :row-style="{ height: 0 }"
        :cell-style="{ padding: 0 }"
      >
        <el-table-column prop="discoverTime" label="访问时间"></el-table-column>
        <el-table-column label="源IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.sourceIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="sourcePort" label="源端口"></el-table-column>
        <el-table-column prop="sourceAddress" label="归属地"></el-table-column>
        <el-table-column label="目标IP">
          <template slot-scope="scope">
            {{ zhuanip(scope.row.targetIp) }}
          </template>
        </el-table-column>
        <el-table-column prop="targetPort" label="目标端口"></el-table-column>
      </el-table>
      <!-- //分页 -->
      <div class="bottom1">
        <div class="ss1">
          <!-- @size-change="handleSizeChange1" -->
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page.sync="mypageable1.pageNum1"
            :page-size="mypageable1.pageSize1"
            layout="total, prev, pager, next"
            :total="total1"
            class="pagePagination"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script >
import chengdou from "../static/jsonmap/chengdou";
import chenghua from "../static/jsonmap/chenghua";
import chongzhou from "../static/jsonmap/chongzhou";
import dayi from "../static/jsonmap/dayi";
import doujiangyan from "../static/jsonmap/doujiangyan";
import jianyang from "../static/jsonmap/jianyang";
import jinjiang from "../static/jsonmap/jinjiang";
import jinniu from "../static/jsonmap/jinniu";
import jintang from "../static/jsonmap/jintang";
import longquanyi from "../static/jsonmap/longquanyi";
import pengzhou from "../static/jsonmap/pengzhou";
import pidou from "../static/jsonmap/pidou";
import pujiang from "../static/jsonmap/pujiang";
import qingbaijiang from "../static/jsonmap/qingbaijiang";
import qingyang from "../static/jsonmap/qingyang";
import qionglai from "../static/jsonmap/qionglai";
import shuangliu from "../static/jsonmap/shuangliu";
import wenjiang from "../static/jsonmap/wenjiang";
import wuhou from "../static/jsonmap/wuhou";
import xindou from "../static/jsonmap/xindou";
import xinjin from "../static/jsonmap/xinjin";
// import cutstr from "@/utils/jiequ.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      mapName1: "",
      totalPages1: "",
      gridData: [],
      mypageable1: {
        pageNum1: 1,
        pageSize1: 10,
      },
      total1: 1,
      dialogTableVisible: false,
      loading: false,
      loading1: false,
      oldmaploading: false,
      cityName: "成都市",
      jxmap: {
        成都市: chengdou,
        锦江区: jinjiang,
        青羊区: qingyang,
        金牛区: jinniu,
        武侯区: wuhou,
        成华区: chenghua,
        龙泉驿区: longquanyi,
        青白江区: qingbaijiang,
        新都区: xindou,
        温江区: wenjiang,
        双流区: shuangliu,
        郫都区: pidou,
        金堂县: jintang,
        大邑县: dayi,
        蒲江县: pujiang,
        新津区: xinjin,
        都江堰市: doujiangyan,
        彭州市: pengzhou,
        邛崃市: qionglai,
        崇州市: chongzhou,
        简阳市: jianyang,
      },
      newdomainSimpleVo: {
        dateValue_find1: "",
      },
      whiteSearchList1: {
        startCreateTime1: dayjs()
          .subtract(1, "month")
          .format("YYYY-MM-DD HH:mm:ss"),
        endCreateTime1: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      leftarrX: [],
      leftarrY: [],
      //左侧柱状
      visits: [],
      sourceip: [],
      //右侧柱状
      url: [],
      urlvisits: [],
      //下折线
      disDate: [],
      disvisits: [],
      mapName: "",
      dataDi: [],
      max: 0,
      min: 0,
      xinarr: [],
    };
  },
  mounted() {},
  created() {
    this.leftip();
    // this.mapquan();
    // this.limap();
  },
  methods: {
    //初始化数据
    // 左侧柱状
    async leftip() {
      // this.loading=true
      this.righturl();
      const discoverCountVo = {
        address: "",
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/countIpByDate",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let visitsleft = [];
          let sourceipleft = [];
          res.data.forEach((item) => {
            visitsleft.push(item.visits);
            sourceipleft.push(this.zhuanip(item.source_ip));
            // console.log(sourceipleft);
          });
          this.visits = visitsleft;
          this.sourceip = sourceipleft;
          setTimeout(() => {
            this.drawLine();
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("源IP访问无数据");
          }, 500);
        }
      }
    },
    // 右侧柱状
    async righturl() {
      this.bottomline();
      let discoverCountVo = {
        address: "",
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/countUrlByDate",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let urlright = [];
          let urlvisitsright = [];
          res.data.forEach((item) => {
            urlvisitsright.push(item.urlvisits);
            urlright.push(item.url);
          });
          this.urlvisits = urlvisitsright;
          this.url = urlright;
             // this.urlvisits = urlvisitsright.reverse();
          // this.url = urlright.reverse();
          setTimeout(() => {
            this.drawLine1();
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("域名访问无数据");
          }, 500);
        }
      }
    },
    // 下折线
    async bottomline() {
      this.mapquan();
      let discoverCountVo = {
        address: "",
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/sumVisitsByDate",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let disDatebottom = [];
          let disvisitsbottom = [];
          res.data.forEach((item) => {
            disDatebottom.push(item.disDate);
            disvisitsbottom.push(item.disvisits);
          });
          this.disDate = disDatebottom;
          this.disvisits = disvisitsbottom;
          setTimeout(() => {
            this.drawLine2();
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("成都市访问量无数据");
          }, 500);
        }
      }
    },
    //转ip
    zhuanip(num) {
      var str;
      var tt = new Array();
      tt[0] = (num >>> 24) >>> 0;
      tt[1] = ((num << 8) >>> 24) >>> 0;
      tt[2] = (num << 16) >>> 24;
      tt[3] = (num << 24) >>> 24;
      str =
        String(tt[0]) +
        "." +
        String(tt[1]) +
        "." +
        String(tt[2]) +
        "." +
        String(tt[3]);
      return str;
    },
    //选中地区
    //左柱状——————————————————
    async ipxuan() {
      this.urlxuan();
      this.loading = true;
      this.visits = [];
      this.sourceip = [];
      let discoverCountVo = {
        address: "中国四川省成都市" + this.mapName,
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/countIpByAddress",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let visitsleft1 = [];
          let sourceipleft1 = [];
          res.data.forEach((item) => {
            visitsleft1.push(item.visits);
            sourceipleft1.push(this.zhuanip(item.source_ip));
            // console.log(sourceipleft);
          });
          this.visits = visitsleft1;
          this.sourceip = sourceipleft1;
          setTimeout(() => {
            this.drawLine();
            // this.loading = false;
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("源IP访问无数据");
          }, 500);
        }
      }
    },
    async urlxuan() {
      this.urlvisits = [];
      this.url = [];
      this.zhexuan();

      let discoverCountVo = {
        address: "中国四川省成都市" + this.mapName,
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/countUrlByAddress",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let urlright1 = [];
          let urlvisitsright1 = [];
          res.data.forEach((item) => {
            urlvisitsright1.push(item.urlvisits);

            urlright1.push(item.url);
          });
          this.urlvisits = urlvisitsright1;
          this.url = urlright1;
          this.loading = false;
          setTimeout(() => {
            this.drawLine1();
            // this.loading = false;
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("域名访问无数据");
          }, 500);
        }
      }
    },
    async zhexuan() {
      this.disDate = [];
      this.disvisits = [];

      let discoverCountVo = {
        address: "中国四川省成都市" + this.mapName,
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/sumVisitsByAddress",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          let disDatebottom1 = [];
          let disvisitsbottom1 = [];
          res.data.forEach((item) => {
            disDatebottom1.push(item.disDate);
            disvisitsbottom1.push(item.disvisits);
          });
          this.disDate = disDatebottom1;
          this.disvisits = disvisitsbottom1;
          this.loading = false;
          setTimeout(() => {
            this.drawLine2();
            // this.loading = false;
          }, 500);
        } else {
          setTimeout(() => {
            this.$message("成都市访问量无数据");
          }, 500);
        }
      }
    },
    //统计全部地区地图显示
    async mapquan() {
      let discoverCountVo = {
        address: "",
        endTime: this.whiteSearchList1.endCreateTime1,
        startTime: this.whiteSearchList1.startCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/discover/countAddressByDate",
        discoverCountVo
      );
      if (res.code == 200) {
        if (res.data.length > 0) {
          var newarr = res.data.map((item) => {
            return {
              name: item.address,
              value: item.visits,
            };
          });

          newarr.forEach((element) => {
            element.name = (element.name || "").split("成都市")[1];
          });
          this.xinarr = newarr;
          let max = newarr.sort((a, b) => {
            return b.value - a.value;
          });
          this.max = max[0] ? max[0]["value"] : 0;
          // console.log(this.max);
          this.dataDi = newarr;

          setTimeout(() => {
            this.mineMap();
          }, 500);
        } else {
          this.$message("地图访问量无数据");
        }
        // console.log(res.data);
      }
    },
    // 里面地图
    //  async limap(){
    //      let discoverCountVo = {
    //         address: "中国四川省成都市" + this.mapName,
    //         endTime: this.whiteSearchList1.endCreateTime1,
    //         startTime: this.whiteSearchList1.startCreateTime1,
    //       };
    //     const{data:res}=await this.$http.post('/discover/countAddressByAddress',discoverCountVo)
    //     if(res.code==200){
    //       console.log(res.data);
    //     }
    //   },
    //左侧柱状
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart;
      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption());
    },
    //左侧柱状
    setOption() {
      let option = {
        title: {
          text: "源IP访问次数排名",
          padding: [20, 20, 100, 100],
          textStyle: {
            //xin
            fontSize: 18,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          //不显示网格线
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: this.sourceip,
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "源IP",
            type: "bar",
            barWidth: 20,
            color: "#03A9F4",
            data: this.visits,
          },
        ],
      };
      return option;
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++
    //右侧柱状

    drawLine1() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart1;
      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption1());
    },

    setOption1() {
      let option = {
        title: {
          text: "域名访问次数排名",
          padding: [20, 20, 100, 100],
          textStyle: {
            //xin
            fontSize: 18,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "1%",
          right: "10%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          //不显示网格线
          splitLine: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },

        yAxis: {
          type: "category",
          data: this.url,
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              // 10 6 这些你自定义就行
              // console.log(value);
              var v = value.substring(0, 14) + "...";
              // console.log(v);
              return value.length > 14 ? v : value;
            },
          },
        },
        series: [
          {
            name: "次数",
            type: "bar",
            barWidth: 20,
            color: "#03A9F4",
            data: this.urlvisits,
          },
        ],
      };
      return option;
    },
    // ？？？？？？？？？？？？？？？？？？？？？？？？
    //下折线

    drawLine2() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart2;
      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption2());
      this.loading = false;
    },
    setOption2() {
      let option = {
        title: {
          text: "成都市访问量历史变化趋势",

          textStyle: {
            //xin
            fontSize: 18,
            color: "#fff", //xin
          },
          x: "left",
          y: "top",
        },
        tooltip: {
          trigger: "axis",
        },

        xAxis: {
          type: "category",
          data: this.disDate,
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "3%",
          bottom: "25%",
        },
        series: [
          {
            smooth: true,
            name: "次数",
            data: this.disvisits,
            type: "line",
            color: "#03A9F4",
          },
        ],
      };
      return option;
    },
    // ————————————————————————————————————————————————————————
    //中间地图
    mineMap() {
      var self = this;
      var mapChart = this.$echarts.init(document.getElementById("myEcharts"));
      // let dataDi = [
      // { name: "锦江区", value: 15 },
      // { name: "青羊区", value: 1000 },
      // { name: "金牛区", value: 20000 },
      // { name: "武侯区", value: 43562 },
      // { name: "成华区", value: 15896 },
      // { name: "龙泉驿区", value: 9756 },
      // { name: "青白江区", value: 1356 },
      // { name: "新都区", value: 25863 },
      // { name: "温江区", value: 1235 },
      // { name: "双流区", value: 5643 },
      // { name: "郫都区", value: 25863 },
      // { name: "金堂县", value: 1235 },
      // { name: "大邑县", value: 15 },
      // { name: "蒲江县", value: 1000 },
      // { name: "新津区", value: 20000 },
      // { name: "都江堰市", value: 43562 },
      // { name: "彭州市", value: 15896 },
      // { name: "邛崃市", value: 9756 },
      // { name: "崇州市", value: 1356 },
      // { name: "简阳市", value: 25863 },
      // ];
      let mapName = this.jxmap[this.cityName] + "";

      this.$echarts.registerMap(mapName, this.jxmap[this.cityName]);

      var mapOption = {
        geo: [
          {
            show: true,
            zoom: 0.8,
            map: mapName,
            // center:  [104.08, 30.69],
            silent: true,
            aspectScale: 0.75, //长宽比,默认0.75
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "rgba(0,0,0,0)",
                borderColor: "rgba(80,210,252,0.5)",
                // areaColor: 'yellow',
                borderWidth: 3, //设置外层边框
                // borderColor: '#fff',
                // shadowColor: "red", //#A0A2A5 外边框阴影色
                // shadowBlur: 10, //外边框阴影
                opacity: 1,
              },
            },
          //  layoutCenter:["54.50%", "51%"],  //左下
               layoutCenter:["55.50%", "51%"],  //右下
            layoutSize: "100%",
          },
          {
            show: true,
            zoom: 0.8,
            map: mapName,
            // center: [104.08, 30.71] ,
            silent: true,
            aspectScale: 0.75, //长宽比,默认0.75
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "rgba(0,0,0,0)",
                borderColor: "rgba(80,210,252,0.5)",
                // areaColor: 'yellow',
                borderWidth: 3, //设置外层边框
                // borderColor: '#fff',
                // shadowColor: "red", //#A0A2A5 外边框阴影色
                // shadowBlur: 10, //外边框阴影
                opacity: 1,
              },
            },
                // layoutCenter:["54%", "52%"],  //左下
                    layoutCenter:["56%", "52%"],  //右下
                 layoutSize: "100%",
          },
  
        ],

     
        tooltip: {
          trigger: "item",
          backgroundColor: "#fff",
          borderWidth: 1,
          // borderColor:",
          formatter: (params) => {
            return `
            <section style='width:100px;height:45px;color:#333333';>
              <div style='color:#333333;font-size: 12px;'>
                ${params.name}
              </div>
                 <div>
               <span style="font-size: 12px;color:#808080">${
                 params.seriesName
               }:</span>
                <span style="font-size: 16px;color: #4298F3;">${
                  isNaN(params.value) == true ? "0" : params.value
                }</span>
             </div>

            </section>`;
          },
        },
        //距离左右，上下距离的百分比

        visualMap: {
          padding: [0, 0, 0, 30],
          textStyle: {
            color: "white",
          },
          min: this.min,
          max: this.max,
          text: ["最高值", "最低值"],

          realtime: false,
          calculable: true,
          inRange: {
            color: ["#2B91B7", "#5DBADE", "#D84B61"],
          },
        },

        series: [
          {
            name: "访问量",
            type: "map",
            // map: this.mapData1,
            map: mapName,
            // center: [104.080989, 30.657689],
                  // center: [104.103077,30.660275],
            componentType: "geo",
            symbolOffset: [0, "-50%"],
            roam: false,
            layoutSize: "100%", //大小
             layoutCenter: ["55%", "50%"],
            aspectScale: 0.75,
            zoom: 0.8,
            itemStyle: {
              normal: {
                borderColor: "#64E0FC",
                borderWidth: 3,
                areaColor: "#2B91B7",
                label: {
                  show: true,
                  color: "#fff",
                  formatter: function (data) {
                    var a = data.name;
                    // var b = data.value;
                    // return a + "\n" + b;
                    return a;
                  },
                },
              },
              emphasis: {
                areaColor: "#00669C",
                label: {
                  show: true,
                  color: "#fff",
                  formatter: function (data) {
                    var a = data.name;
                    // var b = data.value;
                    // return a + "\n" + b;
                    return a;
                  },
                },
              },
            },

            data: this.dataDi,
          },
        ],
      };
      this.loading = false;
      mapChart.setOption(mapOption);

      window.addEventListener("resize", function () {
        mapChart.resize();
      });
      mapChart.off("click");
      mapChart.on("click", function (params) {
        // console.log(params.name);
        let name = params.name;
        self.handlerChange(name);
      });

      //去除默认的鼠标事件
      document.oncontextmenu = function () {
        return false;
      };
      //新加上鼠标右击事件

      mapChart.on("contextmenu", function (params) {
        // console.log("我是右键");
        let name = params.name;
        self.one(name);
      });
    },
    handlerChange(name) {
      this.cityName = name;
      // console.log( this.cityName);
      this.mineMap();
      this.oldmaploading = true;
      this.mapName = name;
      // myChart.setOption(option);

      this.ipxuan();
    },
    one(name) {
      this.mapName1 = name;
      this.fangwenl();
    },
    //-=-==--=-=-=--=-=--=-=--=-=-==---=-=-=-=--=-=-=-=-=-=-=-=-=-=
    handleClose(done) {
      this.mypageable1.pageNum1 = 1;

      this.dialogTableVisible = false;
    },
    // 时间
    dataCreate_change1(val) {
      if (val && val != "") {
        this.whiteSearchList1.startCreateTime1 = val[0];
        this.whiteSearchList1.endCreateTime1 = val[1];
      } else {
        this.whiteSearchList1.startCreateTime1 = dayjs()
          .subtract(1, "month")
          .format("YYYY-MM-DD HH:mm:ss");
        this.whiteSearchList1.endCreateTime1 = dayjs().format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    },
    //返回
    fanhui() {
      this.cityName = "成都市";
      this.mineMap();
      this.oldmaploading = false;
      this.loading = true;
      this.leftip();
    },

    xuanze() {
      this.leftip();
    },
    chongzhi() {
      this.newdomainSimpleVo.dateValue_find1 = null;
      this.whiteSearchList1.startCreateTime1 = dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD HH:mm:ss");
      this.whiteSearchList1.endCreateTime1 = dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.leftip();
      this.fanhui();
    },
    //访问量
    async fangwenl(val) {
      this.gridData = [];
      this.loading1 = true;
      this.dialogTableVisible = true;
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        address: "中国四川省成都市" + this.mapName1,
      };
      const { data: res } = await this.$http.post("/discover/getRawData", list);
      if (res.code == 200) {
        this.loading1 = false;
        this.gridData = res.data.content;
        this.total1 = res.data.totalElements;
        this.totalPages1 = res.data.totalPages;
      }
    },
    async handleCurrentChange1(val) {
      this.gridData = [];
      this.loading1 = true;
      this.mypageable1.pageNum1 = val;

      // console.log( this.mypageable.pageNum);
      // this.fangwenl();
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        address: "中国四川省成都市" + this.mapName1,
      };
      const { data: res } = await this.$http.post("/discover/getRawData", list);
      if (res.code == 200) {
        this.loading1 = false;
        this.gridData = res.data.content;
        this.total1 = res.data.totalElements;
        this.totalPages1 = res.data.totalPages;
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.right_main_under {
  width: 100%;
  height: 100%;
  padding: 0;
  // height: 100%;
  z-index: 999;
  box-sizing: border-box;
}
.Maptop {
  width: 100%;
  height: 5%;
  // background-color: #fff;
  // border: 1px solid red;
}
.Mapcenter {
  width: 100%;
  height: 75%;
  // background-color: #fff;
  // padding: 10px;
  padding: 10px 0;
  overflow: hidden;
  box-sizing: border-box;
}
.Mapbtom {
  // margin-top: 1%;
  width: 100%;
  height: 22%;
  // padding: 10px;
  // border: 1px solid red;
}
.leftmap {
  width: 24%;
  height: 100%;
  float: left;
  // border: 1px solid red;
}
.centermap {
  width: 45%;
  height: 100%;
  float: left;
  // border: 1px solid rgb(136, 132, 132);
}
.rightmap {
  width: 31%;
  height: 100%;
  float: left;
  // border: 1px solid red;
}
/deep/ .el-form-item__label {
  color: #fff;
}
.leftmapson {
  // width: 21.875rem /* 350/16 */;
  // height: 34.375rem /* 550/16 */;
  width: 100%;
  height: 100%;
}
.leftmapson1 {
  // width: 21.875rem /* 350/16 */;
  // height: 34.375rem /* 176/16 */ /* 550/16 */;
  width: 100%;
  height: 100%;
}
.leftmapson2 {
  // width: 100rem /* 1600/16 */ /* 350/16 */;

  // height: 10.9375rem /* 175/16 */;
  width: 100%;
  height: 100%;
}
.Mapcenter1 {
  position: relative;
  // width: 51.25rem /* 820/16 */;
  // height: 35.625rem /* 570/16 */ /* 570/16 */;
  width: 100%;
  height: 100%;
}
// .title{
//   margin: 0 auto;
//   width: 12.5rem /* 200/16 */;
//   height: 100%;
//   color: #fff;
//   font-size: 20px;
// }
.btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
.dialogInfo /deep/ .el-table__row {
  height: 40px !important;
  z-index: 666;
}
.right_main_under .pagePagination {
  margin-top: 0;
}
</style>