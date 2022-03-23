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
           <el-form-item label="日期">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_find"
              type="datetimerange"
              :change="dataCreate_change(newdomainSimpleVo.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              size="mini"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="来源">
            <el-select
              v-model="newdomainSimpleVo.source"
              placeholder="来源"
              clearable
              @clear="sourceType_record(newdomainSimpleVo.source)"
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
          <!-- 二级分类 -->
          <!-- <el-form-item label="类型">
            <el-select
              v-model="newdomainSimpleVo.classification"
              placeholder="类型"
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
          </el-form-item> -->
          <!-- 级别 -->
          <!-- <el-form-item label="级别">
            <el-select
              v-model="newdomainSimpleVo.jibie"
              placeholder="级别"
              clearable
              @clear="sourceType_classification(newdomainSimpleVo.jibie)"
            >
              <el-option
                v-for="item in selectData.classificationlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- 域名/URL -->
          <!-- <el-form-item label="域名/URL">
            <el-input
              v-model="newdomainSimpleVo.domain"
              placeholder="域名/URL"
            ></el-input>
          </el-form-item> -->
          <!-- 主域名 -->
          <!-- <el-form-item label="主域名">
                <el-input
              v-model="newdomainSimpleVo.ip"
              placeholder="主域名"
            ></el-input>
          
          </el-form-item> -->
           <!-- 主域名 -->
          <!-- <el-form-item label="网站名称">
                <el-input
              v-model="newdomainSimpleVo.record"
              placeholder="网站名称"
            ></el-input>
          
          </el-form-item> -->
      
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
      :row-class-name="tableRowClassName"
      :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
        height="calc(100% - 18%)"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" min-width="5%"> </el-table-column> -->
      <!-- <el-table-column label="序号" prop="id" >
      </el-table-column> -->
      <el-table-column label="录入时间" prop="discoverDate"> </el-table-column>
         <el-table-column
        label="域名/URL"
        prop="url"
        width="400"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="来源" prop="discoverDate"> </el-table-column>
      <el-table-column label="类型" prop="type" show-overflow-tooltip>
      </el-table-column>
   
      <!-- <el-table-column label="类型" prop=""> </el-table-column> -->
   
      <el-table-column label="主域名" prop="domesticForeign"> </el-table-column>
      <el-table-column label="网站名称" prop="keepRecord"> </el-table-column>
         <el-table-column label="级别" prop="jibie" show-overflow-tooltip>
      </el-table-column>
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
  
  </div>
</template>

<script>
import getRole from "@/utils/promission.js";
import erji from "@/utils/twotype.js";
import zPtype from "@/utils/type.js";
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
      // isLoading: false,
      dialogTableVisible: false,
      dialogFormVisible: false,

      formInline: {
        user: "",
        region: "",
      },
      newdomainSimpleVo: {
        xuhao:null,//序号
        source: null, //来源
        classification: null, //类型
        jibie: null, //级别
        domain: null, //域名/URL
        dateValue_find:null , //日期
        // ip: null, //主域名
        // record: null, //网站名称
            // dateValue_find: null, //发现日期
        // visits: null, //部署
        // cda:null, //cda
      },

      domainFeedbackVo: {
        accessSystemType: null,
        feedbackStatus: null,
      },

      mypageable: {
        pageNum: 1,
        pageSize: 15,
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
        recordlist: [
          { value: "有备案", label: "有备案" },
          { value: "无备案", label: "无备案" },
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
        ip_list: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
        Cda_list: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
      },
      tableData: [
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
    //类型
    zP(data) {
      return zPtype(data);
    },
    //二级分类
    geterji(data) {
      return erji(data);
    },
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
        ifForeign: this.newdomainSimpleVo.record,
        ifRecord: this.newdomainSimpleVo.ip,
        url: this.newdomainSimpleVo.domain,
        // 二级分类
        category: this.newdomainSimpleVo.classification,
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
      } else if (res.code == 500) {
        this.$message(res.message);
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
        ifRecord: this.newdomainSimpleVo.ip,
        url: this.newdomainSimpleVo.domain,
        ifForeign: this.newdomainSimpleVo.record,
        // 二级分类
        category: this.newdomainSimpleVo.classification,
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
      } else if (res.code == 500) {
        this.$message(res.message);
      } else {
        this.$message("无数据");
        this.mypageable.pageNum = 1;
        this.mypageable.pageSize = 15;
        this.getTabData();
        this.resetFun();
      }
    },

    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        domain: null, //域名
        dateValue_find: null, //时间
        ip: null,
        classification: null,
        record: null,
        visits: null,
        classification: null,
      };
      this.whiteSearchList = {
        startCreateTime: null,
        endCreateTime: null,
      };
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
        } else if (res.code == 500) {
          this.$message(res.message);
        }
      } else {
        this.$message("请勾选");
      }
    },
    //  <!-- 周五 -->   //访问量
    // async fangwenl(val) {
    //   (this.gridData = []), (this.loading = true);
    //   this.yuming = val.url;
    //   this.arr.push(val.id);
    //   this.dialogTableVisible = true;
    //   let list = {
    //     mypageable: {
    //       pageNum: this.mypageable1.pageNum1,
    //       pageSize: this.mypageable1.pageSize1,
    //     },
    //     masterIds: this.arr,
    //     endDiscoverTime: null,
    //     startDiscoverTime: null,
    //   };
    //   const { data: res } = await this.$http.post("/discover/getRawData", list);
    //   if (res.code == 200) {
    //     this.loading = false;
    //     this.gridData = res.data.content;
    //     this.total1 = res.data.totalElements;
    //     this.totalPages1 = res.data.totalPages;
    //   } else if (res.code == 500) {
    //     this.$message(res.message);
    //   }
    // },
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
      } else if (res.code == 500) {
        this.$message(res.message);
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
    sourceType_record(val) {
      if (val == "") {
        this.newdomainSimpleVo.record = null;
      }
    },
    sourceType_classification(val) {
      if (val == "") {
        this.newdomainSimpleVo.classification = null;
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
     tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
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
  height:40px /* 60/16 */ /* 40/16 */;

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
  height: 40px /* 60/16 */ /* 40/16 */;
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
