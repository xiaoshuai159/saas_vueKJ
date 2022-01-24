<!--
 * @Author: your name
 * @Date: 2021-07-18 11:34:50
 * @LastEditTime: 2021-07-18 13:19:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \complex(3)\complex\src\views\bigping.vue
-->
<template>
  <div class="right_main_under">
    <div class="top">
      <div class="left">
        <!-- //处置域名数量 -->
        <div id="bar_qx1" ref="chart1" style="width:500px,height:200px"></div>
      </div>
      <div class="right">
        <!-- 反制数据统计（按类型） -->
        <div id="bar_zz" ref="zhuchart" style="width:500px,height:200px"></div>
      </div>
    </div>
    <!-- //嘉兴没有 -->
    <div class="bottom">
      <div class="left1">
        <!-- 域名访问量 -->
        <div id="bar_qx" ref="chart" style="width:500px,height:200px"></div>
      </div>
      <div class="right1">
        <!-- 处置成功录数据 -->
        <div
          id="bar_zz1"
          ref="zhuchart1"
          style="width:500px,height:200px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      whiteSearchList2: {
        startCreateTime2: "2022-01-09",
        endCreateTime2: "2022-01-02",
      },
      qutest: [],
      qutest1: [],
      qutest2: [],
      zhutest1: [],
      zhutest2: [],
      zhutest3: [],
      restest: [],
      typemax: {
        zhutest2max: 0,
        zhutest3max: 0,
      },
      //  111111111111
      newqutest: [],
      newqutest1: [],
      newqutest2: [],
      newqutest3: [],
      newzhutest1: [],
      newzhutest2: [],
      newzhutest3: [],
      newzhutest4: [],
      // 处置域名数量参数
      yumingtestx: [],
      yumingtestca: [],
      yumingtestsy: [],
      //  newrestest: [],
      //处置成功率数据
      czsuccessx: [],
      czsuccessca: [],
      czsuccesssy: [],
    };
  },
  created() {
    // this.echartslist();
    // this.echartslist1();
    this.echartslist();
    this.echartslist1();
    this.chuzhiyumingshuecharts();
    this.chuzhisuccess();
  },
  mounted() {
    // this.echartslist();
    // this.echartslist1();
    //   this.chuzhiyumingshuecharts();
    //   this.chuzhisuccess()
  },
  methods: {
    // 图表初次渲染
    async echartslist() {
      let charecharts = {
        startTreatmentTime: this.whiteSearchList1.startCreateTime1.substring(
          0,
          this.whiteSearchList1.startCreateTime1.length - 9
        ),
        endTreatmentTime: this.whiteSearchList1.endCreateTime1.substring(
          0,
          this.whiteSearchList1.startCreateTime1.length - 9
        ),
      };
      const { data: res } = await this.$http.post(
        "/treatment/tongJiTreatment",
        charecharts
      );
      // console.log(res);
      if (res.code == 200) {
        res.data.tjList.forEach((item) => {
          this.qutest.push(item.treatmentTime1);
          this.qutest1.push(item.urlCount);
          this.qutest2.push(item.visitsSum);
        });
        res.data.sonList.forEach((item) => {
          this.zhutest1.push(item.type);
          this.zhutest2.push(item.urlCount2);
          this.zhutest3.push(item.typeVisits);
        });

        // var num = [...this.zhutest2, ...this.zhutest3];
        this.typemax.zhutest2max = Math.max(...this.zhutest2);
 
        this.typemax.zhutest3max = Math.max(...this.zhutest3);
       
        this.typemax.zhutest2max = this.ceilNumber(this.typemax.zhutest2max);
        this.typemax.zhutest3max = this.ceilNumber(this.typemax.zhutest3max);
     
        // console.log(  this.typemax.zhutest3max);
        // console.log(this.typemax);
        // console.log(num);
        setTimeout(() => {
          this.drawLine();
          this.Columnar();
        }, 500);
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //取整数
    ceilNumber(number) {
      if (number > 0) {
        let bite = 0;
        if (number < 10) {
          return 10;
        }
        while (number >= 10) {
          number /= 10;
          bite += 1;
        }
        // debugger
        return Math.ceil(number) * Math.pow(10, bite);
      } else if (number < 0) {
        // console.log("我是负数");
        let bite = 0;
        if (number > -10) {
          return -10;
        }
        while (number <= -10) {
          number /= 10;
          bite += 1;
        }
        // debugger
        return Math.floor(number) * Math.pow(10, bite);
      } else if (number == 0) {
        return 0;
      }
    },
    // 图表初次渲染
    async echartslist1() {
      let charecharts = {
        startFraudTime: this.whiteSearchList1.startCreateTime1,
        endTFraudTime: this.whiteSearchList1.endCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/warning/statistics",
        charecharts
      );
      if (res.code == 200) {
        // console.log(res);
        res.data.warningStatisticsGradeList.forEach((item) => {
          this.newqutest.push(item.fraudTimeVo);
          this.newqutest1.push(item.high);
          this.newqutest2.push(item.middle);
          this.newqutest3.push(item.lower);
        });
        res.data.warningStatisticsTypeList.forEach((item) => {
          this.newzhutest1.push(item.fraudType1);
          this.newzhutest2.push(item.high);
          this.newzhutest3.push(item.middle);
          this.newzhutest4.push(item.lower);
        });
        // console.log(this.zhutest1);
        setTimeout(() => {
          this.drawLine1();
          this.Columnar1();
        }, 500);
      } else if (res.code == 500) {
        // alert("无数据");
        this.$message(res.message);
      }
    },
    // 处置成功率数据
    async chuzhisuccess() {
      const { data: res } = await this.$http.get("/getCounterByDate");
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.czsuccessx.push(item.date);
          this.czsuccessca.push(item.caSource);
          this.czsuccesssy.push(item.sySource);
          if (this.$refs.bar_zz1) {
            this.Columnar1();
          }
        });
      }
    },
    // 处置域名数_echarts
    async chuzhiyumingshuecharts() {
      //  let list = {
      //         startFraudTime: this.whiteSearchList2.startCreateTime2,
      //         endTFraudTime: this.whiteSearchList2.endCreateTime2,
      //       };
      const { data: res } = await this.$http.get("/treatment/getDomainCount");
      if (res.code == 200) {
        // console.log(res.data);
        res.data.forEach((item) => {
          this.yumingtestx.push(item.treatday);
          this.yumingtestca.push(item.caCount);
          this.yumingtestsy.push(item.syCount);
        });
        if (this.$refs.bar_qx1) {
          this.drawLine1();
        }
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //曲线图++++++++++++++++++++++++++++++++++++
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart;
      // eslint-disable-next-line camelcase
      if (bar_qx) {
        let myChart = this.$echarts.init(bar_qx);
        myChart.setOption(this.setOption());
        // console.log(myChart);
      }
      // console.log(this.qutest);
    },
    setOption() {
      let option = {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
        title: {
          x: "center",
          text: "域名拦截量", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: ["#EE6666", " #fac858"], //绿色  橙色
        legend: {
          left: "87%", //xin
          orient: "vertical", //xin  horizontal
          data: [
            // {
            //   name: "长安",
            //   textStyle: {
            //     color: ["#fac858"],
            //   },
            // },
            {
              name: "长安",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        grid: {
          y2: 140,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.qutest,
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          // {
          //   name: "长安",
          //   type: "line",

          //   data: this.qutest1,
          //   smooth: true,
          // },
          {
            name: "长安",
            type: "line",

            data: this.qutest2,
            smooth: true,
            areaStyle: {},
          },
        ],

        grid: {
          x: 60,
          y: 60,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };
      return option;
    },
    //柱状图----------------------------------------
    Columnar() {
      // eslint-disable-next-line camelcase
      var bar_zz = this.$refs.zhuchart;
      // eslint-disable-next-line camelcase
      if (bar_zz) {
        let myChart = this.$echarts.init(bar_zz);

        myChart.setOption(this.zhusetOption());
      }
    },
    zhusetOption() {
      this.zhutest1.forEach((item) => {
        if (item == "DK") {
          this.restest.push("网络贷款");
        } else if (item == "SD") {
          this.restest.push("兼职刷单");
        } else if (item == "GJF") {
          this.restest.push("冒充公务单位");
        } else if (item == "LC") {
          this.restest.push("投资理财");
        } else if (item == "GW") {
          this.restest.push("网络购物");
        } else if (item == "QT") {
          this.restest.push("未分类");
        }
      });
      // console.log(this.restest);
      // let option = {

      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //   },
      //   title: {
      //     x: "center",
      //     text: "反制数据统计(按类型)", //xin
      //     textStyle: {
      //       //xin
      //       fontSize: 20,
      //       color: "#fff", //xin
      //     },
      //   },
      //   grid: {
      //     x: 70,
      //     y: 60,
      //     x2: 70,
      //     y2: 40,
      //     borderWidth: 1,
      //   },
      //   color: [" #fac858", "#EE6666"], //绿色  橙色
      //   legend: {
      //     left: "80%", //xin
      //     orient: "vertical", //xin  horizontal
      //     data: [
      //       {
      //         name: "处置域名数",
      //         textStyle: {
      //           color: ["#fac858"],
      //         },
      //       },
      //       {
      //         name: "域名拦截量",
      //         textStyle: {
      //           color: ["#EE6666"],
      //         },
      //         //  ["处置域名数", "域名访问量"]
      //       },
      //     ],
      //   },
      //   xAxis: {
      //     type: "category",
      //     // data:this.zhutest2,
      //     data: this.restest,

      //     axisLabel: {
      //       // rotate: -30,
      //       //  让x轴文字方向为竖向
      //       interval: 0,
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: "#fff",
      //         width: 1,
      //       },
      //     },
      //   },
      //   yAxis: [
      //     {
      //       splitLine: {
      //         //控制刻度横线的显示
      //         show: true,
      //       },
      //       type: "value",
      //       // max: 20,
      //       min: 0,
      //       interval: 5,
      //       minInterval: 5,
      //       // name:"处置域名数",
      //       //   nameLocation: "center",
      //       // nameGap: 50,
      //       // nameRotate: 0,
      //       // nameTextStyle: {
      //       //   fontSize: 16,
      //       // },

      //       axisLine: {
      //         // Y轴线的颜色、和轴线的宽度
      //         lineStyle: {
      //           color: "#D5D5D5",
      //           width: 2,
      //         },
      //       },
      //     },
      //     {
      //       splitLine: {
      //         show: true,
      //       },
      //       type: "value",
      //       max: 100,
      //       min: 0,
      //       interval: 20,
      //       // name:"域名拦截量",
      //       // nameLocation: "center",
      //       // nameGap: 50,
      //       // nameRotate: 0,
      //       // nameTextStyle: {
      //       //   fontSize: 16,
      //       // },

      //       axisLine: {
      //         lineStyle: {
      //           color: "#D5D5D5",
      //           width: 2,
      //         },
      //       },
      //     },
      //   ],

      //   // yAxis: {

      //   //   type: "value",
      //   //   splitLine: {
      //   //     lineStyle: {
      //   //       color: ["#fff"],
      //   //     },
      //   //   },
      //   //   nameTextStyle: {
      //   //     color: ["#fff"],
      //   //   },
      //   //   axisLine: {
      //   //     lineStyle: {
      //   //       color: "#fff",
      //   //       width: 1,
      //   //     },
      //   //   },
      //   // },
      //   series: [
      //     {
      //       data: this.zhutest2,
      //       type: "bar",
      //       color: "#fac858",
      //       barWidth: 20,
      //       yAxisIndex: 0,
      //       name: "处置域名数",
      //     },
      //     {
      //       data: this.zhutest3,
      //       type: "bar",
      //       yAxisIndex: 1,
      //       barWidth: 20,
      //       name: "域名拦截量",
      //       color: "#EE6666",
      //     },
      //   ],
      // };
      let option = {
        title: {
          text: "反制数据统计(按类型)",
          x: "center",
          y: "top",
          align: "center",
          textStyle: {
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        grid: {
          //调整统计图上下左右边距
          top: 80,
          right: 65,
          bottom: 50,
          left: 80,
        },
        legend: {
          left: "80%", //xin
          orient: "vertical", //xin  horizontal
          data: [
               {
              name: "域名拦截量",
              textStyle: {
                color: ["#EE6666"],
              },
            },
            {
              name: "处置域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
         
          ],
        },

        xAxis: [
          {
            type: "category",
            data: this.restest,
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },

            axisLabel: {
              interval: 0, //代表显示所有x轴标签显示
            },
          },
        ],
        yAxis: [
          {
           
            type: "value",
            max: this.typemax.zhutest3max,
            min: 0,
            interval:
              this.typemax.zhutest3max == 0
                ? 5
                : Math.ceil(this.typemax.zhutest3max / 5),
            // name: "域\n名\n拦\n截\n量",
            // nameLocation: "center",
            // nameGap: 35,
            // nameRotate: 0,
            // nameTextStyle: {
            //   fontSize: 16,
            // },

            axisLine: {
              lineStyle: {
                color: "#D5D5D5",
                width: 2,
              },
            },
          },
          {
            type: "value",
            max: this.typemax.zhutest2max,
            min: 0,
            interval:
              this.typemax.zhutest2max == 0
                ? 5
                : Math.ceil(this.typemax.zhutest2max / 5),
      
            // name: "处\n置\n域\n名\n数",
            // nameLocation: "center",
            // nameGap: 35,
            // nameRotate: 0,
            // nameTextStyle: {
            //   fontSize: 16,
            // },

            axisLine: {
              // Y轴线的颜色、和轴线的宽度
              lineStyle: {
                color: "#D5D5D5",
                width: 2,
              },
            },
          },
          
        ],
        series: [
           {
            name: "域名拦截量",
            type: "bar",
            yAxisIndex: 0,
            barWidth: 20,
            data: this.zhutest3,
            itemStyle: {
              //双Y轴B柱的柱体颜色
              normal: {
                color: "#EE6666",
              },
            },
          },
          {
            name: "处置域名数",
            type: "bar",
            yAxisIndex: 1,
            barWidth: 20,
            data: this.zhutest2,
            itemStyle: {
              //双Y轴A柱的柱体颜色
              normal: {
                color: "#fac858",
              },
            },
          },
         
        ],
      };
      return option;
    },

    //this.zhutest2  处置域名数  20   this.zhutest3  域名拦截量  20
    //曲线图++++++++++++++++++++++++++++++++++++1111
    drawLine1() {
      // eslint-disable-next-line camelcase
      var bar_qx1 = this.$refs.chart1;
      let myChart = this.$echarts.init(bar_qx1);
      myChart.setOption(this.setOption1());
    },
    setOption1() {
      let option = {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
        title: {
          x: "center",
          text: "处置域名数量", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: ["#EE6666", "#fac858", "#91cc75"], //绿色  橙色
        legend: {
          left: "87%", //xin
          orient: "vertical", //xin horizontal
          data: [
            {
              name: "长安",

              textStyle: {
                color: ["#EE6666"],
              },
            },
            {
              name: "沈阳",
              textStyle: {
                color: ["#fac858"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ["2021-01-01","2021-01-02","2021-01-03","2021-01-04","2021-01-05","2021-01-06","2021-01-07"],
          data: this.yumingtestx,
          axisLabel: {
            // rotate: -20,
            //  让x轴文字方向为竖向
            // interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },

        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "长安",
            type: "line",
            data: this.yumingtestca,
            // data: [4000,6000,40000,10000,50000,31020,12345,70000],
            smooth: true,
          },
          {
            name: "沈阳",
            type: "line",
            data: this.yumingtestsy,
            // data: [40000,7000,5000,10000,20020,22020,123450,1000],
            smooth: true,
          },
        ],

        grid: {
          x: 60,
          y: 75,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };
      return option;
    },
    //柱状图----------------------------------------111
    Columnar1() {
      // eslint-disable-next-line camelcase
      var bar_zz1 = this.$refs.zhuchart1;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_zz1);

      myChart.setOption(this.zhusetOption1());
    },

    zhusetOption1() {
      //  this.zhutest1.forEach((item) => {
      //    if (item == "DK") {
      //      this.restest.push("网络贷款");
      //    } else if (item == "SD") {
      //      this.restest.push("兼职刷单");
      //    } else if (item == "GJF") {
      //      this.restest.push("冒充公检法");
      //    } else if (item == "LC") {
      //      this.restest.push("投资理财");
      //    } else if (item == "GW") {
      //      this.restest.push("网络购物");
      //    } else if (item == "QT") {
      //      this.restest.push("其他");
      //    }
      //  });
      // console.log(this.restest);
      let option = {
        //下载

        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          x: "center",
          text: "处置成功率数据", //xin
          textStyle: {
            //xin
            fontSize: 20,
            color: "#fff", //xin
          },
        },
        grid: {
          x: 60,
          y: 75,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
        color: ["#fac858", "#EE6666"], //绿色  橙色
        legend: {
          left: "80%", //xin
          orient: "vertical", //xin horizontal
          data: [
            {
              name: "长安成功率",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "沈阳成功率",
              textStyle: {
                color: ["#EE6666"],
              },
            },
          ],
        },
        xAxis: {
          type: "category",
          data: this.czsuccessx,
          // data: [
          //   "2021-01-01",
          //   "2021-01-02",
          //   "2021-01-03",
          //   "2021-01-04",
          //   "2021-01-05",
          //   "2021-01-06",
          //   "2021-01-07",
          // ],

          axisLabel: {
            // rotate: -30,
            //  让x轴文字方向为竖向
            interval: 0,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        yAxis: {
          type: "value",
          name: "百分比(%)",
          splitLine: {
            lineStyle: {
              color: ["#fff"],
            },
          },

          max: 100,
          min: 0,
          nameTextStyle: {
            color: ["#fff"],
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1,
            },
          },
        },
        series: [
          {
            // data: ["20", "30", "40", "50", "60", "70", "80"],
            data: this.czsuccessca,
            type: "bar",
            color: "#fac858",
            barWidth: 20,
            name: "长安成功率",
          },

          {
            // data: ["80", "70", "60", "50", "40", "30", "20"],
            data: this.czsuccesssy,
            type: "bar",
            barWidth: 20,
            name: "沈阳成功率",
            color: "#EE6666",
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style scoped lang='less'>
.top {
  // margin-top: 6.25rem /* 100/16 */;   //嘉兴
  height: 50%;
  padding: 1.25rem 2.5rem /* 40/16 */ /* 20/16 */;
  // border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.bottom {
  height: 50%;
  padding: 1.25rem 2.5rem /* 20/16 */;
  // border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.left {
  float: left;
  width: 45% /* 779/16 */;
  height: 100% /* 300/16 */;
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
.right {
  float: right;
  width: 45% /* 779/16 */;
  height: 100% /* 300/16 */;
  background-color: #07293f;
  box-sizing: border-box;
  border-radius: 10px;
}
.left1 {
  float: left;
  width: 45% /* 779/16 */;
  height: 100% /* 300/16 */;
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
.right1 {
  float: right;
  width: 45% /* 779/16 */;
  height: 100% /* 300/16 */;
  background-color: #07293f;
  box-sizing: border-box;
  border-radius: 10px;
}
#bar_qx {
  height: 100% /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
#bar_zz {
  height: 100% /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}

#bar_qx1 {
  height: 100% /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
#bar_zz1 {
  height: 100% /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
}
</style>