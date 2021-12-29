<template>
  <div class="right_main_under">
    <!-- <h3>查看处置</h3>
    <el-divider></el-divider> -->
    <div class="search_select_form">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <!-- 创建时间 -->
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="newdomainSimpleVo.dateValue_xiafa"
              type="daterange"
              :change="
                dataCreate_changexiafa(newdomainSimpleVo.dateValue_xiafa)
              "
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 下发时间 -->
          <el-form-item label="下发时间">
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

          <!-- 电话 -->
          <el-form-item label="电话">
            <el-input
              v-model="newdomainSimpleVo.photo"
              @clear="photo_clearFun(newdomainSimpleVo.photo)"
            ></el-input>
          </el-form-item>

          <!-- 来源 -->
          <el-form-item label="来源">
            <el-select
              v-model="newdomainSimpleVo.sourceType"
              placeholder="来源"
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
          <!-- 等级 -->
          <el-form-item label="等级">
            <el-select
              v-model="newdomainSimpleVo.authorize"
              placeholder="等级"
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

          <!-- 下发单位 -->
          <el-form-item label="下发单位">
            <el-select
              v-model="newdomainSimpleVo.modelType"
              placeholder="下发单位"
              clearable
              @clear="modelType_clearFun(newdomainSimpleVo.modelType)"
            >
              <el-option
                v-for="item in selectData.xiafadanwei"
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

          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click="searchTabData"
              v-prevent-click
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click="resetFun"
              >重置</el-button
            >
            <!-- :loading="isLoading" -->
            <el-button type="primary" size="mini" @click="put">导出</el-button>

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>
    <!-- //列表 -->

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
      <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column>
      <el-table-column label="创建时间" prop="id"> </el-table-column>
      <el-table-column label="下发时间" prop="protocol"> </el-table-column>
      <el-table-column label="电话" prop="protocol"> </el-table-column>
      <el-table-column label="类型" prop="state"> </el-table-column>
      <el-table-column label="来源" prop="treatmentTime"> </el-table-column>
      <el-table-column label="等级" prop="visits">
      </el-table-column>
        <el-table-column label="下发单位" prop="visits1">
      </el-table-column>
        <el-table-column label="状态" prop="visits2">
      </el-table-column>
          <el-table-column label="结果摘要" prop="visits3">
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
  </div>
</template>

<script>
export default {
  // inject: ["reload"],
  name: "search_success",
  components: {},
  data() {
    return {
      whiteSearchList: {
        startCreateTime: "",
        endCreateTime: "",
      },
      whiteSearchxiaList: {
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
        dateValue_xiafa: null, //下发时间
        dateValue_find: null, //处置时间
        photo: null, //电话
        modelType: null, //下发单位
        protocol: null, //协议
        sourceType: null, //来源
        authorize: null, //等级
        state: null, //状态
      },

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
        protocolData: [
          { value: "HTTP", label: "HTTP" },
          { value: "HTTPS", label: "HTTPS" },
        ],
        sourceTypeData: [
          { value: "CA", label: "长安发现" },
          { value: "BD", label: "本地上传" },
        ],

        stateTypeData: [
          //   { value: 0, label: "处置中" },
          //   { value: 1, label: "已处置" },
        ],
        model_typeData: [
          { value: "DK", label: "网络贷款" },
          { value: "SD", label: "兼职刷单" },
          { value: "GJF", label: "冒充公检法" },
          { value: "LC", label: "投资理财" },
          { value: "GW", label: "网络购物" },
          { value: "QT", label: "其他类型" },
        ],
        authorize: [
          //   { value: 0, label: "未授权" },
          //   { value: 1, label: "已授权" },
        ],
        xiafadanwei: [
          //   { value: 0, label: "未授权" },
          //   { value: 1, label: "已授权" },
        ],
      },
      tableData: [],
      tableDatalist: [],

      newurl: "",
    };
  },
  created() {
    // this.getTabData();
  },
  mounted() {},
  methods: {
    searchTabData() {},
    put() {},
    //重置方法
    resetFun() {
      this.newdomainSimpleVo = {
        dateValue_xiafa: null, //下发时间
        dateValue_find: null, //处置时间
        photo: null, //电话
        modelType: null, //下发单位
        protocol: null, //协议
        sourceType: null, //来源
        authorize: null, //等级
        state: null, //状态
      };
      this.getTabData();
    },
    handleSelectionChange(val) {
      this.tableDatalist = val;
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
    dataCreate_changexiafa(val) {
      if (val && val != "") {
        this.whiteSearchxiaList.startCreateTime1 = val[0];
        this.whiteSearchxiaList.endCreateTime1 = val[1];
      } else {
        this.whiteSearchxiaList.startCreateTime1 = null;
        this.whiteSearchxiaList.endCreateTime1 = null;
      }
    },
    photo_clearFun() {
      if (val == "") {
        this.newdomainSimpleVo.sourceType = null;
      }
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

    modelType_clearFun(val) {
      if (val == "") {
        this.newdomainSimpleVo.modelType = null;
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
    //诈骗
    zP(val) {
      if (val == "DK") {
        return "网络贷款";
      } else if (val == "SD") {
        return "兼职刷单";
      } else if (val == "GJF") {
        return "冒充公检法";
      } else if (val == "LC") {
        return "投资理财";
      } else if (val == "GW") {
        return "网络购物";
      } else if (val == "QT") {
        return "其他";
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
</style>
