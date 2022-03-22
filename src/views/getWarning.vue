<template>
  <div class="right_main_under">
    <!-- 统计图表 -->
    <!-- <div class="tubiao" v-if="getRole1('statistics')">
      <div>
        <el-form size="mini" style="margin: 0 0 0 5rem">
          <el-form-item>
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
              style="margin-left: 1rem"
              type="primary"
              @click.native.stop="chaxun1"
            >
              查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="tubiao1">
        <div class="left">
          <div id="bar_qx" ref="chart" style="width:500px,height:200px"></div>
        </div>
        <div class="right">
          <div
            id="bar_zz"
            ref="zhuchart"
            style="width:500px,height:200px"
          ></div>
        </div>
      </div>
    </div> -->

    <div class="search_select_form">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="mini"
      >
        <!-- 诈骗时间 -->
        <el-form-item label="诈骗时间">
          <el-date-picker
            v-model="newdomainSimpleVo.dateValue_find"
            type="daterange"
            :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 数据来源 -->
        <el-form-item label="数据来源">
          <el-select
            v-model="newdomainSimpleVo.sourceType"
            placeholder="数据来源"
            clearable
            @clear="sourceType_clearFun(newdomainSimpleVo.sourceType)"
          >
            <el-option
              v-for="item in selectData.sourceTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 推送单位 -->
        <el-form-item label="推送单位">
          <el-select
            v-model="newdomainSimpleVo.unit"
            placeholder="推送单位"
            clearable
            @clear="unitType_clearFun(newdomainSimpleVo.unit)"
          >
            <el-option
              v-for="item in selectData.unitTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 预警等级 -->
        <el-form-item label="预警等级">
          <el-select
            v-model="newdomainSimpleVo.Warning"
            placeholder="预警等级"
            clearable
            @clear="WarningType_clearFun(newdomainSimpleVo.Warning)"
          >
            <el-option
              v-for="item in selectData.WarningTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 诈骗类型 -->
        <el-form-item label="诈骗类型">
          <el-select
            v-model="newdomainSimpleVo.fraud"
            placeholder="诈骗类型"
            clearable
            @clear="fraudType_clearFun(newdomainSimpleVo.fraud)"
          >
            <el-option
              v-for="item in selectData.fraudypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号归属地 -->
        <!-- <el-form-item label="手机号归属地">
         <el-input v-model="newdomainSimpleVo.photo" placeholder="请输入"    @clear="modelType1_photo(newdomainSimpleVo.photo)"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click.native="searchTabData"
            v-prevent-click
            >查询</el-button
          >
          <el-button type="primary" size="mini" @click.native="resetFun"
            >重置</el-button
          >
          <el-button type="primary" size="mini" @click.native.stop="put"      :loading="loadingbut"  v-if="getRole1('downloadWarning')"
            >{{loadingbuttext}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- //列表 -->
    <el-table
      :row-key="getRowKeys"
      ref="multiTable"
      :data="tableData"
      style="width: 100%"
      max-height="600px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <!-- max-height="600px" -->

      <el-table-column type="selection" :reserve-selection="true" width="55">
      </el-table-column>
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="诈骗时间" prop="fraudTime"> </el-table-column>
      <el-table-column label="预警等级" prop="earlyGrade"> </el-table-column>

      <el-table-column label="诈骗类型">
        <template slot-scope="scope">
          {{ shuzu(scope.row.fraudType) }}
        </template>
      </el-table-column>
      <el-table-column
        label="诈骗网站域名"
        prop="fraudAddress"
      ></el-table-column>
      <el-table-column label="电话号码" prop="phone"></el-table-column>
      <el-table-column label="受害人IP" prop="userIp"> </el-table-column>
      <el-table-column label="受害人端口" prop="userPort"> </el-table-column>
      <el-table-column label="受害人IP归属地" prop="userIpAscription"> </el-table-column>
      <el-table-column label="数据来源" prop="dataSource"  width="100"> </el-table-column>
      <el-table-column label="操作" v-if="getRole1('showDetails')"  width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="ckxq(scope.row.id)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- ====================== -->

    <el-dialog
      title="详情"
      :visible.sync="xiangqing"
      width="30%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
        <el-table-column label="创建时间" prop="createTime"> </el-table-column>
        <el-table-column label="诈骗时间" prop="fraudTime"></el-table-column>
        <el-table-column label="预警等级" prop="earlyGrade"> </el-table-column>
        <el-table-column label="诈骗类型" prop="fraudType"></el-table-column>
      </el-table>

      <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
        <el-table-column label="诈骗域名" prop="fraudAddress">
        </el-table-column>
        <el-table-column label="诈骗地址所属国家" prop="domainName">
        </el-table-column>
        <el-table-column label="诈骗网站IP" prop="fraudIp"> </el-table-column>
        <el-table-column
          label="诈骗网站端口"
          prop="fraudPort"
        ></el-table-column>
      </el-table>

      <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
        <el-table-column label="受害人IP" prop="userIp"> </el-table-column>
        <el-table-column label="受害人端口" prop="userPort"> </el-table-column>
          <el-table-column label="受害人IP归属地" prop="userIpAscription"> </el-table-column>
        <el-table-column label="用户名" prop="username"> </el-table-column>
    
      </el-table>
      <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
          <el-table-column label="地址" prop="address"> </el-table-column>
        <el-table-column label="身份证号" prop="idCard"></el-table-column>
        <el-table-column label="身份证归属地" prop="idCardAddress">
        </el-table-column>
        <el-table-column label="电话号码" prop="phone"> </el-table-column>
     
      </el-table>
      <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
         <el-table-column label="电话归属地" prop="phoneAddress">
        </el-table-column>
        <el-table-column label="银行卡号" prop="bankCard"> </el-table-column>
        <el-table-column label="通话时长" prop="talkTime"> </el-table-column>
        <el-table-column label="诈骗金额" prop="amount"></el-table-column>
    
      
      </el-table>
          <el-table
        :row-key="getRowKeys"
        ref="multiTable"
        :data="xintableData"
        style="width: 100%"
        size="mini"
        class="tableStyle qwqw"
      >
            <el-table-column label="消息可信度" prop="reliability">
        </el-table-column>
         <el-table-column label="推送单位" prop="pushUnit"> </el-table-column>
        <el-table-column label="推送次数" prop="pushTime"> </el-table-column>
        <el-table-column label="数据来源" prop="dataSource"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- //分页 -->
    <div class="bottom">
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="mypageable.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import getRole from "@/utils/promission.js";
export default {
  data() {
    return {
         loadingbuttext: "下载",
      loadingbut: false,
      xintableData: [],
      xiangqing: false,
      isLoading: false,
      newdomainSimpleVo: {
        photo: null, //手机号
        dateValue_find: null, //诈骗时间
        unit: null, //推送单位
        sourceType: null, //数据来源
        Warning: null, //预警等级
        fraud: null, //诈骗类型
        dateValue_find1: null, //图表时间
      },
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          fraudTime: "we",
        },
      ],
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      selectData: {
        sourceTypeData: [{ value: "长安通信", label: "长安通信" }],
        WarningTypeData: [
          { value: "高危", label: "高危" },
          { value: "中危", label: "中危" },
          { value: "低危", label: "低危" },
          { value: "中危及低危", label: "中危及低危" },
        ],
        unitTypeData: [
          {
            value: "四川省成都市公安局刑警支队",
            label: "四川省成都市公安局刑警支队",
          },
        ],
        fraudypeData: [
          { value: "贷款", label: "贷款" },
          { value: "理财", label: "理财" },
          { value: "客服", label: "客服" },
          { value: "杀猪盘", label: "杀猪盘" },
          { value: "冒充公检法", label: "冒充公务单位" },
          { value: "刷单", label: "刷单" },
        ],
      },
      newqutest: [],
      newqutest1: [],
      newqutest2: [],
      newqutest3: [],
      newzhutest1: [],
      newzhutest2: [],
      newzhutest3: [],
      newzhutest4: [],
    };
  },
  created() {
    this.getTabData();
    // this.echartslist1();
  },
  methods: {
     getRole1(data) {
      return getRole(data);
      // console.log( getRole(data));
    },
    //下载
    async put() {
           this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let putlist = {
        warningSimpleVo: {
          pushUnit: this.newdomainSimpleVo.unit,
          dataSource: this.newdomainSimpleVo.sourceType,
          earlyGrade: this.newdomainSimpleVo.Warning,
          fraudType: this.newdomainSimpleVo.fraud,
        },
        warningTimeVo: {
          startFraudTime: this.whiteSearchList.startCreateTime,
          endFraudTime: this.whiteSearchList.endCreateTime,
        },
      };

      const { data: res } = await this.$http.post(
        "/warning/downloadWarning",
        putlist
      );
      if (res.code == 200) {
         this.loadingbuttext = "下载";
        this.loadingbut = false
        let newurl = res.expandData.url;
        let eleLink = document.createElement("a");
        eleLink.download = name;
        // const down = window.location.origin
        // eleLink.href = "http://172.31.1.61:8080" + newurl;
        // const down = window.location.origin
        eleLink.href = newurl;

        // console.log(eleLink);
        eleLink.click();
        eleLink.remove();
      } else {
        this.$message(res.message);
      }
    },
    // 图表初次渲染
    // async echartslist1() {
    //   let charecharts = {
    //     startFraudTime: this.whiteSearchList1.startCreateTime1,
    //     endFraudTime: this.whiteSearchList1.endCreateTime1,
    //   };
    //   const { data: res } = await this.$http.post(
    //     "/warning/statistics",
    //     charecharts
    //   );
    //   if (res.code == 200) {
    //     // console.log(res);
    //     res.data.warningStatisticsGradeList.forEach((item) => {
    //       this.newqutest.push(item.fraudTimeVo);
    //       this.newqutest1.push(item.high);
    //       this.newqutest2.push(item.middle);
    //       this.newqutest3.push(item.lower);
    //     });
    //     res.data.warningStatisticsTypeList.forEach((item) => {
    //       this.newzhutest1.push(item.fraudType1);
    //       this.newzhutest2.push(item.high);
    //       this.newzhutest3.push(item.lower);
    //       this.newzhutest4.push(item.middle);
    //     });
    //     setTimeout(() => {
    //       this.drawLine();
    //       this.Columnar();
    //     }, 500);
    //   } else {
    //     alert("无数据");
    //   }
    // },

    //图表数据查询
    // async chaxun1() {
    //   let charecharts2 = {
    //     endFraudTime: this.whiteSearchList1.endCreateTime1,
    //     startFraudTime: this.whiteSearchList1.startCreateTime1,
    //   };
    //   const { data: res } = await this.$http.post(
    //     "/warning/statistics",
    //     charecharts2
    //   );
    //   if (res.code == 200) {
    //     (this.newqutest = []),
    //       (this.newqutest1 = []),
    //       (this.newqutest2 = []),
    //       (this.newqutest3 = []),
    //       (this.newzhutest1 = []),
    //       (this.newzhutest2 = []),
    //       (this.newzhutest3 = []),
    //       (this.newzhutest4 = []),
    //       res.data.warningStatisticsGradeList.forEach((item) => {
    //         this.newqutest.push(item.fraudTimeVo);
    //         this.newqutest1.push(item.high);
    //         this.newqutest2.push(item.middle);
    //         this.newqutest3.push(item.lower);
    //       });
    //     res.data.warningStatisticsTypeList.forEach((item) => {
    //       this.newzhutest1.push(item.fraudType1);
    //       this.newzhutest2.push(item.high);
    //       this.newzhutest3.push(item.middle);
    //       this.newzhutest4.push(item.lower);
    //     });
    //     setTimeout(() => {
    //       this.drawLine();
    //       this.Columnar();
    //     }, 500);
    //   } else {
    //     alert("无数据");
    //   }
    // },
    //曲线图++++++++++++++++++++++++++++++++++++1111
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart;
      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption1());
    },
    setOption1() {
      let option = {
        feature: {
          saveAsImage: {
            show: false,
          },
        },
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: ["#fac858", "#EE6666", "#91cc75"], //绿色  橙色
        legend: {
          data: [
            {
              name: "高",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "中",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
            {
              name: "低",
              textStyle: {
                color: ["#91cc75"],
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
          data: this.newqutest,

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
            name: "高",
            type: "line",

            data: this.newqutest1,
            smooth: true,
          },
          {
            name: "中",
            type: "line",

            data: this.newqutest2,
            smooth: true,
          },
          {
            name: "低",
            type: "line",

            data: this.newqutest3,
            smooth: true,
          },
        ],

        grid: {
          x: 60,
          y: 40,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
      };
      return option;
    },
    //柱状图----------------------------------------111
    Columnar() {
      // eslint-disable-next-line camelcase
      var bar_zz = this.$refs.zhuchart;
      // eslint-disable-next-line camelcase

      let myChart = this.$echarts.init(bar_zz);

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
        toolbox: {
          show: true,
          // feature: {
          //   mark: { show: true },
          //   saveAsImage: { show: true },
          // },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {},
        grid: {
          x: 60,
          y: 40,
          x2: 40,
          y2: 40,
          borderWidth: 1,
        },
        color: ["#fac858", "#EE6666", "#91cc75"], //绿色  橙色
        legend: {
          data: [
            {
              name: "高",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "中",
              textStyle: {
                color: ["#EE6666"],
              },
            },
            {
              name: "低",
              textStyle: {
                color: ["#91cc75"],
              },
            },
          ],
        },
        xAxis: {
          type: "category",
          // data:this.zhutest2,
          data: this.newzhutest1,

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
            data: this.newzhutest2,
            type: "bar",
            color: "#fac858",
            barWidth: 15,
            barGap: 0,
            name: "高",
          },
          {
            data: this.newzhutest4,
            type: "bar",
            barWidth: 15,
            name: "中",
            barGap: 0,
            color: "#EE6666",
          },
          {
            data: this.newzhutest3,
            type: "bar",
            barWidth: 15,
            name: "低",
            barGap: 0,
            color: "#91cc75",
          },
        ],
      };
      return option;
    },
    // 初始化数据
    async getTabData() {
      let getTabDataList = {
        warningSimpleVo: {
          pushUnit: this.newdomainSimpleVo.unit,
          dataSource: this.newdomainSimpleVo.sourceType,
          earlyGrade: this.newdomainSimpleVo.Warning,
          fraudType: this.newdomainSimpleVo.fraud,
        },
        warningTimeVo: {
          startFraudTime: this.whiteSearchList.startCreateTime,
          endFraudTime: this.whiteSearchList.endCreateTime,
        },
        mypageable: this.mypageable,
      };
      const { data: res } = await this.$http.post(
        "/warning/getWarning",
        getTabDataList
      );
      if (res.code == 200) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      }
    },

    //查询
    async searchTabData() {
      let getTabDataList = {
        warningSimpleVo: {
          pushUnit: this.newdomainSimpleVo.unit,
          dataSource: this.newdomainSimpleVo.sourceType,
          earlyGrade: this.newdomainSimpleVo.Warning,
          fraudType: this.newdomainSimpleVo.fraud,
        },
        warningTimeVo: {
          startFraudTime: this.whiteSearchList.startCreateTime,
          endFraudTime: this.whiteSearchList.endCreateTime,
        },
        mypageable: this.mypageable,
      };

      const { data: res } = await this.$http.post(
        "/warning/getWarning",
        getTabDataList
      );
      if (res.code == 200) {
        this.mypageable.pageNum = 1;
        // if (res.data.content.length > 0) {
        // console.log(res.data.content);
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;

        // } else {
        // this.mypageable.pageNum = 1;
        // this.mypageable.pageSize = 10;
        // this.getTabData();
        // }
      } else {
        this.$message("无数据");
        this.mypageable.pageNum = 1;
        this.mypageable.pageSize = 10;
        this.getTabData();
        this.resetFun();
      }
    },

    dataCreate_change1(val) {
      if (val && val != "") {
        this.whiteSearchList1.startCreateTime1 = val[0];
        this.whiteSearchList1.endCreateTime1 = val[1];
      } else {
        this.whiteSearchList1.startCreateTime1 = null;
        this.whiteSearchList1.endCreateTime1 = null;
      }
    },
    //诈骗时间
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      } else {
        this.whiteSearchList.startCreateTime = null;
        this.whiteSearchList.endCreateTime = null;
      }
    },
    sourceType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.sourceType = null;
      }
    },
    unitType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.unit = null;
      }
    },
    WarningType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.Warning = null;
      }
    },
    fraudType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.fraud = null;
      }
    },
    //row-keys
    modelType1_photo(val) {
      if (val == "") {
        this.newdomainSimpleVo.uploadPerson = null;
      }
    },
    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        photo: null,
        dateValue_find: null,
        sourceType: null,
        // sourceType: null,
        fraud: null,
        unit: null,
        Warning: null,
      };
      (this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }),
        this.getTabData();
    },
    // 分页
    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val;

      // console.log( this.mypageable.pageNum);
      this.getTabData();
    },

    handleSelectionChange(val) {
      this.tableDatalist = val;
    },
    getRowKeys(row) {
      return row.id;
    },

    // 数据来源
    // shuzu(val){
    //   if(val=='1'){
    //     return '贷款'
    //   }
    //    else if(val=='2'){
    //     return '理财'
    //   }
    //   else  if(val=='3'){
    //     return '冒充客服'
    //   }
    //   else  if(val=='4'){
    //     return '杀猪盘'
    //   }
    //   else  if(val=='5'){
    //     return '冒充公检法'
    //   }
    //   else  if(val=='6'){
    //     return '刷单'
    //   }
    // }
    shuzu(val) {
      if (val == "贷款") {
        return "贷款";
      } else if (val == "理财") {
        return "理财";
      } else if (val == "客服") {
        return "客服";
      } else if (val == "杀猪盘") {
        return "杀猪盘";
      } else if (val == "冒充公检法") {
        return "冒充公务单位";
      } else if (val == "刷单") {
        return "刷单";
      }
    },
    async ckxq(val) {
      this.xintableData = [];
      // console.log(val);
      let a = {
        id: val.toString(),
      };

      const { data: res } = await this.$http.post("/warning/showDetails", a);
      if (res.code == 200) {
        this.xintableData.push(res.data);
        // console.log(this.xintableData);
        this.xiangqing = true;
      }
    },
    handleClose1() {
      this.xiangqing = false;
    },
  },
};
</script>

<style scoped lang='less'>
.el-table::before {
  height: 0;
  /* // 将高度修改为0 */
}
// 点击变黑
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #03112359;
}
.tubiao {
  width: 100% /* 1558/16 */;
  height: 12.5rem /* 200/16 */ /* 300/16 */;
  margin-bottom: 2rem;
  box-sizing: border-box;
}
.tubiao1 {
  width: 100% /* 1558/16 */;
  height: 10rem /* 200/16 */ /* 300/16 */;
  display: flex;
  justify-content: space-around;
}
.left {
  width: 40% /* 779/16 */;
  height: 10rem /* 300/16 */;
  // float: left;
  // padding: 1.25rem /* 20/16 */ /* 20/16 */ /* 50/16 */ 3.125rem /* 50/16 */
  /* 100/16 */ /* 40/16 */
  box-sizing: border-box;
  background-color: #07293f;
  border-radius: 10px;
}
.right {
  width: 40%;
  height: 10rem;
  background-color: #07293f;
  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
  border-radius: 10px;
}
#bar_qx {
  height: 10rem /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem /* 10/16 */ /* 20/16 */;
}
#bar_zz {
  height: 10rem /* 200/16 */;
  // margin-left: 1.875rem /* 30/16 */ /* 20/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem;
}
.qwqw {
  margin-top: 10px;
}
</style>