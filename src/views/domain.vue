<template>
  <div class="right_main_under">
    <!-- 统计图表 -->
    <div class="tubiao" v-if="getRole1('tongJiTreatment')">
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
    </div>
    <!-- +++++++++++++++++?列表 -->
    <div class="search_select_form">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="URL">
            <el-input
              placeholder="url"
              v-model="newdomainSimpleVo.url"
              @clear="url_clearFun(newdomainSimpleVo.url)"
            >
            </el-input>
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
          <!-- 处置时间 -->
          <el-form-item label="处置时间">
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

          <!-- 诈骗类型 -->
          <el-form-item label="诈骗类型">
            <el-select
              v-model="newdomainSimpleVo.modelType1"
              placeholder="诈骗类型"
              clearable
              @clear="modelType1_clearFun(newdomainSimpleVo.modelType1)"
            >
              <el-option
                v-for="item in selectData.model_typeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 二级分类 -->
          <el-form-item label="二级分类">
            <el-select
              v-model="newdomainSimpleVo.classification"
              placeholder="二级分类"
              clearable
              @clear="
                sourceType_classification(newdomainSimpleVo.classification)
              "
            >
              <el-option
                v-for="item in selectData.classificationlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态">
            <el-select
              v-model="newdomainSimpleVo.state"
              placeholder="状态"
              clearable
              @clear="state_clearFun(newdomainSimpleVo.state)"
            >
              <el-option
                v-for="item in selectData.stateTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议">
            <el-select
              v-model="newdomainSimpleVo.protocol"
              placeholder="协议"
              clearable
              @clear="protocol_clearFun(newdomainSimpleVo.protocol)"
            >
              <el-option
                v-for="item in selectData.protocolData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否授权">
            <el-select
              v-model="newdomainSimpleVo.authorize"
              placeholder="是否授权"
              clearable
              @clear="protocol_authorize(newdomainSimpleVo.authorize)"
            >
              <el-option
                v-for="item in selectData.authorize"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="今日处置量">
<el-input v-model="dayliang"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click.native.stop="searchTabData"
              v-prevent-click
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click.native="resetFun"
              >重置</el-button
            >
            <!-- :loading="isLoading" -->
            <el-button
              v-if="getRole1('downloadDomain')"
              type="primary"
              size="mini"
              @click.native.stop="put"
              :loading="loadingbut"
            >
              {{ loadingbuttext }}</el-button
            >
            <el-button
              v-if="getRole1('authorize')"
              type="primary"
              size="mini"
              @click.native.stop="newauthorization"
              >一键授权</el-button
            >
            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="shguliang">
      <span>今日总量： {{ this.dayliang }}</span>
      <span> 处置总量： {{ this.dayliangchuzhi }} </span>
      <!-- 周五 -->
      <span> 今日拦截量： {{ this.daylanjieliang }}</span>
      <span>累计总拦截量：{{ this.daylanjienum }}</span>
    </div>
    <!-- //列表 -->

    <el-table
      :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="600px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
      :row-style="{ height: 0 }"
      :cell-style="{ padding: 0 }"
    >
      <el-table-column type="selection" min-widt="5%"> </el-table-column>
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="filename" prop="fileName" v-if="isLoading">
      </el-table-column>
      <!--  -->
      <!-- ----------------- -->
      <el-table-column
        label="URL"
        min-width="20%"
        v-if="getlist1('url')"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-popconfirm
            v-if="getRole1('getUrl')"
            confirm-button-text="看截图"
            cancel-button-text="去访问"
            confirm-button-type="Primary"
            cancel-button-type="Primary"
            @confirm="kanjietu(scope.row.fileName, scope.row.url)"
            @cancel="qufangwen(scope.row.url)"
            :hide-icon="true"
          >
            <el-button type="text" slot="reference" class="urlcolor">{{
              scope.row.url
            }}</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="!getRole1('getUrl')"
            confirm-button-text="看截图"
            cancel-button-text="去访问"
            confirm-button-type="Primary"
            cancel-button-type="Primary"
            @cancel="qufangwen(scope.row.url)"
            :hide-icon="true"
          >
            <el-button type="text" slot="reference" class="urlcolor">{{
              scope.row.url
            }}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
      <!-- ----------------- -->
      <el-table-column
        label="诈骗类型"
        min-width="10%"
        v-if="getlist1('type')"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ zP(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        label="协议"
        prop="protocol"
        min-width="10%"
        v-if="getlist1('protocol')"
      >
      </el-table-column>
      <el-table-column label="状态" min-width="7%" v-if="getlist1('status')">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? "处置中" : "已处置" }}
        </template>
      </el-table-column>
      <el-table-column
        label="处置时间"
        min-width="10%"
        v-if="getlist1('treatmentTime')"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.treatmentTime">
            {{ ql(scope.row.treatmentTime) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="二级分类"
        min-width="17%"
        prop="category"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ geterji(scope.row.category) }}
        </template>
      </el-table-column>
      <el-table-column
        label="处置后拦截量"
        prop="visits"
        min-width="10%"
        v-if="getlist1('visits')"
      >
      </el-table-column>
      <el-table-column
        label="数据来源"
        min-width="10%"
        v-if="getlist1('dataSource')"
      >
        <template slot-scope="scope">
          {{ laiyuan(scope.row.dataSource) }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否授权"
        min-width="7%"
        v-if="getlist1('authorize')"
      >
        <template slot-scope="scope">
          {{ scope.row.authorize == "0" ? "未授权" : "已授权" }}
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 看截图 -->
    <el-dialog
      :title="kanjietutitle"
      :visible.sync="newkanjietu"
      width="45%"
      height="40%"
      :before-close="newkanjietuclose"
    >
      <img :src="this.jieURL" ref="img" alt="" class="img" />
    </el-dialog>
  </div>
</template>

<script>
import getRole from "@/utils/promission.js";
import getList from "@/utils/poresslist.js";
import dayjs from 'dayjs';
import erji from "@/utils/twotype.js"
import zPtype from "@/utils/type.js"
export default {
  // inject: ["reload"],
  name: "search",
  components: {},
  data() {
    return {
      loadingbuttext: "导出",
      loadingbut: false,
      newkanjietu: false,
      visible: false,
      whiteSearchList: {
        startCreateTime: null,
        endCreateTime: null,
      },
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      isLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: "",
        region: "",
      },
      newdomainSimpleVo: {
        url: null,
        dateValue_find: null, //处置时间
        modelType1: null, //modelType1
        protocol: null, //协议
        sourceType: null, //数据来源
        authorize: null, //是否授权
        state: null, //状态
        dateValue_find1: null, //图表时间
        classification: null, //二级分类
      },
      dayliang: 0,
      dayliangchuzhi: 0,
      daylanjieliang: 0,
      daylanjienum: 0,
      daytydpe: 0,
      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },

      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      //下拉框的选项数据
      selectData: {
        classificationlist: [
          { value: "kf_ds", label: "冒充电商客服" },
          { value: "kf_wl", label: "冒充物流客服(物流快递)" },
          { value: "kf_other", label: "其他冒充客服类" },
          { value: "gjf_mc", label: "冒充公检法" },
          { value: "gjf_ss", label: "工商平台类" },
          { value: "gjf_etc", label: "ETC通行卡" },
          { value: "gjf_other", label: "其他政府机关或单位组织" },
          { value: "sd", label: "做任务赚钱" },
          { value: "dk_xyz", label: "虚假代办信用卡" },
          { value: "dk_te", label: "虚假提额套现" },
          { value: "dk_dk", label: "虚假贷款" },
          { value: "dk_other", label: "其他贷款代办信用卡类" },
          { value: "jjgw", label: "冒充军警购物诈骗" },
          { value: "szp_lc", label: "虚假投资理财(股票期货交易/数字币)" },
          {
            value: "szp_dubo",
            label: "博彩彩票/娱乐城/购彩/投注押注/开奖/赛马会",
          },
          { value: "szp_ty", label: "体育直播/比分竞猜" },
          { value: "szp_yx", label: "棋牌游戏" },
          {
            value: "ds_gw",
            label:
              "虚假购物(购买账号/发卡/自动下单/购物商城/领卷/卡密/刷单刷信誉/提升店铺流量/提升排名)",
          },
          { value: "ds_fw", label: "虚假服务" },
          { value: "ds_other", label: "其他电商类诈骗" },
          { value: "jy_jr", label: "冒充外国军人" },
          { value: "jy_hl", label: "冒充婚恋" },
          { value: "jy_jy", label: "网络教育/聊天交友(密聊/闲聊)" },
          { value: "jy_other", label: "其他网络婚恋/交友类" },
          { value: "zx_xyd", label: "消除校园贷记录" },
          { value: "zx_bljl", label: "消除不良记录" },
          { value: "zx_other", label: "其他虚假征信类" },
          { value: "mc_ld", label: "冒充领导" },
          { value: "mc_sr", label: "冒充熟人" },
          { value: "mc_gz", label: "冒充公众人物" },
          { value: "mc_other", label: "冒充其他身份" },
          { value: "yx_card", label: "游戏币/游戏点卡诈骗" },
          { value: "yx_zhzb", label: "游戏账号/游戏装备诈骗" },
          { value: "yx_other", label: "其他游戏产品虚假交易" },
          { value: "other_zj", label: "虚假中奖诈骗" },
          { value: "other_zp", label: "虚假招聘" },
          { value: "other_jp", label: "机票退改诈骗" },
          { value: "other_tp", label: "ps图片诈骗" },
          { value: "app_ff", label: "分发平台" },
          { value: "xzym", label: "下载页面" },
        ],
        protocolData: [
          { value: "HTTP", label: "HTTP" },
          { value: "HTTPS", label: "HTTPS" },
        ],
        sourceTypeData: [
          { value: "CA", label: "长安发现" },
          { value: "BD", label: "本地上传" },
          { value: "BXF", label: "部下发" },
          { value: "AJ", label: "案件" },
          { value: "SY", label: "沈阳" },
        ],

        stateTypeData: [
          { value: 0, label: "处置中" },
          { value: 1, label: "已处置" },
        ],
        model_typeData: [
          { value: "DK", label: "贷款" },
          { value: "SD", label: "刷单" },
          { value: "GJF", label: "仿冒公检法" },
          { value: "LC", label: "理财" },
          { value: "GW", label: "网络购物" },
          { value: "QT", label: "其他类型" },
          { value: "JJGW", label: "冒充军警购物诈骗" },
          { value: "SZP", label: "杀猪盘" },
          { value: "DS", label: "虚假购物/服务类" },
          { value: "JY", label: "网络婚恋/交友类" },
          { value: "ZX", label: "虚假征信类" },
          { value: "MC", label: "冒充领导/熟人类" },
          { value: "YX", label: "网络游戏产品虚假交易类" },
          { value: "APP", label: "分发平台" },
          { value: "XZYM", label: "下载页面" },
          { value: "OTHER", label: "其他类型诈骗" },
        ],
        authorize: [
          { value: 0, label: "未授权" },
          { value: 1, label: "已授权" },
        ],
      },
      tableData: [],
      tableDatalist: [],

      newurl: "",
      qutest: [],
      qutest1: [],
      qutest2: [],
      zhutest1: [],
      zhutest2: [],
      zhutest3: [],
      restest: [],
      jieURL: "",
      kanjietutitle: "",
    };
  },
  computed: {},
  created() {
 
    this.getTabData();
  
    this.echartslist();
    this.daychuzhiliang();
    this.dayzong();
    this.daylanjienumliang();
    this.daylanjiezong();
 
  },
  mounted() {
    // setTimeout(() => {
    //   this.drawLine();
    //   this.Columnar();
    // }, 500);
  },
  methods: {
    //二级分类
    geterji(data){
     return erji(data)
    },
    //类型
    zP(data){
      return zPtype(data)
    },
    getRole1(data) {
      return getRole(data);
      // console.log( getRole(data));
    },
    getlist1(data) {
      // console.log(data);
      return getList(data);
    },
    // qu() {
    //   console.log(1);

    // },
    // 处置总数量
    async dayzong() {
      let list = {
        endTreatmentTime: this.whiteSearchList.endCreateTime,
        startTreatmentTime: this.whiteSearchList.startCreateTime,
      };
      const { data: res } = await this.$http.post(
        "/treatment/getSumDomain",
        list
      );
      if (res.code == 200) {
        let sum = 0;
        // let sumtype = 0;
        for (var i = 0; i < res.data.length; i++) {
          sum += res.data[i].sumStatus;
          // sumtype += res.data[i].status;
        }
        this.dayliangchuzhi = sum;
        // this.daytydpe = sumtype;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    // 当天处置数量
    async daychuzhiliang() {
      const { data: res } = await this.$http.post(
        "/treatment/getSumDomainToday"
      );
      if (res.code == 200) {
        let sum1 = 0;

        for (var i = 0; i < res.data.length; i++) {
          sum1 += res.data[i].sumStatus;
        }

        this.dayliang = sum1;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //拦截量总量   //时间有问题
    async daylanjiezong() {
      const list = {
        endTreatmentTime:this.whiteSearchList.endCreateTime==null?this.whiteSearchList.endCreateTime: dayjs(this.whiteSearchList.endCreateTime).format('YYYY/MM/DD'),
        startTreatmentTime:this.whiteSearchList.startCreateTime==null?this.whiteSearchList.startCreateTime: dayjs(this.whiteSearchList.startCreateTime).format('YYYY/MM/DD'),
      };
      // console.log(list);
      const { data: res } = await this.$http.get(
        "/treatment/getSumDomainVisits",
        {
          params: list,
        }
      );
      if (res.code == 200) {
        // console.log(res.data);
        let sum = 0;

        for (var i = 0; i < res.data.length; i++) {
          sum += res.data[i].sumStatus;
        }
        this.daylanjienum = sum;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //当天拦截量
    async daylanjienumliang() {
      const { data: res } = await this.$http.get(
        "/treatment/getDomainVisitsToday"
      );
      if (res.code == 200) {
        // console.log(res.data);
        let sum1 = 0;

        for (var i = 0; i < res.data.length; i++) {
          sum1 += res.data[i].sumStatus;
        }

        this.daylanjieliang = sum1;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    // +++++++++++++++++++++++++++++++++++++
    qufangwen(val) {
      // console.log(val);
      window.open(val);
    },
    async kanjietu(val, label) {
      // this.urlres=val
      this.kanjietutitle = "";
      this.jieURL = "";
      const { data: res } = await this.$http.post(
        "/treatment/getUrl" + "?fileName=" + val
      );
      // console.log(res);
      if (res.code == 200) {
        this.jieURL = res.data;
        this.kanjietutitle = label;
        // console.log(label);
      } else if (res.code == 500) {
        this.$message(res.message);
      }

      this.newkanjietu = true;

      // console.log(2);
    },
    newkanjietuclose() {
      this.newkanjietu = false;
    },
    //曲线图++++++++++++++++++++++++++++++++++++
    // ===================================
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
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#66B3FF",
            },
          },
        },
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
          data: [
            {
              name: "处置域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "域名拦截量",
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
          {
            name: "处置域名数",
            type: "line",

            data: this.qutest1,
            smooth: true,
          },
          {
            name: "域名拦截量",
            type: "line",

            data: this.qutest2,
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
    // 曲线图++++++++++++++++++++++++++++++++++++
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
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
          data: [
            {
              name: "处置域名数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "域名拦截量",
              textStyle: {
                color: ["#EE6666"],
              },
              //  ["处置域名数", "域名访问量"]
            },
          ],
        },
        xAxis: {
          type: "category",
          // data:this.zhutest2,
          data: this.restest,

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
            data: this.zhutest2,
            type: "bar",
            color: "#fac858",
            barWidth: 20,
            name: "处置域名数",
          },
          {
            data: this.zhutest3,
            type: "bar",

            barWidth: 20,
            name: "域名拦截量",
            color: "#EE6666",
          },
        ],
      };
      return option;
    },

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
        // console.log(this.zhutest1);
        setTimeout(() => {
          this.drawLine();
          this.Columnar();
        }, 500);
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //图表数据查询
    async chaxun1() {
      // (this.qutest = []),
      //   (this.qutest1 = []),
      //   (this.qutest2 = []),
      //   (this.zhutest1 = []),
      //   (this.zhutest2 = []);
      //    this.zhutest3 = [];
      //    this.restest = [];

      let charecharts1 = {
        startTreatmentTime:
          this.whiteSearchList1.startCreateTime1 != null
            ? this.whiteSearchList1.startCreateTime1.substring(
                0,
                this.whiteSearchList1.startCreateTime1.length - 9
              )
            : null,
        endTreatmentTime:
          this.whiteSearchList1.endCreateTime1 != null
            ? this.whiteSearchList1.endCreateTime1.substring(
                0,
                this.whiteSearchList1.startCreateTime1.length - 9
              )
            : null,
      };
      //       let charecharts1 = {
      //   startTreatmentTime: this.whiteSearchList1.startCreateTime1.substring(
      //     0,
      //     this.whiteSearchList1.startCreateTime1.length - 9
      //   ),
      //   endTreatmentTime: this.whiteSearchList1.endCreateTime1.substring(
      //     0,
      //     this.whiteSearchList1.startCreateTime1.length - 9
      //   )
      // };
      const { data: res } = await this.$http.post(
        "/treatment/tongJiTreatment",
        charecharts1
      );
      if (res.code == 200) {
        console.log(res);
        (this.qutest = []),
          (this.qutest1 = []),
          (this.qutest2 = []),
          (this.zhutest1 = []),
          (this.zhutest2 = []);
        this.zhutest3 = [];
        this.restest = [];
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
        // console.log(this.zhutest1);

        setTimeout(() => {
          this.drawLine();
          this.Columnar();
        }, 500);
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //初始化获取数据
    async getTabData() {
      let mypageable = {
        mypageable: this.mypageable,
        domainSimpleVo: {
          dataSource: this.newdomainSimpleVo.sourceType,
          type: this.newdomainSimpleVo.modelType1,
          status: this.newdomainSimpleVo.state,
          protocol: this.newdomainSimpleVo.protocol,
          authorize: this.newdomainSimpleVo.authorize,
        },
        domainTimeVo: {
          startTreatmentTime: this.whiteSearchList.startCreateTime,
          endTreatmentTime: this.whiteSearchList.endCreateTime,
        },
      };
      // console.log(initList);
      // console.log(mypageable);
      const { data: res } = await this.$http.post(
        "/treatment/getDomain",
        mypageable
      );
      if (res.code == 200) {
        // console.log(res.data);

        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },

    //查询
    async searchTabData() {
      let getTabDataList = {
        // domainSimpleVo: this.newdomainSimpleVo,
        // domainTimeVo: this.whiteSearchList,
        // mypageable: this.mypageable,
        domainSimpleVo: {
          url: this.newdomainSimpleVo.url,
          dataSource: this.newdomainSimpleVo.sourceType,
          type: this.newdomainSimpleVo.modelType1,
          status: this.newdomainSimpleVo.state,
          protocol: this.newdomainSimpleVo.protocol,
          authorize: this.newdomainSimpleVo.authorize,
          category: this.newdomainSimpleVo.classification,
        },
        domainTimeVo: {
          startTreatmentTime: this.whiteSearchList.startCreateTime,
          endTreatmentTime: this.whiteSearchList.endCreateTime,
        },
        mypageable: {
          // pageNum: this.mypageable.pageNum,
          pageNum: 1,
          pageSize: this.mypageable.pageSize,
        },
      };

      const { data: res } = await this.$http.post(
        "/treatment/getDomain",
        getTabDataList
      );
      if (res.code == 200) {
        // console.log(res);
        this.dayzong();
        this.daylanjiezong();
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
      } else if (res.code == 500) {
        this.$message(res.message);
      } else {
        this.$message("无数据");
        this.mypageable.pageNum = 1;
        this.mypageable.pageSize = 10;
        this.getTabData();
        this.resetFun();
      }
    },
    // if (res.code == 200) {
    //          this.mypageable.pageNum=1
    //       if (res.data.content.length > 0) {
    //         this.tableData = res.data.content;
    //         this.total = res.data.totalElements;
    //         this.totalPages = res.data.totalPages;
    //       } else {
    //             this.mypageable.pageNum=1
    //             this.mypageable.pageSize=10
    //             this.getTabData();
    //       }
    //     } else {
    //       this.$message("无数据");
    //         this.mypageable.pageNum=1
    //         this.mypageable.pageSize=10
    //         this.getTabData();
    //         this.resetFun()
    //     }
    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        url: null,
        modelType1: null, //modelType1
        protocol: null, //协议
        sourceType: null, //数据来源
        authorize: null, //是否授权
        state: null, //状态
        dateValue_find: null, //处置时间
        classification: null, //二级分类
      };
      this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      };

      this.mypageable = {
        pageNum: 1,
        pageSize: 10,
      };
      this.getTabData();
      this.dayzong();
      this.daylanjiezong();
    },
    handleSelectionChange(val) {
      this.tableDatalist = val;
    },
    //一键授权
    async newauthorization() {
      // console.log(this.tableDatalist);
      if (this.tableDatalist.length > 0) {
        let arr = [];
        let authorarr = [];
        this.tableDatalist.forEach((item) => {
          arr.push(item.id);
          authorarr.push(item.authorize);
        });
        if (authorarr.includes(1)) {
          this.$message("选择中含有已授权，请重新选择");
        } else {
          const newarr = {
            code: "null",
            data: arr,
            message: "null",
          };
          const { data: res } = await this.$http.post(
            "/treatment/authorize",
            newarr
          );
          if (res.code == 200) {
            this.$message("授权修改成功");
            // this.reload();
            this.getTabData();
            this.shuzuid = [];
          } else if (res.data == 500) {
            this.$message(res.message);
          }
        }
      } else {
        this.$message("请选择");
      }
    },
    //导出
    async put() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      let putlist = {
        domainSimpleVo: {
          dataSource: this.newdomainSimpleVo.sourceType,
          type: this.newdomainSimpleVo.modelType1,
          status: this.newdomainSimpleVo.state,
          protocol: this.newdomainSimpleVo.protocol,
          authorize: this.newdomainSimpleVo.authorize,
        },
        domainTimeVo: {
          startTreatmentTime: this.whiteSearchList.startCreateTime,
          endTreatmentTime: this.whiteSearchList.endCreateTime,
        },
        mypageable: this.mypageable,
      };

      const { data: res } = await this.$http.post(
        "/treatment/downloadDomain",
        putlist
      );
      if (res.code == 200) {
        this.loadingbuttext = "导出";
        this.loadingbut = false;
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
        this.$refs.multipleTable.clearSelection();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startCreateTime = val[0];
        this.whiteSearchList.endCreateTime = val[1];
      } else {
        this.whiteSearchList.startCreateTime = null;
        this.whiteSearchList.endCreateTime = null;
      }
    },
    //有问题

    dataCreate_change1(val) {
      if (val && val != "") {
        this.whiteSearchList1.startCreateTime1 = val[0];
        this.whiteSearchList1.endCreateTime1 = val[1];
      } else {
        this.whiteSearchList1.startCreateTime1 = null;
        this.whiteSearchList1.endCreateTime1 = null;
      }
    },
    getRowKeys(row) {
      return row.id;
    },

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
    find_change(val) {
      if (val && val != "") {
        this.domainTimeVo.startFindTime = val[0];
      } else {
        this.domainTimeVo.startFindTime = null;
      }
    },
    Issue_change(val) {
      if (val && val != "") {
        this.domainTimeVo.IssueFindTime = val[0];
      } else {
        this.domainTimeVo.IssueFindTime = null;
      }
    },
    finish_change(val) {
      if (val && val != "") {
        this.domainTimeVo.startFinishTime = val[0];
        this.domainTimeVo.endFinishTime = val[1];
      }
    },
    update_change(val) {
      if (val && val != "") {
        this.domainTimeVo.startUpdateTime = val[0];
        this.domainTimeVo.endUpdateTime = val[1];
      }
    },
    issued_change(val) {
      if (val && val != "") {
        this.domainTimeVo.startIssuedTime = val[0];
        this.domainTimeVo.endIssuedTime = val[1];
      }
    },
    url_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.url = null;
      }
    },
    sourceType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.sourceType = null;
      }
    },

    state_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.state = null;
      }
    },
    sourceType_classification(val) {
      if (val == "") {
        this.newdomainSimpleVo.classification = null;
      }
    },
    modelType1_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.modelType1 = null;
      }
    },
    protocol_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.protocol = null;
      }
    },
    protocol_authorize(val) {
      if (val == "") {
        this.newdomainSimpleVo.authorize = null;
      }
    },
   
   
   
    //处置时间去零
    ql(val) {
      let c = val;
      return c.substring(0, c.length - 9);
    },
    laiyuan(val) {
      if (val == "BXF") {
        return "部下发";
      } else if (val == "AJ") {
        return "案件";
      } else if (val == "CA") {
        return "长安";
      } else if (val == "BD") {
        return "本地";
      } else if (val == "SY") {
        return "沈阳";
      }
    },
  },
  filters: {
    sourceType: function (value) {
      var status = "";
      switch (value) {
        case "CA":
          status = "长安";
          break;
        case "PG":
          status = "盘古";
          break;
        case "XZ":
          status = "刑侦";
          break;
        default:
          status = "暂无";
          break;
      }
      return status;
    },
  },
};
</script>

<style  scoped lang='less'>
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/ .el-table__body tr:hover > td {
  background-color: #03112359 !important;
}

/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #192d45 !important;
}
.el-pagination {
  text-align: right;
}
.bottom {
  width: 100%;
  height: 3.75rem /* 60/16 */ /* 40/16 */;

  .ss_l {
    float: left;
    margin-top: 13px;
    span {
      margin-left: 1.25rem /* 10/16 */;
      margin-right: 1.25rem /* 20/16 */;
      a {
        color: #fff;
      }
      a:hover {
        color: red;
      }
    }
  }
  .ss {
    float: right;
  }
}

.warning {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 5rem /* 80/16 */;
  .item {
    .el-button {
      width: 9.375rem /* 150/16 */ /* 100/16 */;
      height: 4rem /* 80/16 */;
      font-size: 18px;
      background-color: rgb(93, 93, 199);
      color: #fff;
      border: 1px solid transparent;
    }
  }
}

// * el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin-top: 0.625rem /* 10/16 */;
  background: 0 0;
  border-top: 1px solid #596168;
}
.dialist {
  padding: 0 1.25rem /* 10/16 */ 1.25rem 0 /* 20/16 */;
  .ss {
    margin-right: 1.5rem /* 20/16 */;
  }
}
// /deep/.el-dialog {
//   margin: 5vh auto !important;
// }

// /deep/ .el-dialog__body {
//   height: 70vh;
//   overflow: auto;
// }
.urlcolor {
  color: #909090;
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
.right {
  width: 40%;
  height: 10rem;
  background-color: #07293f;
  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
  border-radius: 10px;
}
.urlsrc {
  width: 18.75rem /* 300/16 */;
  height: 31.25rem /* 500/16 */;
}
.img {
  width: 100%;
  height: 100%;
}
.shguliang {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  color: #fff;
  display: flex;
}
.shguliang span {
  flex: 1;
  font-size: 20px;
}
</style>
