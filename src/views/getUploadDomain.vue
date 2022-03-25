<template>
  <div class="right_main_under">
    <!-- 统计图表 -->

    <div class="search_select_form">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
          enctype="multipart/form-data"
        >
          <!-- 上传人 -->
          <el-form-item label="上传人">
            <el-input
              v-model="newdomainSimpleVo.uploadPerson"
              placeholder="上传人"
            ></el-input>
          </el-form-item>
          <!-- 上传时间 -->
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find"
              type="daterange"
              :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="mini"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 上传来源 -->
          <el-form-item label="上传来源">
            <el-select
              v-model="newdomainSimpleVo.modelType1"
              placeholder="上传来源"
              clearable
              @clear="modelType1_clearFun(newdomainSimpleVo.modelType1)"
            >
              <el-option
                v-for="item in selectData.moban_typeData"
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
              @click.native.stop="searchTabData"
              v-prevent-click
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click.native="resetFun"
              >重置</el-button
            >
            <el-button type="primary" size="mini" @click.native="xiazai"
              >模板下载</el-button
            >
            <el-button type="primary" size="mini" @click.native="uploadwj"
              >上传</el-button
            >
            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>

    <!-- //列表 -->
    <el-table
      :row-class-name="tableRowClassName"
      :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      height="calc(100% - 18%)"
      size="mini"
      class="tableStyle"
    >
      <el-table-column label="上传人" prop="uploader"> </el-table-column>
      <el-table-column
        label="上传来源"
        prop="data_source"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column label="上传时间" prop="upload_time"> </el-table-column>
      <el-table-column label="条数" prop="total"> </el-table-column>
    </el-table>

    <!-- //分页 -->
    <div class="bottom">
      <div class="ss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="mypageable.pageNum"
          :page-sizes="[15, 30, 45]"
          :page-size="mypageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="pagePagination pageRight"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 模板下载 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="loadingbuttext"
      :visible.sync="mobanxiazai"
      width="20%"
      height="40%"
      :before-close="mobanshangchuanclose"
      class="dialogInfo"
    >
      <div style="width: 100%">
        <el-form size="mini">
          <el-select
            v-model="listTemplate.moban"
            placeholder="选择模板类型"
            clearable
            @clear="mobanxuanze_clearFun(listTemplate.moban)"
          >
            <el-option
              v-for="item in selectData.moban"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="mobanxiazai = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="mobanerr" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 上传 -->
    <el-dialog
      :close-on-click-modal="false"
      title="文件上传"
      
      :visible.sync="shangchuan"
      width="20%"
      height="40%"
      :before-close="shangchuanclose"
      class="dialogInfo"
    >
      <div style="width: 100%">
        <el-upload
          class="upload-demo"
          accept=".xlsx"
          action="/black/uploadDomain"
          :data="{ User: this.use }"
          :before-remove="beforeRemove"
          :on-success="successSendFile"
          :on-exceed="handleExceed"
          multiple
          :limit="3"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传文件</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shangchuan = false" size="mini"
          >取 消</el-button
        >
        <!-- <el-button type="primary" @click="wenjianshangchaun" size="mini"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import getRole from "@/utils/promission.js";
export default {
  name: "search",

  data() {
    return {
      loadingbuttext: "模板下载",
      loadingbut: false,
      shangchuan: false,
      mobanxiazai: false,
      jieURL: "",
      jietu1: "",
      newxinjietu: "",
      whiteSearchList1: {
        startCreateTime1: "",
        endCreateTime1: "",
      },
      isLoading: false,
      isShow: false,
      whiteSearchList: {
        startUploadTime: "",
        endUploadTime: "",
      },

      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: "",
        region: "",
      },
      newdomainSimpleVo: {
        dateValue_find: null, //上传时间
        modelType1: null, //上传来源
        mobanType1: null,
        uploadPerson: null, //上传人
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
        pageNum: 1,
        pageSize: 15,
      },
      total: 1,
      totalPages: "",
      //下拉框的选项数据
      selectData: {
        protocolData: [
          { value: "HTTP", label: "HTTP" },
          { value: "HTTPS", label: "HTTPS" },
        ],

        stateTypeData: [
          { value: 0, label: "处置中" },
          { value: 1, label: "已处置" },
        ],
        model_typeData: [
          { value: "DK", label: "贷款代办信用卡类" },
          { value: "SD", label: "刷单返利类" },
          { value: "GJF", label: "冒充公检法及政府机关类" },
          { value: "LC", label: "投资理财" },
          { value: "GW", label: "网络购物" },
          { value: "QT", label: "其他类型" },
          { value: "KF", label: "冒充电商客服类" },
          { value: "JJGW", label: "冒充军警购物诈骗" },
          { value: "SZP", label: "杀猪盘" },
          { value: "DS", label: "虚假购物、服务类" },
          { value: "JY", label: "网络婚恋、交友类（非杀猪盘类）" },
          { value: "ZX", label: "虚假征信类" },
          { value: "MC", label: "冒充领导、熟人类" },
          { value: "YX", label: "网络游戏产品虚假交易类" },
          { value: "APP_FF", label: "分发平台(APP签名分发)" },
          { value: "XZYM", label: "下载页面(带二维码的下载链接)" },
          { value: "OTHER", label: "其他类型诈骗" },
        ],
        moban_typeData: [
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
        ],
        authorize: [
          { value: 0, label: "未授权" },
          { value: 1, label: "已授权" },
        ],
        moban: [
          {
            value: "CA",
            label: "长安通信",
          },
          {
            value: "GA",
            label: "公安部",
          },
          {
            value: "YD",
            label: "移动公司",
          },
          {
            value: "NS",
            label: "瑞斯",
          },
          {
            value: "qt",
            label: "各个分局的涉案网址",
          },
        ],
      },

      tableData: [],
      listTemplate: {
        moban: null,
      },
      tableDatalist: [],
      currentPage: 1,
      newurl: "",
      use: "",

      // echars
      categoryArray: [{ name: "上传URL" }, { name: "处置URL" }],
      testData: [],
      testLink: [],
      testLink1: [],
      qutest: [],
      qutest1: [],
      qutest2: [],

      whole: 0,
      file: [],
    };
  },

  created() {
    this.getTabData();
  },
  mounted() {
    this.use = JSON.parse(window.sessionStorage.getItem("one"));

    // this.drawLine();
  },
  methods: {
    // 文件上传
    successSendFile(res) {
      // this.loading=true
      if (res.code == 200) {
        // setTimeout(() => {
        this.$message.success("上传成功");

        //   this.getTabData()
        // }, 1000)
      } else {
        this.$message(res.message);
      }
    },
    //删除
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 文件上传
    //模板下载
    xiazai() {
      this.listTemplate.moban = null;
      this.mobanxiazai = true;
    },
    uploadwj() {
      // this.listTemplate.moban = null;
      this.file = [];
      this.shangchuan = true;
    },
    getRole1(data) {
      return getRole(data);
    },

    eldialogout() {
      this.testData = [];
      this.testLink1 = [];
      this.isShow = false;
      this.$refs.multipleTable.clearSelection(); //清除选中的数据
    },
    getRowKeys(row) {
      return row.id;
    },
    //初始化获取数据
    async getTabData() {
      let mypageable = {
        dataSource: this.newdomainSimpleVo.modelType1,
        endDate: this.whiteSearchList.endUploadTime,
        mypageable: this.mypageable,
        startDate: this.whiteSearchList.startUploadTime,
        uploader: this.newdomainSimpleVo.uploadPerson,
      };

      const { data: res } = await this.$http.post(
        "/black/obtainUploadList",
        mypageable
      );
      if (res.code == 200) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      }
    },
    //查询
    async searchTabData() {
      this.mypageable.pageNum = 1;
      this.getTabData();
    },
    //重置方法
    //点击重置无反应
    resetFun() {
      this.newdomainSimpleVo = {
        uploadPerson: null, //上传人
        modelType1: null, //上传来源
        dateValue_find: null, //处置时间
      };
      (this.whiteSearchList = {
        startUploadTime: null,
        endUploadTime: null,
      }),
        (this.mypageable.pageNum = 1);
      this.getTabData();
    },
    // handleSelectionChange(val) {
    //   this.tableDatalist = val;
    // },

    //弹窗关闭

    handleClose() {
      this.isShow = false;
      this.$refs.multipleTable.clearSelection(); //清除选中的数据
    },

    mousedown() {
      // console.log(data.name);
    },
    //模板下载
    // async put() {
    //   this.loadingbuttext = "...加载中";
    //   this.loadingbut = true;
    //   const { data: res } = await this.$http.post(
    //     "/treatment/downloadTemplate"
    //   );
    //   // console.log(res);
    //   if (res.code == 200) {
    //     this.loadingbuttext = "模板下载";
    //     this.loadingbut = false;
    //     let newurl = res.expandData.url;
    //     let eleLink = document.createElement("a");
    //     eleLink.download = name;
    //     eleLink.href = newurl;
    //     eleLink.click();
    //     eleLink.remove();
    //   } else {
    //     this.$message(res.message);
    //   }
    // },
    // 模板下载
    async moban_typewen() {
      if (this.listTemplate.moban == null) {
        this.$message("请选择");
      } else {
        let list = {
          dataSource: this.listTemplate.moban,
        };
        //     var params = new URLSearchParams();
        // params.append('sourceType',this.listTemplate.moban);
        const { data: res } = await this.$http.post(
          "/black/downloadTemplate",
          list
        );
        if (res.code == 200) {
          let newurl = res.expandData.url;
          let eleLink = document.createElement("a");
          eleLink.download = name;
          eleLink.href = newurl;
          eleLink.click();
          eleLink.remove();
        }
      }
    },
    mobanerr() {
      this.moban_typewen();
      this.mobanxiazai = false;
    },
    // 模板上传关闭
    mobanshangchuanclose() {
      this.mobanxiazai = false;
    },
    async wenjian() {
      if (this.fileList.length > 0) {
        let listfile = {
          file: "",
          User: this.use,
        };
        const { data: res } = await this.$http.post(
          "/black/uploadDomain",
          listfile
        );
        if (res.data == 200) {
          this.$message(res.message);
        } else {
          this.$message(res.message);
        }
      } else {
        this.$message("未选择文件");
      }
    },
    //文件上传
    wenjianshangchaun() {
      this.wenjian();
      this.shangchuan = false;
    },
    //文件上传关闭
    shangchuanclose() {
      this.shangchuan = false;
    },
    handleSizeChange(val) {
      this.mypageable.pageSize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      this.mypageable.pageNum = val;

      this.getTabData();
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

    //上传时间
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startUploadTime = val[0];
        this.whiteSearchList.endUploadTime = val[1];
      } else {
        this.whiteSearchList.startUploadTime = null;
        this.whiteSearchList.endUploadTime = null;
      }
    },

    // 状态
    state_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.state = null;
      }
    },
    // 协议
    protocol_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.protocol = null;
      }
    },
    // 诈骗类型
    modelType1_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.modelType1 = null;
      }
    },
    //上传人
    moban_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.mobanType1 = null;
      }
    },
    //诈骗
    zP(val) {
      if (val == "DK") {
        return "网络贷款";
      } else if (val == "SD") {
        return "兼职刷单";
      } else if (val == "GJF") {
        return "冒充公务单位";
      } else if (val == "LC") {
        return "投资理财";
      } else if (val == "GW") {
        return "网络购物";
      } else if (val == "QT") {
        return "其他";
      } else if (val == "KF") {
        return "冒充电商客服类";
      } else if (val == "JJGW") {
        return "冒充军警购物诈骗";
      } else if (val == "SZP") {
        return "杀猪盘";
      } else if (val == "DS") {
        return "虚假购物、服务类";
      } else if (val == "JY") {
        return "网络婚恋、交友类（非杀猪盘类）";
      } else if (val == "ZX") {
        return "虚假征信类";
      } else if (val == "MC") {
        return "冒充领导、熟人类";
      } else if (val == "YX") {
        return "网络游戏产品虚假交易类";
      } else if (val == "OTHER") {
        return "其他类型诈骗";
      } else if (val == "APP_FF") {
        return "APP签名分发";
      } else if (val == "XZYM") {
        return "带二维码的下载链接";
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

    mobanxuanze_clearFun(val) {
      if (val == "") {
        this.listTemplate.moban = null;
      }
    },
    //上传时间
    time(val) {
      return this.$times(val).format("YYYY-MM-DD HH:mm:ss");
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style  scoped lang='less'>
// 点击变黑
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}

/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent !important;
}
.el-pagination {
  text-align: right;
}
.bottom {
  width: 100%;
  height: 40px /* 60/16 */ /* 40/16 */;

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
.urlcolor:visited {
  color: #909090;
}
.tubiao1 {
  width: 100% /* 1558/16 */;
  height: 10rem /* 200/16 */ /* 300/16 */;
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.625rem /* 10/16 */;
}
.left {
  width: 90% /* 779/16 */;
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
.img {
  width: 100%;
  height: 100%;
}
/deep/ .el-upload {
  width: 100% !important;
  background: transparent !important ;
}
</style>
