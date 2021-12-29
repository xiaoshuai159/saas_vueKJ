<template>
  <div class="right_main_under">
    <el-form :inline="true"  class="search_select_form"  size="mini">
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateValue_create"
          type="datetimerange"
          :change="date_change(dateValue_create,1)"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          align="right"
          style="width: 260px"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="日志内容" >
        <el-input v-model="form.logContent"  placeholder="日志内容" prefix-icon="el-icon-search" style="width: 360px"></el-input>
      </el-form-item>
      <el-form-item label="日志类型">
        <el-select v-model="form.logType" placeholder="日志类型" clearable  @clear="status_clearFun">
          <el-option
            v-for="item in selectData.logTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="form.operateType" placeholder="操作类型">
          <el-option
            v-for="item in selectData.operateTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作人名称" >
        <el-input v-model="form.operateName"  placeholder="操作人名称" prefix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" size="mini"  @click="resetFun"><i class="el-icon-refresh el-icon--left"></i>重置</el-button>
        <el-button type="primary" size="mini"  @click="searchTabData" :loading="isLoading"  v-prevent-click><i class="el-icon-search el-icon--left"></i>查询</el-button>
<!--        <el-button type="success" size="mini"   @click="handleExceed"  v-prevent-click><i class="el-icon-upload el-icon&#45;&#45;left"></i>上传任务</el-button>-->
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="650px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="日志内容"
        prop="logContent" min-width="220" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作人名称"
        prop="operateName" min-width="220" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="日志类型"
        prop="logType">
        <template scope="scope">
          <el-tag
            :type="scope.row.logType === '1' ? 'primary' : 'success'"
            disable-transitions>
            {{scope.row.logType | toStatusOfLog}}
          </el-tag>

        </template>
      </el-table-column>
      <el-table-column
        label="操作类型"
        prop="operateType">
        <template scope="scope">
          <el-tag
            :type="scope.row.operateType === '1' ? 'primary' : 'success'"
            disable-transitions>
            {{scope.row.operateType | toStatusofOperat}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime">
      </el-table-column>
    </el-table>
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
</template>

<script>
  export default {
    name: "ruleFeatures",
    data(){
      return{
        dateValue_create:'',
        dateValue_update:'',

        form:{
          logContent:null,
          logType:null,
          operateType:null,
          operateName:null,
          startCreateTime:null,
          endCreateTime:null,
        },
        tableData:[
          {
            "createTime": "2021-04-19 13:27:25",
            "logType": "1",
            "operateType": "1",
            "operateName": "admin",
            "logContent": "用户名: admin,登录成功！"
          },
          {
            "createTime": "2021-04-19 13:27:25",
            "logType": "2",
            "operateType": "2",
            "operateName": "admin",
            "logContent": "回溯查询-分页列表查询"
          },
          {
            "createTime": "2021-04-19 13:27:25",
            "logType": "2",
            "operateType": "2",
            "operateName": "admin",
            "logContent": "白名单-分页列表查询"
          },
          {
            "createTime": "2021-04-19 13:27:25",
            "logType": "2",
            "operateType": "2",
            "operateName": "admin",
            "logContent": "统计分析-数据查询"
          },
        ],
        mypageable:{
          pageSize:10,
          pageNum:1,
        },
        total:4,
        currentPage:1,
        multipleSelection:'',
        selectData:{
          operateTypeData:[
            { value:'1',label:'登录'},
            { value:'2',label:'查询'},
            { value:'3',label:'删除'},
            { value:'4',label:'更新'},
            { value:'5',label:'退出'},
          ],
          logTypeData:[
            { value:'1',label:'登录'},
            { value:'2',label:'操作日志'},
            { value:'3',label:'退出'},
          ],
        },
        isLoading:false,
      }
    },
    created() {
      // this.getTabData()
    },
    methods: {

      //初始化获取数据
      async getTabData() {
        //确定mypageable的存放位置
        let formData = {
          // ...this.form,
          // mypageable:this.mypageable,
          fieldMap:this.form,
          pageNum:this.mypageable.pageNum,
          pageSize:this.mypageable.pageSize,
        }

        const {data:res} = await this.$http.post('/es/getRulelist',formData)
        if(res.code == 200){
          this.tableData = []
          if (res.data.content){
            this.tableData = res.data.content
            this.total = res.data.totalElements
            this.totalPages = res.data.totalPages
          }
        }else{
          this.$message.error("查询错误！");
        }

        //加载无论成功与否，都要去掉loading
        this.isLoading = false
      },

      //查询
      searchTabData() {
        this.isLoading = true
        this.mypageable.pageNum = 1
        this.getTabData()
      },

      //下拉框自带清空方法重写 由于 后端需要将传输数据全部默认值为null
      status_clearFun() {
        this.form.status = null
      },

      //下载模板
      async downloadTemp(){
        const { data: res } = await this.$http.post(
          "/es/downRuleTemplate",
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

      //重置form
      resetFun() {
        this.form = {
          logContent:null,
          logType:null,
          operateType:null,
          operateName:null,
          startCreateTime:null,
          endCreateTime:null,
        }
        this.dateValue_create = null
      },
      //操作
      async operateFun(type){
        //处理multipleSelection 数据
        let mulArr = []
        let multipleSel = this.multipleSelection
        if(multipleSel.length > 0){
          for(let i = 0;i < multipleSel.length;i++){
            mulArr.push(multipleSel[i].id)
          }
        }else{
          this.$message.error("请至少选择一条规则数据！");
        }

        let status = "2"
        if(type === 2){
          status = "3"
        }else if(type === 3){//2
          status = "4"
        }

        const opeData =  {
          "id": mulArr,
          "status": status,
        }
        const {data:res} = await this.$http.post('/es/changeRuleList',opeData)

        if(res.code == 200){
          let length = this.multipleSelection.length;
          let message = status == "2" ? '已批量通过'+length+'条数据！':(status == "3"? '已批量停用'+length+'条数据！' : (status == "4" ? '已批量删除'+length+'条数据！' : "操作成功！"));
          this.$message({
            message: message,
            type: "success",
          });
          setTimeout(()=>{
            this.getTabData()
          },3000)

        }else{
          this.$message.error("操作失败！");
        }
      },

      //日期格式化
      date_change(val, typeDate) {
        if (typeDate == 1) {
          if (val && val != "") {
            this.form.startCreateTime = val[0]
            this.form.endCreateTime = val[1]
          } else {
            this.form.startCreateTime = null
            this.form.endCreateTime = null
          }
        } else if (typeDate == 2) {
          if (val && val != "") {
            this.form.startUpdateTime = val[0]
            this.form.endUpdateTime = val[1]
          } else {
            this.form.startUpdateTime = null
            this.form.endUpdateTime = null
          }
        }
      },

      //复选框取值操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //分页数量
      handleSizeChange(val) {
        this.mypageable.pageSize = val
        this.getTabData()
      },

      //页码跳转
      handleCurrentChange(val) {
        this.mypageable.pageNum = val
        this.getTabData()
      },

      //上传
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
          setTimeout(()=>{
            this.getTabData()
            this.$message.success("上传成功");
          },3000)

        } else {
          this.$message.warning("上传失败");
        }
      },
    },
    filters: {
      toStatusofOperat: function (value) {
        let status = "";
        switch (value) {
          case "1": //0
            status = "登录";
            break;
          case "2": //1
            status = "查询";
            break;
          default:
            status = "暂无";
            break;
        }
        return status;
      },
      toStatusOfLog: function (value) {
        let status = "";
        switch (value) {
          case "1": //0
            status = "登录";
            break;
          case "2": //1
            status = "操作日志";
            break;
          default:
            status = "暂无";
            break;
        }
        return status;
      },
    },
  }
</script>

<style scoped lang="less">
  /deep/ .el-table__fixed-right::before, .el-table__fixed::before{
    background-color:#192d45;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #03112359;
  }
  /deep/.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color:#192d45 !important;
  }

  .upload_demo {
    margin-left: 0.625rem;
    display: inline-block;
    /deep/.el-upload--text {
      height: 0px;
      width: 0px;
      line-height: 0px;
      display: inline;
      background-color: rgba(0, 0, 0, 0);
      border: 0;
    }
    /deep/.el-upload-list {
      display: inline-block;
    }

    /deep/.el-upload-list__item {
      line-height: 1;
    }

    /deep/.el-upload-list__item:first-child {
      margin-top: 0px;
    }
    /deep/.el-upload-list__item-name,
    /deep/.el-upload-list__item {
      display: inline;
    }
    /deep/.el-upload-list__item:hover {
      background-color: #00000000;
    }
    /deep/.el-upload-list__item .el-icon-close {
      top: 0;
    }
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 320px;
  }
</style>
