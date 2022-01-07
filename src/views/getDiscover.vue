<template>
  <div class="right_main_under">
    <div class="search_select_form">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 发现日期 -->
          <el-form-item label="发现日期">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find"
              type="daterange"
              :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
             <!-- 有无备案 -->
          <el-form-item label="有无备案">
         <el-select
            v-model="newdomainSimpleVo.record"
              placeholder="有无备案"
              clearable
              @clear="sourceType_record(newdomainSimpleVo.record)"
         >
              <el-option
                v-for="item in selectData.recordlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
         </el-select>
          </el-form-item>
          <!-- 境内外Ip -->
          <el-form-item label="境内外IP">
            <el-input
              v-model="newdomainSimpleVo.ip"
              placeholder="请输入IP"
              @clear="modelType1_ip(newdomainSimpleVo.ip)"
            ></el-input>
          </el-form-item>
          <!-- 域名 -->

          <el-form-item label="域名">
            <el-input
              v-model="newdomainSimpleVo.domain"
              placeholder="请输入域名"
              @clear="modelType1_perple(newdomainSimpleVo.domain)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click.native.stop="searchTabData"
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click.native="resetFun"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click.native="put"
              :loading="loadingbut"
              v-if="getRole1('downloadRaw')"
              >{{ loadingbuttext }}</el-button
            >
            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
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
    >
      <el-table-column type="selection" min-widt="5%"> </el-table-column>
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="发现日期" prop="discoverDate" min-width="10%">
      </el-table-column>
      <el-table-column label="类型" min-width="10%" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ zP(scope.row.type) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="类型" prop=""> </el-table-column> -->
      <el-table-column label="域名" prop="url" min-width="30%">
      </el-table-column>
      <el-table-column label="境内外IP" prop="" min-width="30%">
      </el-table-column>
      <el-table-column label="有无备案" prop="" min-width="5%">
      </el-table-column>
      <el-table-column
        label="访问量"
        min-width="10%"
        v-if="getRole1('getRawData')"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            style="height: 20px"
            @click="fangwenl(scope.row)"
            >{{ scope.row.visits }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="访问量"
        min-width="10%"
        v-if="!getRole1('getRawData')"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini" style="height: 20px">{{
            scope.row.visits
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 访问量 -->

    <el-dialog
      :title="'访问详情——' + this.yuming"
      :visible.sync="dialogTableVisible"
      class="dialogInfo"
      width="75%"
      style="color: #fff"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-table
        :data="gridData"
        class="tableStyle"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        v-loading="loading"
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
  // inject: ["reload"],
  name: "search",
  components: {},
  data() {
    return {
      loadingbuttext: "下载",
      loadingbut: false,
      loading: true,
      gridData: [
        // {
        //   sourceIp:12009
        // }
      ],
      whiteSearchList: {
        startCreateTime: null,
        endCreateTime: null,
      },
      isLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: "",
        region: "",
      },
      newdomainSimpleVo: {
        dateValue_find: null, //发现日期
        domain: null, //域名
        visits: null, //部署
        ip: null, //境内外ip
        record:null //备案
      },

      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },

      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      mypageable1: {
        pageNum1: 1,
        pageSize1: 10,
      },
      total1: 1,
      total: 1,
      totalPages: "",
      totalPages1: "",
      //下拉框的选项数据
      selectData: {
        recordlist:[
          {value: "有备案", label: "有备案"},
          { value: "无备案", label: "无备案"}
        ],
        protocolData: [
          { value: "HTTP", label: "HTTP" },
          { value: "HTTPS", label: "HTTPS" },
        ],
        sourceTypeData: [
          { value: "CA", label: "长安发现" },
          { value: "BD", label: "本地上传" },
        ],

        stateTypeData: [
          { value: 0, label: "处置中" },
          { value: 1, label: "已处置" },
        ],
        model_typeData: [
          { value: "DK", label: "网络贷款" },
          { value: "SD", label: "兼职刷单" },
          { value: "GJF", label: "冒充公务单位" },
          { value: "LC", label: "投资理财" },
          { value: "GW", label: "网络购物" },
          { value: "QT", label: "其他类型" },
        ],
        authorize: [
          { value: 0, label: "未授权" },
          { value: 1, label: "已授权" },
        ],
      },
      tableData: [
        // {
        //   url: "www.baidu.com",
        //   visits: "100",
        // },
        // {
        //   url: "www.baidu.com11",
        //   visits: "100",
        // },
      ],
      tableDatalist: [],

      newurl: "",
      arr: [],
      yuming: "",
    };
  },
  computed: {},
  created() {
    this.getTabData();
  },
  mounted() {},
  methods: {
    getRole1(data) {
      return getRole(data);
      // console.log( getRole(data));
    },
    //初始化获取数据
    async getTabData() {
      let getlist = {
        startDiscoverDate: this.whiteSearchList.startCreateTime,
        endDiscoverDate: this.whiteSearchList.endCreateTime,
        mypageable: this.mypageable,
        url: this.newdomainSimpleVo.domain,
        visits: this.newdomainSimpleVo.visits,
      };
      const { data: res } = await this.$http.post(
        "/discover/getDiscover",
        getlist
      );
      // console.log(res);
      if (res.code == 200) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      }
    },
    //查询
    async searchTabData() {
      let getlist = {
        startDiscoverDate: this.whiteSearchList.startCreateTime,
        endDiscoverDate: this.whiteSearchList.endCreateTime,
        // mypageable: this.mypageable,
        mypageable: {
          pageNum: 1,
          pageSize: this.mypageable.pageSize,
        },
        url: this.newdomainSimpleVo.domain,
        visits: this.newdomainSimpleVo.visits,
      };
      const { data: res } = await this.$http.post(
        "/discover/getDiscover",
        getlist
      );
      // console.log(res);
      if (res.code == 200) {
        this.mypageable.pageNum = 1;
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      } else {
        this.$message("无数据");
        this.mypageable.pageNum = 1;
        this.mypageable.pageSize = 10;
        this.getTabData();
        this.resetFun();
      }
    },

    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        domain: null, //域名
        dateValue_find: null, //时间
      };
      (this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      }),
        this.getTabData();
    },
    handleSelectionChange(val) {
      this.tableDatalist = val;
    },
    //下载
    async put() {
      if (this.tableDatalist.length > 0) {
        let arr = [];
        this.tableDatalist.forEach((item) => {
          arr.push(item.id);
        });
        (this.loadingbuttext = "...加载中"), (this.loadingbut = true);
        const { data: res } = await this.$http.post("/discover/downloadRaw", {
          data: arr,
        });

        if (res.code == 200) {
          (this.loadingbuttext = "下载"), (this.loadingbut = false);
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
        } else {
          this.$message(res.message);
        }
      } else {
        this.$message("请勾选");
      }
    },
    //访问量
    async fangwenl(val) {
      (this.gridData = []), (this.loading = true);
      this.yuming = val.url;
      this.arr.push(val.id);
      this.dialogTableVisible = true;
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        masterIds: this.arr,
        endDiscoverTime: null,
        startDiscoverTime: null,
      };
      const { data: res } = await this.$http.post("/discover/getRawData", list);
      if (res.code == 200) {
        this.loading = false;
        this.gridData = res.data.content;
        this.total1 = res.data.totalElements;
        this.totalPages1 = res.data.totalPages;
      }
    },
    handleSizeChange(val) {
      // console.log(val);
      this.mypageable.pageSize = val;
      this.getTabData();
    },
    // async   handleSizeChange1(val) {
    //   // console.log(val);
    //   this.mypageable1.pageSize1 = val;
    //   // this.fangwenl();
    //    let list={
    //  mypageable:{
    //    pageNum:this.mypageable1.pageNum1,
    //    pageSize:this.mypageable1.pageSize1
    //  },

    //  masterIds:this.arr,
    //  endDiscoverTime: null,
    //  startDiscoverTime: null,
    //   }
    //   const {data:res}= await this.$http.post('/discover/getRawData',list)
    //   if(res.code==200){
    //     this.gridData=res.data.content
    //       this.total1 = res.data.totalElements;
    //     this.totalPages1 = res.data.totalPages;
    //   }
    // },
    handleCurrentChange(val) {
      // console.log(val, 111);

      this.mypageable.pageNum = val;

      // console.log( this.mypageable.pageNum);
      this.getTabData();
    },
    async handleCurrentChange1(val) {
      (this.gridData = []), (this.loading = true);
      this.mypageable1.pageNum1 = val;

      // console.log( this.mypageable.pageNum);
      // this.fangwenl();
      let list = {
        mypageable: {
          pageNum: this.mypageable1.pageNum1,
          pageSize: this.mypageable1.pageSize1,
        },
        masterIds: this.arr,
        endDiscoverTime: null,
        startDiscoverTime: null,
      };
      const { data: res } = await this.$http.post("/discover/getRawData", list);
      if (res.code == 200) {
        this.loading = false;
        this.gridData = res.data.content;
        this.total1 = res.data.totalElements;
        this.totalPages1 = res.data.totalPages;
      }
    },
    modelType1_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.domain = null;
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
    modelType1_ip(val) {
      if (val == "") {
        this.newdomainSimpleVo.ip = null;
      }
    },
    modelType1_perple(val) {
      if (val == "") {
        this.newdomainSimpleVo.domain = null;
      }
    },
    sourceType_record(val){
       if (val == "") {
        this.newdomainSimpleVo.record = null;
      }
    },
    handleClose(done) {
      this.mypageable1.pageNum1 = 1;
      this.arr = [];
      this.dialogTableVisible = false;
    },
    //    eldialogout() {
    //   (this.isShow = false), this.$refs.multipleTable.clearSelection(); //清除选中的数据
    // },
    getRowKeys(row) {
      return row.id;
    },
    zP(val) {
      if (val == "DK") {
        return "贷款代办信用卡类";
      } else if (val == "SD") {
        return "刷单返利类";
      } else if (val == "GJF") {
        return "冒充公检法及政府机关类";
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
    // 转ip
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
  },
};
</script>

<style  scoped lang='less'>
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

.bottom1 {
  width: 100%;
  height: 2.75rem /* 60/16 */ /* 40/16 */;
  box-sizing: border-box;
  .ss1 {
    float: right;
    margin-right: 2.875rem /* 46/16 */;
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
  // border-top: 1px solid #596168;
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
}
#bar_qx {
  height: 10rem /* 240/16 */ /* 260/16 */ /* 200/16 */;
  padding-top: 0.625rem /* 10/16 */;
  margin-left: 0.625rem /* 10/16 */ /* 20/16 */;
}
#bar_zz {
  height: 10rem /* 200/16 */;
  // margin-left: 1.875rem /* 30/16 */ /* 20/16 */;
  margin-left: 0.625rem;
}
.right {
  width: 40%;
  height: 10rem;

  // float: right;
  // padding: 1.25rem /* 20/16 */ /* 50/16 */ 3.125rem /* 100/16 */;
  box-sizing: border-box;
  background-color: #07293f;
}
.el-table__body /deep/ .el-button--mini {
  color: #fff;
}
// .el-table::before {
//   height: 10px;
// }
.dialogInfo /deep/ .el-table__row {
  height: 40px !important;
}
</style>
