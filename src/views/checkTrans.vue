<template>
  <div class="right_main_under">
    <div class="topOne">
      <span class="addAllocate">发现时间段：</span>
      <el-date-picker
        v-model="choiceTime"
        type="datetimerange"
        :change="dataFind_change(choiceTime)"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        align="right"
        size="mini"
      ></el-date-picker>
      <span class="addAllocate">是否已读：</span>
      <el-select v-model="checkListData.isRead" clearable placeholder="状态" size="mini">
        <el-option
          v-for="item in option2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span class="addAllocate">问题描述：</span>
      <el-select v-model="checkListData.problemType" clearable placeholder="状态" size="mini">
        <el-option
          v-for="item in option1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="checkListButton"
        icon="el-icon-search"
      >查询</el-button>
      <el-button
        class="addAllocate"
        type="primary"
        size="mini"
        @click="clearSearch"
        icon="el-icon-close"
        >重置</el-button
      >
    </div>
    <!-- 列表 -->
    <el-table
      ref="multipleTable"
      :data="tableDatas"
      style="width: 100%"
      max-height="680px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="findTime" label="发现时间"></el-table-column>
      <el-table-column prop="problemType" label="问题描述">
        <template scope="scope">{{ scope.row.problemType | toProblem }}</template>
      </el-table-column>
      <el-table-column prop="isRead" label="是否已读">
        <template scope="scope">{{ scope.row.isRead | toIsRead }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="changeRead(scope.row.id)"
            type="primary"
            v-if="scope.row.isRead == 0"
          >设为已读</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button size="mini" round type="primary" style="margin-top:12px" @click="changeMoreRead">设为已读</el-button>
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
      option1: [
        //上下线状态
        {
          value: 1,
          label: "通道不通",
        },
        {
          value: 2,
          label: "文件传输不完整",
        },
      ],
      option2: [
        //上下线状态
        {
          value: 0,
          label: "未读",
        },
        {
          value: 1,
          label: "已读",
        },
      ],
      choiceTime: "",
      checkListData: {
        //查询传入数据
        startFindTime: "",
        endFindTime: "",
        problemType: null,
        isRead: null,
      },
      multipleSelection: [],
      mypageable: {
        //分页
        currentPage: 0,  // 页码从0开始
        pageSize: 10,
        total: 0,
      },
      tableDatas: [
        // {
        //   id: 0,
        //   findTime: "2021-04-01 10:26:39",
        //   problemType: 1,
        //   isRead: 1,
        // },
        // {
        //   id: 0,
        //   findTime: "2021-04-01 10:26:39",
        //   problemType: 1,
        //   isRead: 0,
        // },
      ],
    };
  },
  filters: {
    toProblem: function (value) {
      var status = "";
      switch (value) {
        case 1:
          status = "通道不通";
          break;
        case 2:
          status = "文件传输不完整";
          break;
      }
      return status;
    },
    toIsRead: function (value) {
      var status = "";
      switch (value) {
        case 0:
          status = "未读";
          break;
        case 1:
          status = "已读";
          break;
      }
      return status;
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let dataCheckVo = {
        ...this.checkListData,
       
        mypageable: {
          pageNum: this.mypageable.currentPage==0?this.mypageable.currentPage:this.mypageable.currentPage-1,
          pageSize: this.mypageable.pageSize,
        },
        
      };
      // console.log(this.mypageable.currentPage,this.mypageable.pageSize);
      const { data: res } = await this.$http.post(
        "/dataCheck/getList",
        dataCheckVo
      );
      // console.log(res);
      if (res.code == 200) {
        this.tableDatas = [];
        if (res.data.content) {
          this.tableDatas = res.data.content;
          this.mypageable.total = res.data.totalElements;
        }
      } else {
        this.$message.error("查询错误！");
        this.tableDatas = [];
      }
    },
    //查询
  async  checkListButton() {
       let dataCheckVo = {
        ...this.checkListData, 
        mypageable: {
          pageNum: this.mypageable.currentPage==0?this.mypageable.currentPage:this.mypageable.currentPage-1,
          pageSize: this.mypageable.pageSize,
        },
        
      };
        const { data: res } = await this.$http.post(
        "/dataCheck/getList",
        dataCheckVo
      );
      // console.log(res);
      if (res.code == 200) {
      this.getTableData()
      } else {
        this.$message.error("查询错误！");
        this.tableDatas = [];
      }
    },
    dataFind_change(val) {
      if (val && val != "") {
        this.checkListData.startFindTime = val[0];
        this.checkListData.endFindTime = val[1];
      } else {
        this.checkListData.startFindTime = null;
        this.checkListData.endFindTime = null;
      }
    },
    async changeRead(val) {
      let a = [];
      a[0] = val;
      const { data: res } = await this.$http.post("/dataCheck/saveRead", {
        id: a,
      });
      if (res.code == 200) {
        this.$message({
          message: "更改状态成功",
          type: "success",
        });
        this.getTableData();
      } else {
        this.$message.error(res.message);
      }
    },
    async changeMoreRead() {
      var isId = this.multipleSelection.map((item, index, value) => {
        return item.id;
      });
      if(isId.length > 0){
        const { data: res } = await this.$http.post("/dataCheck/saveRead", {
          id: isId,
        });
        if (res.code == 200) {
          this.$message({
            message: "更改状态成功",
            type: "success",
          });
          this.getTableData();
        } else {
          this.$message.error(res.message);
        }
      }else{
        this.$message.error('请在列表中选择要更改状态的数据后进行操作');
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      //pageSize 改变时会触发
      // console.log(val);
      this.mypageable.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      //currentPage 改变时会触发
      // console.log(val);
      this.mypageable.currentPage = val;
      this.getTableData();
    },
    //重置
       clearSearch() {
         this.choiceTime=''
         this.checkListData={
        startFindTime: '',
        endFindTime: '',
        problemType: null,
        isRead: null,
      }
      this.getTableData()
    },
  },
};
</script>

<style  scoped lang='less'>
.addAllocate {
  margin-left: 0.625rem;
}
.topOne {
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
