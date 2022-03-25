<template>
  <div class="right_main_under">
    <div class="box">
      <!-- //筛选 -->
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 数据来源 -->
          <el-form-item label="选择类型">
            <el-select
              v-model="typeList.sourceType"
              placeholder="选择类型"
              @clear="sourceType_clearFun(typeList.sourceType)"
              @change="echartstypeList(typeList.sourceType)"
            >
              <el-option
                v-for="item in selectData.type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 文字 -->
      <div class="title_box">
        <div class="fanzhi">
          <div class="jin">今日发现数量</div>
          <div class="jin_num">{{ this.datanum }}</div>
        </div>
        <div class="fanzhi1">
          <div class="jin">发现总数量</div>
          <div class="jin_num3">{{ this.datanumz }}</div>
        </div>
      </div>
      <!-- echarts -->
      <div class="echarts_box">
        <div
          id="bar_qushi"
          ref="chartqushi"
          style="width: 100%; height: 100%"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      selectData: {
        type: [
          {
            value: "长安通信",
            label: "长安通信",
          },
          {
            value: "公安部",
            label: "公安部",
          },
          {
            value: "移动公司",
            label: "移动公司",
          },
          {
            value: "瑞斯",
            label: "瑞斯",
          },
          {
            value: "各个分局的涉案网址",
            label: "各个分局的涉案网址",
          },
          {
            value: "",
            label: "全部总和",
          },
        ],
      },
      typeList: {
        sourceType: "", //选择类型
      },
      datanum: 0,
      datanumz: 0,
      qushi: {
        xdata: [],
        ynum: [],
      },
    };
  },
  mounted() {
    // this.barqushi();
  },
  created() {
    this.tongji();
  },
  methods: {
    //初始化
    async tongji() {
      this.qushi.xdata = [];
      this.qushi.ynum = [];
      let list = {
        dataSource: this.typeList.sourceType,
      };
      const { data: res } = await this.$http.post(
        "/black/obtainBlackTotal",
        list
      );
      if (res.code == 200) {
        // console.log(res.data);
        this.datanum = res.data.dateTotal;
        this.datanumz = res.data.total;
        res.data.maps.forEach((item) => {
          this.qushi.xdata.push(item.time);
          this.qushi.ynum.push(item.total);
        });
  
        if (this.$refs.chartqushi) {
          this.barqushi();
        }
      }
    },
    sourceType_clearFun(val) {
      if (val == "") {
        this.typeList.sourceType = null;
      }
    },
    echartstypeList(val) {
      this.tongji();
    },
    //趋势图
    barqushi() {
      // eslint-disable-next-line camelcase
      var bar_qs = this.$refs.chartqushi;
      let myChart = this.$echarts.init(bar_qs);
      myChart.clear();
      myChart.setOption(this.setOptionqushi());

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    setOptionqushi() {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "10%",
          // containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.qushi.xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              interval: 0,
              rotate: 40,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            //去除网格线
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            nameTextStyle: {
              color: "#fff",
              padding: [0, 0, 0, -30], // 四个数字分别为上右下左与原位置距离
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            //去除刻度线
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true, //y轴线消失
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            // barWidth: "60%",
            itemStyle: {
              normal:
                this.typeList.sourceType == "长安通信"
                  ? {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(96,98,72,.5)",
                          },
                          {
                            offset: 1,
                            color: "#f9cc68",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#fcd068",
                    }
                  : this.typeList.sourceType == "公安部"
                  ? {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(23,67,129,.5)",
                          },
                          {
                            offset: 1,
                            color: "#0689f4",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#0689f4",
                    }
                  : this.typeList.sourceType == "移动公司"
                  ? {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(39,101,135,.5)",
                          },
                          {
                            offset: 1,
                            color: "#55c9f7",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#55c9f7",
                    }
                  : this.typeList.sourceType == "瑞斯"
                  ? {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(222, 40, 225,.5)",
                          },
                          {
                            offset: 1,
                            color: "#e856eb",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#c853ca",
                    }
                  : this.typeList.sourceType == "各个分局的涉案网址"
                  ? {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(113, 238, 154,.5)",
                          },
                          {
                            offset: 1,
                            color: "#14c950",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#14c950",
                    }
                  : {
                      //柱体的颜色
                      //右，下，左，上（1，0，0，0）表示从正右开始向左渐变
                      color: new this.$echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "rgba(175, 110, 228,.5)",
                          },
                          {
                            offset: 1,
                            color: "#8d1ee9",
                          },
                        ],
                        false
                      ),
                      borderWidth: 1,
                      borderColor: "#8d1ee9",
                    },
            },

            data: this.qushi.ynum,
          },
        ],
      };
      return option;
    },
  },
};
</script>

<style scoped lang='less'>
.box {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.search {
  width: 100%;
  height: 5%;
  padding-left: 1%;
  box-sizing: border-box;
}
.title_box {
  width: 100%;
  height: 90px;
  padding: 0 1%;
  box-sizing: border-box;
}
.echarts_box {
  width: 100%;
  height: 80%;
}
/deep/ .el-form-item__label {
  color: #fff;
}
.fanzhi,
.fanzhi1 {
  width: 50%;
  height: 90px;
  float: left;
  background: url("../assets/newimg/newhome/框实时2.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.jin {
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding-top: 10px;
  box-sizing: border-box;
  color: #fff;
}
.jin_num {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #63b4ff;
  text-shadow: 0px 2px 2px black;
  font-family: "Arial";
}
.jin_num3 {
  width: 100%;
  height: 40px;
  font-size: 34px !important;
  line-height: 40px;
  color: #eaa14d;
  text-shadow: 0px 2px 2px black;
}
</style>