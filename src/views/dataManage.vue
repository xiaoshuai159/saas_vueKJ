<template>
  <div class="right_main_under">
    <div class="topOne">
      <span class="addAllocate">类型：</span>
      <el-select v-model="whiteSearchList.status" clearable placeholder="选择类型" size="mini">
        <el-option
          v-for="item in upDownStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="addAllocate">描述：</span>
      <el-input placeholder="请输入查询关键字" v-model="whiteSearchList.host" clearable size="mini"></el-input>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="searchListButton"
        icon="el-icon-search"
      >查询</el-button>
    </div>

    <!-- 列表 -->
    <el-table
      ref="multipleTable"
      :data="whiteTableList"
      style="width: 100%"
      max-height="680px"
      size="mini"
      class="tableStyle"
      @cell-dblclick="copy"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="createTime" label="类型"></el-table-column>
      <el-table-column prop="updateTime" label="描述"></el-table-column>
      <el-table-column prop="status" label="当前值"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="mypageable.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mypageable.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mypageable.total"
      class="pagePagination pageRight"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "whiteList",
  components: {},
  data() {
    return {
      visible1: false,
      visible2: false,
      upDownStatus: [
        //上下线状态
        // {
        //   value: 1,
        //   label: "上线",
        // },
        // {
        //   value: 2,
        //   label: "下线",
        // },
        // {
        //   value: 3,
        //   label: "待上线",
        // },
        {
          value: 1,
          label: "Mysql数据库服务器",
        },
        {
          value: 2,
          label: "Web应用服务器",
        },
      ],
      dataCreateTime: "",
      dataUpdateTime: "",
      whiteSearchList: {
        //查询
        host: "",
        status: null,
        startCreateTime: "",
        endCreateTime: "",
        startUpdateTime: "",
        endUpdateTime: "",
      },
      whiteTableList: [
        {
          createTime: "Mysql数据库服务器",
          updateTime: "CPU数量",
          status: "8核",
        },
        {
          createTime: "Mysql数据库服务器",
          updateTime: "系统 CPU 使用率",
          status: "4.03 %",
        },
        {
          createTime: "Mysql数据库服务器",
          updateTime: "磁盘监控",
          status: "78%",
        },
        {
          createTime: "Mysql数据库服务器",
          updateTime: "硬盘使用空间",
          status: "2T",
        },
        {
          createTime: "Web应用服务器",
          updateTime: "CPU数量",
          status: "8核",
        },
      ],
      multipleSelection: [], //列表选择
      mypageable: {
        currentPage: 1,
        pageSize: 10,
        total: 5,
      },
    };
  },
  filters: {
    toStatus: function (value) {
      var status = "";
      switch (value) {
        case 1:
          status = "上线";
          break;
        case 2:
          status = "下线";
          break;
        case 3: //2
          status = "待上线";
          break;
      }
      return status;
    },
  },
  created() {
    // this.getTableData();
  },
  methods: {
    clearSearch() {
      this.whiteSearchList = {
        id: 0,
        host: "",
        status: null,
        startCreateTime: "",
        endCreateTime: "",
        startUpdateTime: "",
        endUpdateTime: "",
      };
      this.dataCreateTime = "";
      this.dataUpdateTime = "";
    },
    async getTableData() {
      let reqTableList = {
        ...this.whiteSearchList,
        // mypageable: {
        pageNum: this.mypageable.currentPage,
        pageSize: this.mypageable.pageSize,
        // },
      };
      const { data: res } = await this.$http.post(
        "/es/getWhitelist",
        reqTableList
      );
      //  const res = await this.$http.post(
      //   "/es/getWhitelist",
      //   reqTableList
      // );
      if (res.code == 200) {
        this.whiteTableList = [];
        if (res.data.content) {
          this.whiteTableList = res.data.content;
          this.mypageable.total = res.data.totalElements;
        }
      } else {
        this.$message.error("查询错误！");
        this.whiteTableList = [];
      }
    },
    searchListButton() {
      this.mypageable.currentPage = 1;
      this.getTableData();
    },
    async changeSearchUpDown(val) {
      let a = val;
      this.visible1 = false;
      let reqSearchUpDown = { ...this.whiteSearchList };
      reqSearchUpDown.choiceStatus = val;
      // reqSearchUpDown.id = [];
      // console.log(reqSearchUpDown);
      const { data: res } = await this.$http.post(
        "/es/changeWhiteListByEntry ",
        reqSearchUpDown
      );
      if (res.code == 200) {
        a == 1
          ? this.$message.success("上线成功")
          : this.$message.success("下线成功");
        this.clearSearch();
        this.getTableData();
      } else {
        a == 1
          ? this.$message.warning("上线失败")
          : this.$message.warning("下线失败");
      }
    },
    async changeChoiceUpDpwn(val) {
      let a = val;
      this.visible2 = false;
      var isId = this.multipleSelection.map((item, index, value) => {
        return item.id;
      });
      if (isId.length > 0) {
        let reqChoiceUpDown = {};
        reqChoiceUpDown.id = isId;
        reqChoiceUpDown.choiceStatus = val;
        const { data: res } = await this.$http.post(
          "/es/changeWhiteListById",
          reqChoiceUpDown
        );
        if (res.code == 200) {
          a == 1
            ? this.$message.success("上线成功")
            : this.$message.success("下线成功");
          this.clearSearch();
          this.getTableData();
        } else {
          a == 1
            ? this.$message.warning("上线失败")
            : this.$message.warning("下线失败");
        }
      } else {
        this.$message.error("请在列表中选择要更改状态的数据后进行操作");
      }
    },
    async downTemplate() {
      // const { data: res } = await this.$http.post("/es/downWhiteTemplate");
      const { data: res } = await this.$http.get("/es/downWhiteTemplate");
      // const res  = await this.$http.get("/es/downWhiteTemplate");
      // console.log(res);
      if (res.code == 200) {
        let url = res.expandData.url;
        let eleLink = document.createElement("a");
        eleLink.download = name;
        eleLink.href = url;
        eleLink.click();
        eleLink.remove();
      }
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
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeUpload(file) {
      const isLt100M = file.size / 1024 / 1024 <= 100;
      if (!isLt100M) {
        this.$message.error("上传文件超过200M");
        return false;
      }
    },
    handleSizeChange(val) {
      //pageSize 改变时会触发
      this.mypageable.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      //currentPage 改变时会触发
      this.mypageable.currentPage = val;
      this.getTableData();
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
    dataUpdate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startUpdateTime = val[0];
        this.whiteSearchList.endUpdateTime = val[1];
      } else {
        this.whiteSearchList.startUpdateTime = null;
        this.whiteSearchList.endUpdateTime = null;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    copy() {},
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
    width: 24rem;
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
