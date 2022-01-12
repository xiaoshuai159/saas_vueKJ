<template>
  <div class="right_main_under">
    <div class="search_select_form">
      <template>
        <el-form :inline="true" class="demo-form-inline" size="mini">
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
          <!-- 数据来源 -->
          <el-form-item label="域名类型">
            <el-select
              v-model="newdomainSimpleVo.sourceType"
              placeholder="域名类型"
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

          <!-- 诈骗类型 -->
          <el-form-item label="处置状态">
            <el-select
              v-model="newdomainSimpleVo.state"
              placeholder="处置状态"
              clearable
              @clear="state_clearFun(newdomainSimpleVo.state)"
            >
              <el-option
                v-for="item in selectData.state"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 运营商 -->
          <el-form-item label="运营商">
            <el-select
              v-model="newdomainSimpleVo.Operator"
              placeholder="运营商"
              clearable
              @clear="sourceType_Operator(newdomainSimpleVo.Operator)"
            >
              <el-option
                v-for="item in selectData.OperatorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 网络环境 -->
          <el-form-item label="网络环境">
            <el-select
              v-model="newdomainSimpleVo.environment"
              placeholder="网络环境"
              clearable
              @clear="sourceType_environment(newdomainSimpleVo.environment)"
            >
              <el-option
                v-for="item in selectData.environmentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 数据来源 -->
          <el-form-item label="数据来源">
            <el-select
              v-model="newdomainSimpleVo.form"
              placeholder="数据来源"
              clearable
              @clear="state_clearform(newdomainSimpleVo.form)"
            >
              <el-option
                v-for="item in selectData.formType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL">
            <el-input
              v-model="newdomainSimpleVo.url"
              placeholder="url"
              @clear="state_clearurl(newdomainSimpleVo.url)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click.native="resetFun"
              >重置</el-button
            >
            <el-button type="primary" size="mini" @click.native="search"
              >查询</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click.native="download"
              :loading="loadingbut"
              >{{ loadingbuttext }}</el-button
            >
                <!-- 周五 -->
            <!-- <el-button type="primary" size="mini" @click="urlAdd"
              >添加</el-button
            > -->
            <!-- :loading="isLoading" -->

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="wentitle">
      <span class="wen1">处置成功率：{{ this.chuzhinum + "%" }}</span>
      <span class="wen1"></span>
      <span class="wen1"></span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="600px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" min-widt="5%"> </el-table-column> -->
      <el-table-column prop="handletime" label="处置时间"> </el-table-column>
      <el-table-column prop="id" label="id" v-if="ifziduan"> </el-table-column>
      <el-table-column prop="操作状态" label="operationState" v-if="ifziduan">
      </el-table-column>
      <el-table-column prop="按钮判断" label="uploadType" v-if="ifziduan">
      </el-table-column>
      <el-table-column prop="url" label="URL" show-overflow-tooltip width="200">
      </el-table-column>
      <el-table-column label="域名类型" prop="type" show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          {{zP(scope.row.type)}}
        </template> -->
      </el-table-column>
      <el-table-column prop="dialingTime" label="最后一次拨测时间">
      </el-table-column>
      <el-table-column prop="completeTotal" label="检测次数(次)">
      </el-table-column>
      <el-table-column label="数据来源">
        <template slot-scope="scope">
          {{ ly(scope.row.dataSource) }}
        </template>
      </el-table-column>
      <el-table-column prop="bcState" label="处置状态"> </el-table-column>
      <el-table-column prop="isp" label="运营商"> </el-table-column>
      <el-table-column prop="netWork" label="网络环境"> </el-table-column>

      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="add(scope.row.url)"
            >查看</el-button
          >
          <!-- 周五 -->
          <!-- <el-button
            type="text"
            size="mini"
            @click="starts(scope.row.id)"
            :disabled="scope.row.operationState == 1 ? true : false"
            v-if="scope.row.uploadType == 1 ? true : false"
          >
            开始
          </el-button>
          <el-button
            type="text"
            size="mini"
            v-if="scope.row.uploadType == 1 ? true : false"
            :disabled="scope.row.operationState != 1 ? true : false"
            @click="end(scope.row.id)"
            >暂停</el-button
          >
          <el-button
            type="text"
            size="mini"
            v-if="scope.row.uploadType == 1 ? true : false"
            :disabled="scope.row.operationState != 1 ? true : false"
            @click="end1(scope.row.id)"
            >结束</el-button
          >
          <el-button
            type="text"
            size="mini"
            v-if="scope.row.uploadType == 1 ? true : false"
            :disabled="scope.row.operationState == 1 ? true : false"
            @click="end2(scope.row.id)"
            >删除</el-button
          > -->
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
    <!-- 结果概览 -->
    <el-dialog
      title="结果概览"
      :visible.sync="dialog"
      width="90%"
      top="4vh"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="gailan">
        <h3>概览信息</h3>
        <div class="gailanson">
          <span>URL:&nbsp;&nbsp;{{ this.gailan.url }}</span>
          <span>诈骗类型:&nbsp;&nbsp;{{ zP(this.gailan.type) }}</span>
          <span>客户端总数：&nbsp;&nbsp;{{ this.gailan.kehuduan }}</span>
          <span>拨测次数：&nbsp;&nbsp;{{ this.gailan.boceci }}</span>
        </div>
        <h3>拨测URL详情查看</h3>
        <el-form
          :inline="true"
          class="demo-form-inline search_select_form"
          size="mini"
        >
          <!-- 处置时间 -->
          <el-form-item label="拨测时间">
            <el-date-picker
              v-model="tcboctime"
              type="daterange"
              :change="timechange(tcboctime)"
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
              style="margin-left: 20px"
              @click="confirm"
              >确定</el-button
            >
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 20px"
              @click="conerr"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- //柱状 -->
        <div class="zhuzhuang">
          <div class="zhuzhuang1">
            <div
              id="bar_qx"
              ref="chart"
              style="width: 100%; height: 100%"
            ></div>
          </div>
        </div>
        <el-button
          type="primary"
          size="mini"
          style="float: right; margin-bottom: 10px"
          @click="gailanxiazai"
          :loading="loadingbut"
          >{{ loadingbuttext1 }}</el-button
        >
        <!-- //列表 -->
        <el-table
          ref="multipleTable"
          :data="tableData1"
          style="width: 100%"
          max-height="220px"
          size="mini"
          class="tableStyle"
        >
          <el-table-column prop="clientId" label="客户端id"> </el-table-column>
          <el-table-column prop="url" label="url"> </el-table-column>
          <el-table-column prop="ip" label="客户端IP"> </el-table-column>

          <el-table-column prop="contry" label="国家"> </el-table-column>
          <el-table-column prop="city" label="城市"> </el-table-column>
          <el-table-column prop="downloadTime" label="总下载时间">
          </el-table-column>
          <el-table-column prop="connectTime" label="首次建联时间">
          </el-table-column>

          <el-table-column prop="probeTime" label="拨测时间"> </el-table-column>
          <el-table-column prop="statusCode" label="状态码"> </el-table-column>
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
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogadd"
      width="30%"
      class="dialogInfo"
      :close-on-click-modal="false"
      v-loading="loading"
      :before-close="handleCloseadd"
    >
      <el-form
        :inline="true"
        :rules="rules"
        class="demo-form-inline search_select_form"
        size="mini"
        style="padding-top: 20px"
        :model="addList"
        ref="addList"
      >
        <!-- URL -->
        <el-form-item label="URL" label-width="70px" prop="url">
          <el-input
            placeholder="输入url"
            v-model="addList.url"
            @clear="state_url(addList.url)"
          ></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型" label-width="70px" prop="type">
          <el-select
            placeholder="选择类型"
            @clear="sourceType_type(addList.type)"
            v-model="addList.type"
            clearable
          >
            <el-option
              v-for="item in selectData.sourceTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="时间" label-width="70px">
          <el-date-picker
            v-model="addList.time"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogaddup"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="dialogadderr('addList')"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "boce",
  data() {
    return {
      rules: {
        url: [{ required: true, message: "请输入url", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      dialogadd: false,
      ifziduan: false,
      chuzhinum: 0,
      chuzhisuccess: 0,
      loadingbut: false,
      loadingbuttext: "下载",
      loadingbuttext1: "下载",
      url: "",
      loading: false,
      dialog: false,
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      //弹窗拨测时间
      tcboctime: "",
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      total: 1,
      totalPages: "",
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      newdomainSimpleVo: {
        dateValue_find: null, //处置时间
        sourceType: null, //域名类型
        state: null, //处置状态
        url: null, //url
        form: null, //来源
        Operator: null, //运营商
        environment: null, // 网络环境
      },
      selectData: {
        OperatorList: [
          { value: "移动", label: "移动" },
          { value: "联通", label: "联通" },
          { value: "电信", label: "电信" },
        ],
        environmentList: [
          { value: "固网", label: "固网" },
          { value: "移动网", label: "移动网" },
        ],
        formType: [
          { value: "CA", label: "长安处置" },
          { value: "SY", label: "沈阳处置" },
          { value: "上传账户名", label: "上传账户名" },
        ],
        sourceTypeData: [
          { value: "dk", label: "贷款" },
          { value: "lc", label: "理财" },

          { value: "szp", label: "杀猪盘" },
          { value: "gjf", label: "仿冒公检法" },
          { value: "sd", label: "刷单" },
          { value: "gw", label: "网络购物" },
          { value: "jjgw", label: "冒充军警购物诈骗" },
          { value: "ds", label: "虚假购物/服务类" },
          { value: "jy", label: "网络婚恋/交友类" },
          { value: "zx", label: "虚假征信类" },
          { value: "mc", label: "冒充领导/熟人类" },
          { value: "yx", label: "网络游戏产品虚假交易类" },
          { value: "app", label: "分发平台" },
          { value: "xzym", label: "下载页面" },
          { value: "qt", label: "其他类型诈骗" },
        ],

        state: [
          { value: 0, label: "处置中" },
          { value: 1, label: "已处置" },
          { value: 2, label: "已失效" },
        ],
      },
      tableData: [],
      gailan: {
        // url: "www.https.cpn",
        // type: "szp",
        // kehuduan: "1",
        // boceci: "16",
      },
      tableData1: [
        // {
        //   clientId: 12, //       客户端id
        //   url: "www.baidu.com", //      url
        //   downloadTime: "1200", //  总下载时间
        //   connectTime: "2021-8-12", // 首次建联时间
        //   probeTime: "2021-8-12", //  拨测时间
        //   statusCode: "200", //   状态码
        //   ip: 2, //        客户端IP
        //   city: "简阳市", //         城市
        //   country: "中国", //        国家
        //   num: 20, //      可以访问次数
        //   notNum: 5, //  不能访问次数
        //   probeTime: "2021-08-12 12:36:00", //   拨测日期
        // },
      ],
      mypageable1: {
        pageNum1: 1,
        pageSize1: 5,
      },
      total1: 1,
      totalPages1: "",
      textnum: [],
      probeTime: [],
      textnotNum: [],
      //添加弹窗
      addList: {
        url: null, //url
        type: null, //类型
        time: dayjs(`${new Date()}`).format("YYYY-MM-DD hh:mm:ss"), //时间
      },
    };
  },
  mounted() {
    // this.drawLine()
  },
  created() {
    // this.boceclist();
    this.zongnum();
    this.boceclist();
  },

  methods: {
    //柱状
    drawLine() {
      // eslint-disable-next-line camelcase
      var bar_qx = this.$refs.chart;
      let myChart = this.$echarts.init(bar_qx);
      myChart.setOption(this.setOption());
      this.loading = false;
    },
    //柱状
    setOption() {
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
        title: {
          // x:'center',
          // text: "反制数据统计(按类型)", //xin
          // textStyle: {
          //   //xin
          //   fontSize: 20,
          //   color: "#fff", //xin
          // },
          animation: false,
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "3%",
          bottom: "25%",
        },
        color: [" #fac858", "#EE6666"], //绿色  橙色
        legend: {
          left: "80%", //xin
          orient: "horizontal", //xin  horizontal
          data: [
            {
              name: "成功次数",
              textStyle: {
                color: ["#fac858"],
              },
            },
            {
              name: "失败次数",
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
          data: this.probeTime,

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
            data: this.textnum,
            type: "bar",
            color: "#fac858",
            barWidth: 15,
            stack: "one",
            name: "成功次数",
            animation: false,
          },
          {
            data: this.textnotNum,
            type: "bar",
            stack: "one",
            barWidth: 15,
            name: "失败次数",
            color: "#EE6666",
            animation: false,
          },
        ],
      };
      this.loading = false;
      return option;
    },

    //拨测详情初始化list
    async boceclist() {
      let bcListVo = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        url: this.newdomainSimpleVo.url,
        dataSource: this.newdomainSimpleVo.form,
        isp: this.newdomainSimpleVo.Operator,
        netWork: this.newdomainSimpleVo.environment,
        mypageable: {
          pageNum: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        },
      };

      const { data: res } = await this.$http.post("/updateBcTesList", bcListVo);
      // console.log(res);
      if (res.code == 200) {
        console.log(res.data);
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    async zongnum() {
      const list = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        url: this.newdomainSimpleVo.url,
        dataSource: this.newdomainSimpleVo.form,
        isp: this.newdomainSimpleVo.Operator,
        netWork: this.newdomainSimpleVo.environment,
      };
      const { data: res } = await this.$http.post("/getSuccessRate", list);
      if (res.code == 200) {
        // console.log(res.data);
        this.chuzhinum = res.data;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //查讯
    async search() {
      let bcListVo = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        url: this.newdomainSimpleVo.url,
        isp: this.newdomainSimpleVo.Operator,
        netWork: this.newdomainSimpleVo.environment,
        dataSource: this.newdomainSimpleVo.form,
        mypageable: {
          // pageNum: this.mypageable.pageNum,
          pageNum: 1,
          pageSize: this.mypageable.pageSize,
        },
      };
      // console.log(bocecsearch);
      const { data: res } = await this.$http.post("/updateBcTesList", bcListVo);
      if (res.code == 200) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
        this.zongnum();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //下载
    async download() {
      this.loadingbuttext = "...加载中";
      this.loadingbut = true;
      const bcListVo = {
        bcState: this.newdomainSimpleVo.state,
        type: this.newdomainSimpleVo.sourceType,
        startCreateTime: this.whiteSearchList.startCreateTime,
        endCreateTime: this.whiteSearchList.endCreateTime,
        url: this.newdomainSimpleVo.url,
        isp: this.newdomainSimpleVo.Operator,
        netWork: this.newdomainSimpleVo.environment,
        dataSource: this.newdomainSimpleVo.form,
      };
      const { data: res } = await this.$http.post(
        "/downloadBcTestList",
        bcListVo
      );
      if (res.code == 200) {
        this.loadingbuttext = "下载";
        this.loadingbut = false;
        let url = res.expandData.url;
        let eleLink = document.createElement("a");
        eleLink.download = name;
        eleLink.href = url;
        eleLink.click();
        eleLink.remove();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //查看
    add(val) {
      this.url = val;
      this.loading = true;
      this.dialog = true;
      this.gaikuang();
      // this.bocexiangqing();
      // this.$nextTick(() => {
      //   this.drawLine();
      // });
    },
    //添加
    urlAdd() {
      this.dialogadd = true;
      this.$refs["addList"].clearValidate();
    },
    //添加确认
    dialogadderr(num) {
      this.$refs[num].validate((valid) => {
        if (valid) {
          this.adderr();
          this.$nextTick(() => {
            this.$refs["addList"].clearValidate();
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
      // if (this.addList.type == null || this.addList.url == null) {
      //   this.$message("请输入url和选择类型");
      // } else {

      // }
    },
    async adderr() {
      const list = {
        type: this.addList.type,
        url: this.addList.url,
        handleTime: this.addList.time,
      };
      const { data: res } = await this.$http.post("/save", list);
      if (res.code == 200) {
        // console.log(res.data);
        this.$message(res.message);
        this.dialogadd = false;

        this.boceclist();
        this.addListcz();
      } else if (res.code == 500) {
        this.dialogadd = false;
        this.$message(res.message);
      }
    },
    dialogaddup() {
      this.dialogadd = false;
      this.$refs["addList"].clearValidate();
      this.addListcz();
    },
    // addList重置
    addListcz() {
      this.addList.url = null; //url
      this.addList.type = null; //类型
      this.addList.time = dayjs(`${new Date()}`).format("YYYY-MM-DD hh:mm:ss"); //时间
    },
    //重置
    resetFun() {
      this.newdomainSimpleVo = {
        dateValue_find: null, //处置时间
        sourceType: null, //域名类型
        state: null, //处置状态
        Operator: null, //运营商
        environment: null, // 网络环境
        url: null, //url
        form: null, //来源
      };
      this.newdomainSimpleVo.state = "";
      this.newdomainSimpleVo.sourceType = "";
      this.whiteSearchList.startCreateTime = null;
      this.whiteSearchList.endCreateTime = null;
      this.mypageable.pageNum = 1;
      this.mypageable.pageSize = 10;
      this.search();
      // this.boceclist();
      // this.zongnum()
    },
    // =======================
    //弹窗概况
    async gaikuang() {
      this.bocexiangqing();
      const { data: res } = await this.$http.get("/getBcTestByUrl", {
        params: { url: this.url },
      });
      if (res.code == 200) {
        this.gailan.url = res.data.url;
        this.gailan.type = res.data.type;
        this.gailan.kehuduan = res.data.clientTotal;
        this.gailan.boceci = res.data.completeTotal;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //查看拨测详情列表
    async bocexiangqing() {
      this.textnum = [];
      this.probeTime = [];
      this.textnotNum = [];
      let bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      };
      const { data: res } = await this.$http.post("/getBcTestEntity", bcTestVo);
      if (res.code == 200) {
        this.tableData1 = res.data.page.content;
        this.total1 = res.data.page.totalElements;
        this.totalPages1 = res.data.page.totalPages;
        res.data.list.forEach((item) => {
          this.textnum.push(item.num);
          this.probeTime.push(item.probeTime);
          this.textnotNum.push(item.notNum);
        });

        this.$nextTick(() => {
          this.drawLine();
        });
        this.loading = false;
      } else if (res.code == 500) {
        this.loading = false;
        this.$message(res.message);
      }
      //  else {
      //   this.$message("无数据");

      // }
    },
    async gailanxiazai() {
      this.loadingbuttext1 = "...加载中";
      this.loadingbut = true;
      const bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
      };
      const { data: res } = await this.$http.post(
        "/downloadBcStatistics",
        bcTestVo
      );
      if (res.code == 200) {
        this.loadingbuttext1 = "下载";
        this.loadingbut = false;
        let url = res.expandData.url;
        let eleLink = document.createElement("a");
        eleLink.download = name;
        eleLink.href = url;
        eleLink.click();
        eleLink.remove();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    //确认
    async confirm() {
      this.textnum = [];
      this.probeTime = [];
      this.textnotNum = [];
      let bcTestVo = {
        url: this.url,
        startCreateTime: this.whiteSearchList1.startCreateTime1,
        endCreateTime: this.whiteSearchList1.endCreateTime1,
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      };
      const { data: res } = await this.$http.post("/getBcTestEntity", bcTestVo);
      if (res.code == 200) {
        this.tableData1 = res.data.page.content;
        this.total1 = res.data.page.totalElements;
        this.totalPages1 = res.data.page.totalPages;
        res.data.list.forEach((item) => {
          this.textnum.push(item.num);
          this.probeTime.push(item.probeTime);
          this.textnotNum.push(item.notNum);
        });

        this.$nextTick(() => {
          this.drawLine();
        });
        this.loading = false;
      } else if (res.code == 500) {
        this.loading = false;
        this.$message(res.message);
      }
      // else {
      //   this.$message("无数据");

      // }
    },
    //重置
    async conerr() {
      this.tcboctime = null;
      this.textnum = [];
      this.probeTime = [];
      this.textnotNum = [];
      let bcTestVo = {
        url: this.url,
        startCreateTime: "",
        endCreateTime: "",
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
      };
      const { data: res } = await this.$http.post("/getBcTestEntity", bcTestVo);
      if (res.code == 200) {
        this.tableData1 = res.data.page.content;
        this.total1 = res.data.page.totalElements;
        this.totalPages1 = res.data.page.totalPages;
        res.data.list.forEach((item) => {
          this.textnum.push(item.num);
          this.probeTime.push(item.probeTime);
          this.textnotNum.push(item.notNum);
        });

        this.$nextTick(() => {
          this.drawLine();
        });
      } else if (res.code == 500) {
        this.loading = false;
        this.$message(res.message);
      }
      // else {
      //   this.$message("无数据");

      // }
    },
    //拨测 ————开始
    async starts(val) {
      const { data: res } = await this.$http.get("/getBcStart", {
        params: {
          id: val,
        },
      });
      if (res.code == 200) {
        // console.log(res.data);

        this.$message(res.message);
        this.boceclist();
      } else {
        this.$message(res.message);
      }
    },
    //拨测 ————暂停
    async end(val) {
      const { data: res } = await this.$http.get("/getBcEnd", {
        params: {
          id: val,
          operationState: 2,
        },
      });
      if (res.code == 200) {
        this.$message(res.data);
        this.boceclist();
      } else {
        this.$message(res.message);
      }
    },
    // 结束
    async end1(val) {
      const { data: res } = await this.$http.get("/getBcEnd", {
        params: {
          id: val,
          operationState: 3,
        },
      });
      if (res.code == 200) {
        this.$message(res.data);
        this.boceclist();
      } else {
        this.$message(res.message);
      }
    },
    // 删除
    async end2(val) {
      const { data: res } = await this.$http.get("/getBcEnd", {
        params: {
          id: val,
          operationState: 4,
        },
      });
      if (res.code == 200) {
        this.$message(res.data);
        this.boceclist();
      } else {
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
    timechange(val) {
      if (val && val != "") {
        this.whiteSearchList1.startCreateTime1 = val[0];
        this.whiteSearchList1.endCreateTime1 = val[1];
      } else {
        this.whiteSearchList1.startCreateTime1 = null;
        this.whiteSearchList1.endCreateTime1 = null;
      }
    },
    state_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.state = null;
      }
    },
    state_clearform(val) {
      if (val == "") {
        this.newdomainSimpleVo.form = null;
      }
    },
    sourceType_Operator(val) {
      if (val == "") {
        this.newdomainSimpleVo.Operator = null;
      }
    },
    sourceType_environment(val) {
      if (val == "") {
        this.newdomainSimpleVo.environment = null;
      }
    },
    state_clearurl(val) {
      if (val == "") {
        this.newdomainSimpleVo.url = null;
      }
    },
    sourceType_clearFun(val) {
      if (val == "") {
        this.addList.type = null;
      }
    },
    sourceType_type(val) {
      if (val == "") {
        this.newdomainSimpleVo.sourceType = null;
      }
    },
    state_url(val) {
      if (val == "") {
        this.newdomainSimpleVo.url = null;
      }
    },
    handleSizeChange(val) {
      // console.log(val);

      this.mypageable.pageSize = val;
      this.boceclist();
      //   this.getTabData();
    },
    handleCurrentChange(val) {
      //currentPage 改变时会触发
      console.log(val);

      this.mypageable.pageNum = val;

      this.boceclist();
      //   this.getTableData();
    },
    handleSelectionChange() {},
    handleClose1() {
      this.dialog = false;
    },
    handleCloseadd() {
      this.dialogadd = false;
    },
    handleCurrentChange1(val) {
      this.mypageable1.pageNum1 = val;
      this.bocexiangqing();
    },
    zP(val) {
      if (val == "dk") {
        return "贷款";
      } else if (val == "sd") {
        return "刷单";
      } else if (val == "gjf") {
        return "仿冒公检法";
      } else if (val == "gw") {
        return "网络购物";
      } else if (val == "qt") {
        return "其他类型诈骗";
      } else if (val == "gw") {
        return "网络购物";
      } else if (val == "jjgw") {
        return "冒充军警购物诈骗";
      } else if (val == "szp") {
        return "杀猪盘";
      } else if (val == "ds") {
        return "虚假购物/服务类";
      } else if (val == "jy") {
        return "网络婚恋/交友类";
      } else if (val == "zx") {
        return "虚假征信类";
      } else if (val == "mc") {
        return "冒充领导/熟人类";
      } else if (val == "yx") {
        return "网络游戏产品虚假交易类";
      } else if (val == "app") {
        return "分发平台";
      } else if (val == "xzym") {
        return "下载页面";
      }
    },
    ly(val) {
      if (val == "CA") {
        return "长安处置";
      } else if (val == "SY") {
        return "沈阳处置";
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.el-table::before {
  height: 0px;
}
// .el-table td, .el-table tr{
//   background-color: transparent !important;
// }
/deep/ .el-table__body tr:hover > td {
  background-color: #03112359 !important;
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
/deep/ .el-dialog__body {
  padding: 0 20px;
}
.gailan {
  width: 100%;
  height: 50rem /* 800/16 */;
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  h3 {
    margin-bottom: 10px;
  }
}
.gailanson {
  width: 100%;
  border: 1px solid;
  // height: 40px;
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  span {
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
}
.zhuzhuang {
  width: 100%;
  height: 30%;
  .zhuzhuang1 {
    width: 100%;
    height: 100%;
  }
}
.bottom1 {
  width: 100%;
  height: 2.75rem /* 60/16 */ /* 40/16 */;
  box-sizing: border-box;
  .ss1 {
    float: right;
    margin-right: 2.875rem /* 46/16 */;
  }
}
.dialogInfo /deep/ .el-table__row {
  height: 35px !important;
}
.wentitle {
  width: 100%;
  height: 30px;
  display: flex;
  line-height: 30px;
  margin-bottom: 15px;
}
.wen1 {
  flex: 1;
  font-size: 20px;
  color: #fff;
}
.el-table th,
.el-table tr {
  background-color: transparent !important;
}
/deep/ .el-date-editor--datetime {
  width: 23.5rem;
}
</style>