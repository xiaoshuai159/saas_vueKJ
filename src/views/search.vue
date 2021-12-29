<template>
<!-- 已完成 -->
  <div class="right_main_under">
    <!-- <h3>预警</h3>
    <el-divider></el-divider> -->
    <div class="warning">
      <el-badge :value="null" class="item">
        <el-button size="small">待下发</el-button>
      </el-badge>
      <el-badge :value="1" class="item">
        <el-button size="small">待反馈</el-button>
      </el-badge>
      <el-badge :value="2" class="item">
        <el-button size="small">已超时</el-button>
      </el-badge>
      <el-badge :value="1" class="item">
        <el-button size="small">目标未读</el-button>
      </el-badge>
    </div>
    <el-divider></el-divider>
    <div class="search_select_form">
      <template v-if="hiddenFormMore">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 创建时间 -->
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateValue_find"
              type="date"
              :change="find_change(dateValue_find)"
              placeholder="选择日期"
              align="right"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </el-form-item>
          <!-- 下发时间 -->
          <el-form-item label="下发时间">
            <el-date-picker
              v-model="dateValue_Issue"
              type="date"
              :change="Issue_change(dateValue_Issue)"
              placeholder="选择日期"
              value-format="yyyy-MM-dd "
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 受害人电话 -->
          <el-form-item label="受害人电话">
            <el-input
              v-model="domainSimpleVo.photo"
              placeholder="受害人电话"
            ></el-input>
          </el-form-item>
          <!-- 时长 -->
          <el-form-item label="时长">
            <el-input
              v-model="domainSimpleVo.time"
              placeholder="时长"
            ></el-input>
          </el-form-item>
          <!-- 类型 -->
          <el-form-item label="类型">
            <el-select
              v-model="domainSimpleVo.protocol"
              placeholder="类型"
              clearable
              @clear="protocol_clearFun"
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
          <!-- 来源 -->
          <el-form-item label="来源">
            <el-select
              v-model="domainSimpleVo.sourceType"
              placeholder="来源"
              clearable
              @clear="sourceType_clearFun"
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
          <!-- 危害等级 -->
          <el-form-item label="危害等级">
            <el-select
              v-model="domainSimpleVo.hazardlevel"
              placeholder="危害等级"
              clearable
              @clear="hazardlevel_clearFun"
            >
              <el-option
                v-for="item in selectData.hazardlevelTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 目标单位 -->
          <el-form-item label="目标单位">
            <el-select
              v-model="domainSimpleVo.targetunit"
              placeholder="目标单位"
              clearable
              @clear="targetunit_clearFun"
            >
              <el-option
                v-for="item in selectData.targetunitTypeData"
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
              v-model="domainSimpleVo.state"
              placeholder="状态"
              clearable
              @clear="state_clearFun"
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
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click="searchTabData"
              :loading="isLoading"
              v-prevent-click
              ><i class="el-icon-search el-icon--left"></i>查询</el-button
            >
            <el-button type="primary" size="mini" @click="resetFun"
              ><i class="el-icon-refresh el-icon--left"></i>重置</el-button
            >
            <el-button type="primary" size="mini" @click="resetFun"
              ><i class="el-icon-refresh el-icon--left"></i>模板下载</el-button
            >
            <el-button type="primary" size="mini" @click="resetFun"
              ><i class="el-icon-refresh el-icon--left"></i>上传</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="650px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="创建时间"
    
        prop="ip0"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="下发时间" prop="ip"> </el-table-column>
      <el-table-column label="电话" prop="ip1"> </el-table-column>
      <el-table-column label="时长" prop="ip2"> </el-table-column>
      <el-table-column label="类型" prop="ip3"> </el-table-column>
      <el-table-column label="来源" prop="ip4"> </el-table-column>
      <el-table-column label="等级" prop="ip5"> </el-table-column>
      <el-table-column label="下发单位" prop="ip6"> </el-table-column>
      <el-table-column label="状态" prop="ip7"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="success" size="mini" @click="dianchuli">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <div class="ss_l">
        <span><a href="#" class="pl">批量操作</a></span>
        <el-button size="mini" type="success">修改超时时间</el-button>
        <el-button size="mini" type="success">修改下发单位</el-button>
        <el-button size="mini" type="success">下发</el-button>
        <el-button size="mini" type="success">导出</el-button>
      </div>
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>
    <!-- //第一个弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialogInfo"
    >
     <template slot="title">
      <div style="color:#fff">处理</div>
    </template>
      <el-form
        size="mini"
        class="demo-form-inline"
        :label-position="labelPosition"
        label-width="80px"
      >
        <el-form-item class="itemcolor" label="创建时间" >
          <el-input v-model="chuli.ctime"></el-input>
        </el-form-item>

        <el-form-item label="下发时间" class="chang">
          <el-input v-model="chuli.xtime"></el-input>
        </el-form-item>

        <el-form-item label="电话" class="chang1">
          <el-input v-model="chuli.phone"></el-input>
        </el-form-item>

        <el-form-item label="时长" class="chang3">
          <el-input v-model="chuli.time"></el-input>
        </el-form-item>

        <el-form-item label="类型" class="chang2">
          <el-select v-model="chuli.region" placeholder="请选择">
            <el-option label="贷款" value="dk"></el-option>
            <el-option label="贷款二" value="dktwo"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="来源" class="chang2">
          <el-input v-model="chuli.lai"></el-input>
        </el-form-item>

        <el-form-item label="等级" class="chang2">
          <el-select v-model="chuli.dj" placeholder="请选择">
            <el-option label="高" value="g"></el-option>
            <el-option label="中" value="z"></el-option>
            <el-option label="低" value="d"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下发单位" class="chang">
          <el-select v-model="chuli.dw" placeholder="请选择">
            <el-option label="成都" value="cd"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" class="chang1">
          <el-input v-model="chuli.state"></el-input>
        </el-form-item>

        <span class="fan" @click="fankui">反馈结果</span>

        <div style="text-align: center">
          <el-button type="primary" @click="jies">接受</el-button>
          <el-button @click="ju">拒绝</el-button>
        </div>
        <!-- --------------------------- -->
        <div class="bt" v-if="dialog">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="primary" @click="quren" size="mini">确认</el-button>
          <el-button @click="close" size="mini">关闭</el-button>
        </div>
        <!-- --------------------------- -->
      </el-form>
    </el-dialog>
    <!-- //第二个弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibletwo"
      width="30%"
      :before-close="handleClosetwo"
      class="dialogInfo"
      top="30vh"
    >
    <template slot="title">
      <div style="color:#fff">反馈结果</div>
    </template>
      <el-table
        max-height="350px"
        :data="fankuilist"
        style="width: 100%"
        highlight-current-row="true"
        size="medium"
      >
        <el-table-column align="center" prop="date" label="序号" width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="处理方式"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" prop="address" label="结果" width="162">
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px">
        <el-button type="primary" size="mini">添加</el-button>
        <el-button type="primary" size="mini">确认</el-button>
        <el-button size="mini" @click="fankuiqu">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "search_bar",
  components: {},
  data() {
    return {
      dialog: false,
      dialogVisible: false,
      dialogVisibletwo: false,
      labelPosition: "right",
      chuli: {
        ctime: "",
        xtime: "",
        phone: "",
        time: "",
        state: "",
        region: "",
        dj: "",
        dw: "",
      },
      fankuilist: [{ date: "123", name: "qwe", address: "eqw" }],
      hiddenFormMore: true,
      dateValue_find: "",
      dateValue_Issue: "",
      dateValue_finish: "",
      dateValue_update: "",
      dateValue_issued: "",
      isLoading: false,
      formInline: {
        user: "",
        region: "",
      },
      domainSimpleVo: {
        domain: null,
        host: null,
        domainType: null,
        photo: null,
        modelType1: null,
        protocol: null,
        sourceType: null,
        hazardlevel: null,
        targetunit: null,
        state: null,
        time: null,
      },
      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },
      domainTimeVo: {
        startFindTime: null,
        endFindTime: null,
        startFinishTime: null,
        endFinishTime: null,
        startIssuedTime: null,
        endIssuedTime: null,
        startUpdateTime: null,
        endUpdateTime: null,
      },
      mypageable: {
        pageNum: 0,
        pageSize: 10,
      },
      total: 10,
      totalPages: 4,
      //下拉框的选项数据
      selectData: {
        accessSystemTypeData: [
          { value: "TGJ", label: "通管局" },
          { value: "DX", label: "电信" },
          { value: "YD", label: "移动" },
        ],
        feedbackStatusData: [
          { value: "SENDSUCCESS", label: "发送成功" },
          { value: "SENDFAILED", label: "发送失败" },
          { value: "RUNSUCCESS", label: "执行成功" },
          { value: "RUNFAILED", label: "执行失败" },
        ],
        domainTypeData: [
          { value: "ret", label: "发现（全部）" },
          { value: "confirm", label: "确认" },
          { value: "feedback ", label: "处置" },
        ],
        protocolData: [
          { value: "HTTP", label: "http" },
          { value: "HTTPS", label: "https" },
        ],
        sourceTypeData: [
          { value: "CA", label: "长安" },
          { value: "PG", label: "盘古" },
          { value: "XZ", label: "刑侦" },
        ],
        hazardlevelTypeData: [
          { value: "low", label: "低" },
          { value: "middle", label: "中" },
          { value: "high", label: "高" },
        ],
        targetunitTypeData: [{ value: "CD", label: "成都" }],
        stateTypeData: [
          { value: 1, label: "待下发" },
          { value: 2, label: "待反馈" },
          { value: 3, label: "已超时" },
          { value: 4, label: "目标未读" },
        ],
        model_typeData: [
          {
            value: "DK",
            label: "网络贷款",
            children: [
              { value: "M101", label: "代办信用卡、贷款类诈骗" },
              { value: "S101", label: "代办信用卡、贷款类诈骗" },
              { value: "T101", label: "代办信用卡、贷款类诈骗" },
              { value: "P101", label: "代办信用卡、贷款类诈骗" },

              { value: "dk", label: "网络贷款" },
              //刑侦
              { value: "dk100", label: "贷款、代办信用卡类诈骗" },
              { value: "dk101", label: "虚假征信" },
            ],
          },
          {
            value: "SD",
            label: "兼职刷单",
            children: [
              { value: "M104", label: "刷单类诈骗" },
              { value: "S104", label: "刷单类诈骗" },
              { value: "T104", label: "刷单类诈骗" },
              { value: "P104", label: "刷单类诈骗" },
              //长安
              { value: "sd", label: "兼职刷单" },
              //刑侦
              { value: "sd100", label: "刷单类诈骗" },
            ],
          },
          {
            value: "GJF",
            label: "冒充政府网站",
            children: [
              { value: "M106", label: "冒充公检法类诈骗" },
              { value: "S106", label: "冒充公检法类诈骗" },
              { value: "T106", label: "冒充公检法类诈骗" },
              { value: "P106", label: "冒充公检法类诈骗" },

              { value: "M113", label: "冒充政府网站诈骗" },
              { value: "S113", label: "冒充政府网站诈骗" },
              { value: "T113", label: "冒充政府网站诈骗" },
              { value: "P113", label: "冒充政府网站诈骗" },
              //长安
              { value: "gjf", label: "冒充政府网站" },
              //刑侦
              { value: "gif100", label: "冒充公检法" },
              { value: "gif101", label: "市场监管" },
              { value: "gif102", label: "冒充军警购物诈骗" },
              { value: "gif103", label: "补助、退税类诈骗" },
              { value: "gif104", label: "ETC" },
              { value: "gif105", label: "工商" },
            ],
          },
          {
            value: "LC",
            label: "投资理财",
            children: [
              { value: "M110", label: "投资理财诈骗-虚假赌博类" },
              { value: "S110", label: "投资理财诈骗-虚假赌博类" },
              { value: "T110", label: "投资理财诈骗-虚假赌博类" },
              { value: "P110", label: "投资理财诈骗-虚假赌博类" },

              { value: "M111", label: "投资理财诈骗-股票、期货交易类" },
              { value: "S111", label: "投资理财诈骗-股票、期货交易类" },
              { value: "T111", label: "投资理财诈骗-股票、期货交易类" },
              { value: "P111", label: "投资理财诈骗-股票、期货交易类" },

              { value: "M112", label: "投资理财诈骗-数字币类" },
              { value: "S112", label: "投资理财诈骗-数字币类" },
              { value: "T112", label: "投资理财诈骗-数字币类" },
              { value: "P112", label: "投资理财诈骗-数字币类" },
              //长安
              { value: "lc", label: "投资理财" },
              { value: "szp", label: "杀猪盘" },
              //刑侦
              { value: "lc100", label: "网络交友诱导赌博、投资诈骗" },
              { value: "lc101", label: "股票期货" },
              { value: "lc102", label: "赌博" },
              { value: "lc103", label: "虚拟币" },
            ],
          },
          {
            value: "GW",
            label: "网络购物",
            children: [
              { value: "P102", label: "冒充客服类诈骗" },
              { value: "T102", label: "冒充客服类诈骗" },
              { value: "S102", label: "冒充客服类诈骗" },
              { value: "M102", label: "冒充客服类诈骗" },

              { value: "M103", label: "游戏装备诈骗" },
              { value: "S103", label: "游戏装备诈骗" },
              { value: "T103", label: "游戏装备诈骗" },
              { value: "P103", label: "游戏装备诈骗" },

              { value: "M105", label: "游戏币、游戏点卡类诈骗" },
              { value: "S105", label: "游戏币、游戏点卡类诈骗" },
              { value: "T105", label: "游戏币、游戏点卡类诈骗" },
              { value: "P105", label: "游戏币、游戏点卡类诈骗" },

              { value: "M107", label: "冒充购物客服退款类诈骗" },
              { value: "S107", label: "冒充购物客服退款类诈骗" },
              { value: "T107", label: "冒充购物客服退款类诈骗" },
              { value: "P107", label: "冒充购物客服退款类诈骗" },

              { value: "M108", label: "虚假网站、链接类诈骗" },
              { value: "S108", label: "虚假网站、链接类诈骗" },
              { value: "T108", label: "虚假网站、链接类诈骗" },
              { value: "P108", label: "虚假网站、链接类诈骗" },

              { value: "M109", label: "虚假购物消费类诈骗" },
              { value: "S109", label: "虚假购物消费类诈骗" },
              { value: "T109", label: "虚假购物消费类诈骗" },
              { value: "P109", label: "虚假购物消费类诈骗" },
              //长安
              { value: "kf", label: "客服类诈骗" },
              //刑侦
              { value: "gw100", label: "其他购物消费" },
              { value: "gw101", label: "虚假服务" },
              { value: "gw102", label: "低价购物" },
              { value: "gw103", label: "假冒代购" },
              { value: "gw104", label: "虚假购物消费诈骗" },
              { value: "gw105", label: "银行" },
              { value: "gw106", label: "虚假购物消费" },
              { value: "gw107", label: "支付宝" },
              { value: "gw108", label: "电商物流客服" },
              { value: "gw109", label: "虚假购物" },
              { value: "gw110", label: "游戏币、游戏点卡诈骗" },
            ],
          },
        ],
      },
      tableData: [
        {
          ip0: "1",
          ip: "1",
          ip1: "1",
          ip2: "1",
          ip3: "1",
          ip4: "1",
          ip5: "1",
          ip6: "1",
          ip7: "1",
        },
        {
          ip0: "1",
          ip: "1",
          ip1: "1",
          ip2: "1",
          ip3: "1",
          ip4: "1",
          ip5: "1",
          ip6: "1",
          ip7: "1",
        },
        {
          ip0: "1",
          ip: "1",
          ip1: "1",
          ip2: "1",
          ip3: "1",
          ip4: "1",
          ip5: "1",
          ip6: "1",
          ip7: "1",
        },
      ],
      currentPage: 1,
    };
  },
  created() {
    // this.getTabData();
  },

  methods: {
    //初始化获取数据
    // async getTabData() {
    //   let seniorData = {
    //     domainFeedbackVo: this.domainFeedbackVo,
    //     domainSimpleVo: this.domainSimpleVo,
    //     domainTimeVo: this.domainTimeVo,
    //     mypageable: this.mypageable,
    //   };
    //   const { data: res } = await this.$http.post(
    //     "/domain/getDomain",
    //     seniorData
    //   );
    //   if (res.code == 200) {
    //     this.tableData = [];
    //     if (res.data.content) {
    //       this.tableData = res.data.content;
    //       this.total = res.data.totalElements;
    //       this.totalPages = res.data.totalPages;
    //     }
    //   } else {
    //     this.$message.error("查询错误！");
    //   }
    //   //加载无论成功与否，都要去掉loading
    //   this.isLoading = false;
    // },

    // 批量
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //重置方法
    resetFun() {
      this.domainSimpleVo = {
        domain: null,
        domainType: null,
        photo: null,
        modelType1: null,
        protocol: null,
        sourceType: null,
      };
      this.domainFeedbackVo = {
        accessSystemType: null,
        feedbackStatus: null,
      };
      this.domainTimeVo = {
        endFindTime: null,
        endFinishTime: null,
        endIssuedTime: null,
        endUpdateTime: null,
        startFindTime: null,
        IssueFindTime: null,
        startFinishTime: null,
        startIssuedTime: null,
        startUpdateTime: null,
      };
    },
    //下载
    async downloadInfo() {
      let seniorData = {
        domainFeedbackVo: this.domainFeedbackVo,
        domainSimpleVo: this.domainSimpleVo,
        domainTimeVo: this.domainTimeVo,
        mypageable: this.mypageable,
      };

      const { data: res } = await this.$http.post(
        "/domain/downloadDomain",
        seniorData
      );
      if (res.code == 200) {
        //
        // window.location.href = res.expandData.url
        // window.open(URL)

        let url = res.expandData.url;
        // var a = document.createElement('a');
        // const hostname = document.location.hostname
        // // const down = window.location.origin
        // // a.href =`${down}/task/download_file/?task_id=${id}&is_login=true`
        // // a.href =`localhost:8080${url}`
        // a.href =`${url}`
        // a.click();

        // debugger
        // const down = window.location.origin
        // let down = BASE_URL

        let eleLink = document.createElement("a");
        eleLink.download = name;
        eleLink.href = url;
        eleLink.click();
        eleLink.remove();
      }
    },
    handleSizeChange(val) {
      this.mypageable.pageSize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val - 1;
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

    protocol_clearFun(val) {
      this.domainSimpleVo.protocol = null;
    },
    sourceType_clearFun(val) {
      this.domainSimpleVo.sourceType = null;
    },
    hazardlevel_clearFun(val) {
      this.domainSimpleVo.sourceType = null;
    },
    targetunit_clearFun(val) {
      this.domainSimpleVo.hazardlevel = null;
    },
    state_clearFun(val) {
      this.domainSimpleVo.state = null;
    },
    modelType1_clearFun(val) {
      this.domainSimpleVo.modelType1 = null;
    },
    searchTabData() {},
    //格式化数据
    formatType(row, column) {
      var data = row[column.property];
      // var data = row["domainEntity"]['model_type1'];
      if (data == undefined) {
        return "";
      } else {
        let arr = this.selectData.model_typeData;
        if (column.property == "model_type1") {
          for (let i = 0; i < arr.length; i++) {
            if (data == arr[i].value) {
              return arr[i].label;
            }
          }
        }
        if (column.property == "model_type2") {
          //获取父类
          let father = row["model_type1"];
          for (let i = 0; i < arr.length; i++) {
            if (father == arr[i].value) {
              let childArr = arr[i].children;
              for (let j = 0; j < childArr.length; j++) {
                if (data == childArr[j].value) {
                  return childArr[j].label;
                }
              }
            }
          }
        }
      }
    },
    // ============================================
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          this.dialog = false;
          done();
        })
        .catch((_) => {});
    },
    handleClosetwo(done) {
       this.$confirm("确认关闭？")
        .then((_) => {
             this.dialogVisibletwo = false;
          done();
        })
        .catch((_) => {});
  
    },
    // 处理
    dianchuli() {
      this.dialogVisible = true;
    },
    jies() {
      this.dialog = true;
    },
    ju() {
      this.dialogVisible = false;
      this.dialog = false;
    },
    quren() {
      this.dialogVisible = false;
      this.dialog = false;
    },
    close() {
      this.dialogVisible = false;
      this.dialog = false;
    },
    // ==========================反馈结果
    fankui() {
      this.dialogVisible = false;
      this.dialog = false;
      this.dialogVisibletwo = true;
    },
    fankuiqu() {
      this.dialogVisibletwo = false;
    },
    // ============================
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

<style scoped   lang='less'>
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #03112359;
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
  margin-top:1rem ;
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
.chang {
  width: 28.125rem; /* 450/16 */
}
.chang1 {
  width: 15.625rem; /* 250/16 */ /* 200/16 */ /* 450/16 */
}
.chang3 {
  width: 12.5rem; /* 200/16 */ /* 250/16 */ /* 200/16 */ /* 450/16 */
}
.chang2 {
  width: 9.375rem /* 150/16 */ /* 100/16 */ //* 400/16 */;;
}
.left {
  float: left;
}
.right {
  float: right;
}
.bt {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.fan {
  font-size: 15px;
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
}
.el-dialog__header{
  color: #fff;
}
.itemcolor{
color:#fff
}
</style>
