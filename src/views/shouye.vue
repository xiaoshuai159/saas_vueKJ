<template>
  <div
    class="right_main_under"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="box">
      <!-- 层级下拉框 -->
      <!-- <div class="block">
        <span class="demonstration">单选选择任意一级选项</span>
        <el-cascader
          ref="cascader"
          v-model="ciji"
          :options="options"
          :props="{
            checkStrictly: true, //1、checkStrictly: true 设置父子节点取消选中关联，从而达到选择任意一级选项的目的。
            expandTrigger: 'hover', //2、expandTrigger:'hover' 解决使用懒加载因为有遮罩层，而无法点击文字选择下一层问题。
          }"
          :show-all-levels="false"
          @change="cascaderChange"
        ></el-cascader>
      </div> -->

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
      loading: false,
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
            value: "分局",
            label: "分局",
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
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      ciji: "",
    };
  },
  mounted() {
    //层级下拉框
    // setInterval(function () {
    //   document.querySelectorAll(".el-cascader-node__label").forEach((el) => {
    //     // console.log(el);
    //     el.onclick = function () {
    //       if (this.previousElementSibling) this.previousElementSibling.click();
    //     };
    //   });
    // }, 1000);

    // this.barqushi();
  },
  created() {
    this.tongji();
  },
  methods: {
    //层级下拉框
    // cascaderChange(val) {
    //   this.$refs.cascader.toggleDropDownVisible(); //地区选择之后将下拉框界面收起
    //   console.log(val); //获取的id值['10001','10011']
    // },

    //初始化
    async tongji() {
      this.qushi.xdata = [];
      this.qushi.ynum = [];
      this.loading = true;
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
            // barWidth: "30px",
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
                  : this.typeList.sourceType == "分局"
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
      this.loading = false;
      return option;
    },
  },
};
</script>

<style scoped lang='less' >
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
// _________________________
</style>