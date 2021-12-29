<template>
  <div class="right_main_under">
    <div class="topOne">
      <span>处置单位：</span>
      <el-select
        v-model="accessSystemType"
        placeholder="处置单位"
        size="mini"
        @change="changeAccessSystemType"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="getAllocate"
        icon="el-icon-coin"
      >配置策略</el-button>
      <el-button
        class="addAllocate"
        type="success"
        size="mini"
        @click="downTemplate"
        icon="el-icon-download"
      >下载模板</el-button>
      <!-- on-exceed超出限制 -->
      <el-upload
        action="/strategy/uploadDomain"
        accept=".csv"
        :data="{accessSystemType:accessSystemType}"
        :before-remove="beforeRemove"
        :on-success="successSendFile"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        class="upload_demo addAllocate"
      >
        <el-button size="mini" type="success" icon="el-icon-upload2">点击上传</el-button>
      </el-upload>
    </div>
    <div class="topTwo">
      <!-- 【改】 -->
      <!-- <span>URL：</span> -->
      <span>域名：</span>
      <!-- <el-input placeholder="请输入URL" v-model="domainSearch.url" clearable size="mini"></el-input> -->
      <el-input placeholder="请输入域名" v-model="domainSearch.url" clearable size="mini"></el-input>
      <span class="addAllocate" v-if="accessSystemType == 'DX'">IP：</span>
      <el-input
        placeholder="请输入IP"
        v-model="domainSearch.ip"
        clearable
        size="mini"
        v-if="accessSystemType == 'DX'"
      ></el-input>
      <!--【改】 以下隐藏 -->
      <!-- <span class="addAllocate" v-if="accessSystemType != 'DX'">HOST：</span>
      <el-input
        placeholder="请输入HOST"
        v-model="domainSearch.host"
        v-if="accessSystemType != 'DX'"
        clearable
        size="mini"
      ></el-input> -->
      <span class="addAllocate">返回状态：</span>
      <el-select v-model="domainSearch.feedbackStatus" clearable placeholder="返回状态" size="mini">
        <el-option
          v-for="item in feedbackStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="addAllocate" v-if="accessSystemType != 'DX'">发送时间段：</span>
      <el-date-picker
        v-model="dateSendTime"
        type="datetimerange"
        :change="dataCreate_change(dateSendTime)"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right"
        size="mini"
        v-if="accessSystemType != 'DX'"
      ></el-date-picker>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="clearSearch"
        icon="el-icon-close"
      >重置</el-button>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="searchList"
        icon="el-icon-search"
      >查询</el-button>
    </div>
    <!-- 列表 电信列表 -->
    <el-table
      :data="feedbackList"
      style="width: 100%"
      max-height="680px"
      size="mini"
      class="tableStyle"
      @cell-dblclick="copy"
      v-if="accessSystemType == 'DX'"
      key="1"
    >
      <el-table-column prop="url" label="URL" show-overflow-tooltip min-width="220"></el-table-column>
      <el-table-column prop="ip" label="IP"></el-table-column>
      <el-table-column prop="executeTime" label="首次下发时间"></el-table-column>
      <el-table-column prop="lastTime" label="最新状态更新时间"></el-table-column>
      <el-table-column prop="expireTime" label="处置结束时间"></el-table-column>
      <el-table-column prop="feedbackStatus" label="返回状态">
        <template scope="scope">
          <span
            style="color:green"
            v-if="scope.row.feedbackStatus == 'SENDSUCCESS'||scope.row.feedbackStatus == 'RUNSUCCESS'"
            key="11"
          >●&nbsp;</span>
          <span style="color:red" v-else>●&nbsp;</span>
          {{ scope.row.feedbackStatus | toStatus }}
        </template>
      </el-table-column>
      <el-table-column prop="errorMsg" label="失败原因" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 通管局&移动列表 -->
    <el-table
      :data="feedbackList"
      style="width: 100%"
      max-height="680px"
      size="mini"
      class="tableStyle"
      @cell-dblclick="copy"
      v-else
    >
    <!-- 【改：新增域名】 -->
      <!-- <el-table-column prop="url" label="URL" show-overflow-tooltip min-width="220"></el-table-column>
      <el-table-column prop="host" label="HOST" show-overflow-tooltip min-width="180"></el-table-column> -->
      <el-table-column prop="url" label="域名" show-overflow-tooltip min-width="220"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间"></el-table-column>
      <el-table-column prop="feedbackStatus" label="返回状态">
        <template scope="scope">
          <span
            style="color:green"
            v-if="scope.row.feedbackStatus == 'SENDSUCCESS'||scope.row.feedbackStatus == 'RUNSUCCESS'"
            key="22"
          >●&nbsp;</span>
          <span style="color:red" v-else>●&nbsp;</span>
          {{ scope.row.feedbackStatus | toStatus }}
        </template>
      </el-table-column>
    </el-table>
    <div class="ss">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagePagination pageRight"
        v-if="pageshow"
      ></el-pagination>
    </div>

    <!-- 弹框 -->
    <el-dialog title="配置策略" :visible.sync="dialogFormVisible" class="dialogInfo">
      <el-form :model="form" class="demo-form-inline" size="mini">
        <el-form-item label="处置单位：" :label-width="formLabelWidth">
          <el-select v-model="form.accessSystemType" placeholder="暂不提供选择功能" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="诈骗类型：" :label-width="formLabelWidth">
          <el-select v-model="form.modelType1" placeholder="请选择诈骗类型(可多选)" multiple>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议类型：" :label-width="formLabelWidth">
          <el-select v-model="form.protocol" placeholder="请选择协议类型(可多选)" multiple>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源类型：" :label-width="formLabelWidth">
          <el-select v-model="form.sourceEnums" placeholder="请选择来源类型(可多选)" multiple>
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处置范围：" :label-width="formLabelWidth" v-if="accessSystemType == 'TGJ'">
          <el-select v-model="form.scope" placeholder="请选择处置范围(可多选)" multiple>
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建时间：" :label-width="formLabelWidth">
          <el-input placeholder="  - -  " v-model="form.createDate" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="推送次数：" :label-width="formLabelWidth">
          <el-input placeholder="  - -  " v-model="form.pushNum" :disabled="true"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearForm()" size="mini">清 除</el-button>
        <el-button type="primary" @click="saveAllocate" size="mini">保 存</el-button>
        <!-- <el-button type="primary" @click="sava" size="mini">保 存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "allocate",
  components: {},
  data() {
    return {
      pageshow: true,
      options: [
        //处置单位  【改：新增长安】
         {
          value: "CA",
          label: "长安",
        },
        {
          value: "TGJ",
          label: "上海通管局",
        },
        {
          value: "DX",
          label: "上海电信",
        },
        {
          value: "YD",
          label: "上海移动",
        },
      ],
      options1: [
        //模型大类 [ DK, SD, GJF, SZP, LC, KF, YXZB, YXDK, GWTK, GWLJ, GWXF ]
        {
          value: "DK",
          label: "贷款",
        },
        {
          value: "SD",
          label: "刷单",
        },
        {
          value: "GJF",
          label: "冒充政府网站",
        },
        // {
        //   value: "SZP",
        //   label: "XXX-SZP",
        // },
        {
          value: "LC",
          label: "投资理财",
        },

        {
          value: "GW",
          label: "网络购物",
        },
        // {
        //   value: "YXZB",
        //   label: "XXX-YXZB",
        // },
        // {
        //   value: "YXDK",
        //   label: "XXX-YXDK",
        // },
        // {
        //   value: "GWTK",
        //   label: "XXX-GWTK",
        // },
        // {
        //   value: "GWLJ",
        //   label: "XXX-GWLJ",
        // },
        // {
        //   value: "GWXF",
        //   label: "XXX-GWXF",
        // },
      ],
      options2: [
        //协议类型
        {
          value: "HTTP",
          label: "HTTP",
        },
        {
          value: "HTTPS",
          label: "HTTPS",
        },
      ],
      options3: [
        //数据来源 CA 长安 PG 盘古 XZ 刑侦 WA 网安
        {
          value: "CA",
          label: "长安",
        },
        {
          value: "PG",
          label: "盘古",
        },
        {
          value: "XZ",
          label: "刑侦",
        },
        // {
        //   value: "WA",
        //   label: "网安",
        // },
      ],
      options4: [
        //处置范围
        {
          value: "1",
          label: "url",
        },
        {
          value: "5",
          label: "host",
        },
      ],
      feedbackStatus: [
        //发送成功、发送失败、执行成功、执行失败
        {
          value: "SENDSUCCESS", //1
          label: "发送成功",
        },
        {
          value: "SENDFAILED", //2
          label: "发送失败",
        },
        {
          value: "RUNSUCCESS", //3
          label: "执行成功",
        },
        {
          value: "RUNFAILED", //4
          label: "执行失败",
        },
        {
          value: "RUNFAILED1", //5
          label: "已在处置中",
        },
        {
          value: "RUNFAILED2", //6
          label: "处置超上限",
        },
        {
          value: "RUNFAILED3", //7
          label: "处置未上线",
        },
        {
          value: "RUNFAILED4", //8
          label: "缺少必填参数",
        },
        {
          value: "RUNFAILED5", //9
          label: "URL无domain",
        },
      ],
      // accessSystemType: "RUNFAILED ",
      // accessSystemType: "YD", 【改】
      accessSystemType: "CA",
      // 【改】
      // feedbackList: [],
      feedbackList: [
        {url:'https://www.yixianggou.top',
        sendTime:'2021-03-24 08:14:00',
        feedbackStatus:'RUNSUCCESS'
        }
      ],
      pageSize: 10,
      pageNum: 0, //请求页码
      currentPage: 1, //分页页码
      currentPage_YD: 0,  //页码从0开始
      currentPage_DX: 0,
      currentPage_TGJ: 0,
      total: 1,
      // 弹框
      dialogFormVisible: false,
      form: {
        id: 0,
        accessSystemType: "", //处置单位
        modelType1: [], //诈骗类型
        protocol: [], //协议类型
        sourceEnums: [], //来源类型
        scope: [], //处置范围
      },
      formLabelWidth: "10rem",
      domainSearch: {
        //获取列表
        url: "",
        ip: "",
        host: "",
        feedbackStatus: null,
        startSendTime: "",
        endSendTime: "",
      },
      dateSendTime: [],
    };
  },
  filters: {
    toStatus: function (value) {
      var status = "";
      switch (value) {
        case "SENDSUCCESS": //1
          status = "发送成功";
          break;
        case "SENDFAILED": //2
          status = "发送失败";
          break;
        case "RUNSUCCESS": //3
          status = "执行成功";
          break;
        case "RUNFAILED": //4
          status = "执行失败";
          break;
        case "RUNFAILED1": //5
          status = "已在处置中";
          break;
        case "RUNFAILED2": //6
          status = "处置超上限";
          break;
        case "RUNFAILED3": //7
          status = "处置未上线";
          break;
        case "RUNFAILED4": //8
          status = "缺少必填参数";
          break;
        default:
          status = "URL无domain"; //9
          break;
      }
      return status;
    },
  },
  created() {
    // 【改】
    // this.getTabData();
  },
  methods: {
    //获取策略
    async getAllocate() {
        this.dialogFormVisible = true;

      let accessSystemType = {
        accessSystemType: this.accessSystemType,
      };
      const { data: res } = await this.$http.post(
        "/strategy/getStrategy",
        accessSystemType
      );
      if (res.code == 200) {
        // this.form = res.data;
        this.form = this.transFormToRes(res.data);
        this.dialogFormVisible = true;
      } else {
        this.$message({
          message: "获取策略失败",
          type: "warning",
        });
      }
    },
    transFormToRes(res) {
      //获取的字符转换为数组，进行显示
      let form = {
        id: res.id,
        accessSystemType: res.accessSystemType,
        modelType1:
          res.modelType1 == null || res.modelType1 == ""
            ? []
            : res.modelType1.split(","),
        protocol:
          res.protocol == null || res.protocol == ""
            ? []
            : res.protocol.split(","),
        sourceEnums:
          res.sourceEnums == null || res.sourceEnums == ""
            ? []
            : res.sourceEnums.split(","),
        scope: res.scope == null || res.scope == "" ? [] : res.scope.split(","),
      };
      return form;
    },
    transFormToReq() {
      //选好的数组转为字符串，进行请求
      let form1 = {
        id: this.form.id,
        accessSystemType: this.form.accessSystemType,
        modelType1: this.form.modelType1.toString(),
        protocol: this.form.protocol.toString(),
        sourceEnums: this.form.sourceEnums.toString(),
        scope: this.form.scope.toString(),
      };
      return form1;
    },
    async saveAllocate() {
      const { data: res } = await this.$http.post(
        "/strategy/saveSendStrategy",
        // this.form
        this.transFormToReq()
      );
      if (res.code == 200) {
        this.dialogFormVisible = false;
        this.$message({
          message: "保存策略成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "保存策略失败。" + res.message,
          type: "warning",
        });
      }
    },
    // 下载模板
    async downTemplate() {
      let accessSystemType = {
        accessSystemType: this.accessSystemType,
      };
      const { data: res } = await this.$http.post(
        "/strategy/downloadTemplate",
        accessSystemType
      );
      if (res.code == 200) {
        let url = res.expandData.url;
        let eleLink = document.createElement("a");
        eleLink.download = name;
        eleLink.href = url;
        eleLink.click();
        eleLink.remove();
      }
    },
    //初始化获取数据
    async getTabData() {
      if (this.accessSystemType == "YD") {
        this.pageNum = this.currentPage_YD;
      } else if (this.accessSystemType == "DX") {
        this.pageNum = this.currentPage_DX;
      } else if (this.accessSystemType == "TGJ") {
        this.pageNum = this.currentPage_TGJ;
      }
      this.currentPage = this.pageNum + 1;

      let feedbackList = {
        // // domainFeedbackVo: {
        // url: this.domainSearch.url,
        // ip: this.domainSearch.ip,
        // host: this.domainSearch.host,
        // feedbackStatus:
        //   this.domainSearch.feedbackStatus == "" ||
        //   this.domainSearch.feedbackStatus == null
        //     ? (this.domainSearch.feedbackStatus = null)
        //     : this.domainSearch.feedbackStatus,
        // accessSystemType: this.accessSystemType,
        // // },
        ...this.domainSearch,
        mypageable: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      };
      feedbackList.feedbackStatus =
        this.domainSearch.feedbackStatus == "" ||
        this.domainSearch.feedbackStatus == null
          ? (this.domainSearch.feedbackStatus = null)
          : this.domainSearch.feedbackStatus;
      feedbackList.accessSystemType = this.accessSystemType;
      const { data: res } = await this.$http.post(
        "/strategy/feedbackList",
        feedbackList
      );
      if (res.code == 200) {
        this.feedbackList = [];
        if (res.data.content) {
          this.feedbackList = res.data.content;
          this.total = res.data.totalElements;
        }
      } else {
        this.$message.error("查询错误！");
        this.feedbackList = [];
      }
      this.pageshow = false; //让分页隐藏
      this.$nextTick(() => {
        //重新渲染分页
        this.pageshow = true;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      if (this.accessSystemType == "YD") {
        // this.pageNum = val - 1;
        this.currentPage_YD = val - 1;
      } else if (this.accessSystemType == "DX") {
        // this.pageNum = val - 1;
        this.currentPage_DX = val - 1;
      } else if (this.accessSystemType == "TGJ") {
        // this.pageNum = val - 1;
        this.currentPage_TGJ = val - 1;
      }
      this.getTabData();
    },
    changeAccessSystemType() {
      if (this.accessSystemType == "YD") {
        this.pageNum = this.currentPage_YD;
      } else if (this.accessSystemType == "DX") {
        this.pageNum = this.currentPage_DX;
      } else if (this.accessSystemType == "TGJ") {
        this.pageNum = this.currentPage_TGJ;
      }
      this.currentPage = this.pageNum + 1;
      this.getTabData();
    },
    searchList() {
      if (this.accessSystemType == "YD") {
        this.currentPage_YD = 0;
      } else if (this.accessSystemType == "DX") {
        this.currentPage_DX = 0;
      } else if (this.accessSystemType == "TGJ") {
        this.currentPage_TGJ = 0;
      }
      this.getTabData();
      // this.clearSearch();
    },
    //
    clearForm() {
      this.form = {
        id: this.form.id,
        accessSystemType: this.accessSystemType, //处置单位
        modelType1: [], //模型大类
        protocol: [], //协议类型
        sourceEnums: [], //来源类型
        scope: [], //处置范围
      };
    },
    clearSearch() {
      this.domainSearch = {
        url: "",
        ip: "",
        host: "",
        feedbackStatus: null,
        startSendTime: "",
        endSendTime: "",
      };
      this.dateSendTime = [];
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successSendFile(res) {
      if (res.code == 200) {
        this.$message.success("上传成功");
      } else {
        this.$message.warning("上传失败");
      }
    },
    dataCreate_change(val) {
      if (val && val != "") {
        this.domainSearch.startSendTime = val[0];
        this.domainSearch.endSendTime = val[1];
      } else {
        this.domainSearch.startSendTime = "";
        this.domainSearch.endSendTime = "";
      }
    },
    copy(row, column, cell, event) {
      if (
        column.property == "url" ||
        column.property == "ip" ||
        column.property == "host"
      ) {
        var oInput = document.createElement("input");
        oInput.value = row.url;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: "复制成功",
          type: "success",
        });
        oInput.remove();
      }
    },
  },
};
</script>

<style  scoped lang='less'>
.addAllocate {
  margin-left: 0.625rem;
}
.topOne,
.topTwo {
  color: #bfcbd9;
  font-size: 14px;
  margin-bottom: 0.8rem;
  .el-input {
    width: 12rem;
  }
}
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
/deep/.el-date-editor .el-range-input,
/deep/.el-date-editor .el-range-separator {
  background-color: #254965;
  color: #c0c4cc;
}
/deep/.el-date-editor--datetimerange.el-input__inner {
  width: 19.625rem;
}

/deep/.el-date-editor .el-range-input {
  color: #fdf6ec;
}
</style>
