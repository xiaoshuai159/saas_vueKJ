<template>
  <div class="right_main_under">
    <el-row>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-form size="mini" :inline="true" class="demo-form-inline">
            <el-form-item label="用户名:" class="search_select_form">
              <el-input
                v-model="usernamelist"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="margin-left: 1rem"
                type="primary"
                @click.native.stop="search"
              >
                搜索</el-button
              >
              <el-button
                style="margin-left: 1rem"
                type="primary"
                @click.native.stop="clear"
              >
                清空</el-button
              >
            </el-form-item>
          </el-form>
        </div></el-col
      >
      <el-col :span="12"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>

    <el-row v-if="getRole1('saveUser')">
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-button type="primary" size="mini" class="left" @click="add"
            >添加</el-button
          >
        </div></el-col
      >
      <!-- <el-col :span="12"
        ><div class="grid-content bg-purple-light right">
          <el-button
            type="primary"
            title="刷新"
            size="mini"
            icon="el-icon-refresh"
            circle
          ></el-button></div
      ></el-col> -->
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
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
            <!-- :row-style="{ height: 0 }" -->
            <!-- :cell-style="{ padding: 0 }" -->
            <el-table-column label="序号" prop="id" v-if="isLoading">
            </el-table-column>
            <el-table-column label="密码" prop="password" v-if="isLoading">
            </el-table-column>
            <el-table-column label="用户名" prop="username"> </el-table-column>
            <el-table-column label="角色">
              <template slot-scope="scope">
                {{ juese(scope.row.role_name) }}
              </template>
            </el-table-column>

            <el-table-column label="警号" prop="police_num"> </el-table-column>
            <el-table-column label="电话号码" prop="phone"> </el-table-column>
            <el-table-column label="部门" prop="dept_name"> </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                {{ state(scope.row.state) }}
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="create_time">
            </el-table-column>
            <el-table-column label="更新时间" prop="update_time">
            </el-table-column>
            <el-table-column label="备注" prop="remark"> </el-table-column>
            <el-table-column label="操作"  v-if="getRole1('updateUser' && 'delUser')">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="bj(scope.row)"  v-if="getRole1('updateUser')"
                  >编辑</el-button
                >
                <el-button type="text" size="mini" @click="del(scope.row.id)" v-if="getRole1('delUser')"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- ============================= -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <el-form
        :rules="rules"
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        size="mini"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="newdomainSimpleVo.user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="newdomainSimpleVo.pwd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="bm">
          <el-select
            v-model="newdomainSimpleVo.bm"
            placeholder="请输入部门"
          >
            <el-option :value="treeDataValue" style="height: auto">
              <el-tree
                ref="tree"
                :data="treedata"
                default-expand-all
                node-key="id"
                :props="defaultProps"
                @node-click="handleNodeClick"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="photo">
          <el-input
            v-model="newdomainSimpleVo.photo"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="newdomainSimpleVo.state" placeholder="请选择角色">
            <el-option label="操作员" value="2"></el-option>
            <el-option label="管理员" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="警号" prop="jh">
          <el-input
            v-model="newdomainSimpleVo.jh"
            placeholder="请输入警号"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="newdomainSimpleVo.bz"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <br/>
        <el-form-item label="状态">
          <el-radio v-model="newdomainSimpleVo.radio" label="1">有效</el-radio>
          <el-radio v-model="newdomainSimpleVo.radio" label="0">锁定</el-radio>
        </el-form-item>
        <!-- <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click.native.stop="searchTabData"
            >查询</el-button
          >
          <el-button type="primary" size="mini" @click.native="resetFun"
            >重置</el-button
          >
          <el-button type="primary" size="mini" @click.native="put"
            >下载</el-button
          >
       </template> -->
        <!-- </el-form-item>  -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          @click="submitForm('newdomainSimpleVo')"
          >确 定</el-button
        >
        <el-button @click="quxiao" type="primary" size="mini">取 消</el-button>
      </span>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++ -->
    <el-dialog
      title="编辑"
      :visible.sync="dialog"
      width="35%"
      :before-close="handleClose1"
      class="dialogInfo"
      :close-on-click-modal="false"
    >
      <!--  -->
      <el-form
        :rules="rules"
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="id:" v-if="isLoading">
          <el-input v-model="domainSimpleVo.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="domainSimpleVo.yhm" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input
            v-model="domainSimpleVo.pass"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号:">
          <el-input
            v-model="domainSimpleVo.xinphoto"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="警号:">
          <el-input
            v-model="domainSimpleVo.xinjh"
            placeholder="请输入警号"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="domainSimpleVo.xinrole" placeholder="请选择角色">
            <el-option label="操作员" value="operation"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门:">
          <el-select
            v-model="domainSimpleVo.ssbm"
            placeholder="请输入所属部门"
            @change="onSelectedDrug($event, item)"
          >
            <el-option :value="treeDataValue1" style="height: auto">
              <el-tree
                ref="tree"
                :data="treedata1"
                default-expand-all
                node-key="id"
                :props="defaultProps"
                @node-click="handleNodeClick1"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            v-model="domainSimpleVo.xinbz"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="domainSimpleVo.state" label="1">有效</el-radio>
          <el-radio v-model="domainSimpleVo.state" label="0">锁定</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xiugai" type="primary" size="mini">修 改</el-button>
        <el-button type="primary" @click="dialog = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 、、、、、、、、、、、、、、、、、、、、、、 -->
    <!-- //分页 -->
    <div class="bottom">
      <div class="right">
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
  name: "quanxian",
  data() {
    let reg = /^[A-Za-z0-9]+$/;
    var validateNewUser = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error("用户必须是英文和数字!"));
      } else {
        callback();
      }
    };
       var validateNewPwd= (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error("密码必须是英文和数字!"));
      } else {
        callback();
      }
    };
    return {
      xiugaixialid: "",
      xiugaixialid1: "",
      treeData: "",
      treeData1: "",
      treeDataValue: "",
      treeDataValue1: "",
      treedata: [],
      treedata1: [],
      defaultProps: {
        children: "children",
        label: "deptName",
      },
      usernamelist: null,
      isLoading: false,
      dialog: false,
      dialogVisible: false,
      form: {
        user: "",
      },
      tableData: [],
      newdomainSimpleVo: {
        user: "",
        pwd: "",
        bm: "",
        photo: "",
        role: "",
        jh: "",
        radio: "0",
        state: "",
        bz: "",
      },
      domainSimpleVo: {
        id: "",
        yhm: "",
        pass: "",
        ssbm: "",
        xinphoto: "",
        xinrole: "",
        state: "",
        time: "",
        xinbz: "",
        xinjh: "",
      },
      selectData: {
        stateTypeData: [
          {
            value: 0,
            label: "成都",
          },
        ],
        stateTypeData1: [
          {
            value: 0,
            label: "管理员",
          },
          {
            value: 1,
            label: "游客",
          },
        ],
      },
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 15, message: "请输入3到15位用户名", trigger: "blur" },
          { validator: validateNewUser, trigger: "blur" },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {validator:validateNewPwd,trigger:'blur'},
          { min: 6, max: 10, message: "请输入6到10位密码", trigger: "blur" },
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 5, max: 8, message: "请输入5到8位密码", trigger: "blur" },
        ],
        bm: [
          {
            required: true,
            message: "请输入部门",
            trigger: "blur",
          },
        ],
        photo: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        jh: [
          {
            required: true,
            message: "请输入警号",
            trigger: "blur",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getTabData();
    this.getdata();
  },
  methods: {
       getRole1(data) {
      return getRole(data);
      // console.log( getRole(data));
    },
    //初始化数据
    async getTabData() {
      let list = {
        mypageable: {
          pageNum: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        },
        username: this.usernamelist,
      };
      const { data: res } = await this.$http.post("/user/findUser", list);

      if (res.code == 200) {
        // console.log(res);
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      } else {
        this.$message("无数据");
      }
    },
    //tree
    async getdata() {
      const { data: res } = await this.$http.get("/dept/queryDeptList");
      // console.log(res);
      if (res.code == 200) {
        this.treedata = res.data;
        this.treedata1 = res.data;
      }
    },
    //下拉狂
    handleNodeClick(treedata, node, nodeData) {
      this.treeDataValue = treedata;
      this.newdomainSimpleVo.bm = treedata.deptName;
      this.xiugaixialid = treedata.id;
    },
    handleNodeClick1(treedata1, node, nodeData) {
      this.treeDataValue1 = treedata1;
      this.domainSimpleVo.ssbm = treedata1.deptName;
      // this.xiugaixialid1 = treedata1.id;
      this.xiugaixialid1 = treedata1.id;
    },

    //删除
    async del(val) {
      //  Number

      const { data: res } = await this.$http.get("/user/delUser", {
        params: { id: val },
      });
      if (res.code == 200) {
        this.$message("删除成功");
        this.getTabData();
      }
    },
    //修改
    async xiugai() {
      if (this.domainSimpleVo.ssbm == "") {
        this.$message("请选择部门");
        return;
      } else {
        let list = {
          userVo: {
            id: this.domainSimpleVo.id,
            password: this.domainSimpleVo.pass,
            phone: this.domainSimpleVo.xinphoto,
            policeNum: this.domainSimpleVo.xinjh,
            username: this.domainSimpleVo.yhm,
            remark: this.domainSimpleVo.xinbz,
            state: this.domainSimpleVo.state,
          },
          roleVo: {
            roleName: this.domainSimpleVo.xinrole,
          },
          deptVo: {
            id: this.xiugaixialid1,
            // id: this.xiugaixialid1,
          },
        };

        const { data: res } = await this.$http.post("/user/updateUser", list);

        if (res.code == 200) {
          this.dialog = false;
          this.$message(res.data);
          this.getTabData();
          this.domainSimpleVo.ssbm = "";
        }
      }
    },

    async search() {
      let list = {
        mypageable: {
          pageNum: this.mypageable.pageNum,
          pageSize: this.mypageable.pageSize,
        },
        username: this.usernamelist,
      };
      const { data: res } = await this.$http.post("/user/findUser", list);

      if (res.code == 200) {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
        this.totalPages = res.data.totalPages;
      } else {
        this.$message("无数据");
      }
    },

    clear() {
      this.usernamelist = "";
      this.getTabData();
    },
    handleSelectionChange() {},
    //置空
    add() {
      (this.newdomainSimpleVo = {
        user: "",
        pwd: "",
        bm: "",
        photo: "",
        role: "",
        jh: "",
        radio: "0",
      }),
        (this.dialogVisible = true);
    },

    handleClose(done) {
      this.dialogVisible = false;
    },
    handleClose1(done) {
      this.domainSimpleVo.ssbm = "";
      this.dialog = false;
    },
    getRowKeys(row) {
      return row.id;
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.tianjia();

          this.dialogVisible = false;
          this.$nextTick(() => {
            that.$refs["newdomainSimpleVo"].clearValidate();
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },

    async tianjia() {
      let list = {
        userVo: {
          password: this.newdomainSimpleVo.pwd,
          phone: this.newdomainSimpleVo.photo,
          policeNum: this.newdomainSimpleVo.jh,
          username: this.newdomainSimpleVo.user,
          state: this.newdomainSimpleVo.radio,
          remark: this.newdomainSimpleVo.bz,
        },
        roleVo: {
          id: this.newdomainSimpleVo.state,
        },
        deptVo: {
          id: this.xiugaixialid,
        },
      };
      const { data: res } = await this.$http.post("/user/saveUser", list);
      if (res.code == 200) {
        this.$message(res.data);
        this.getTabData();
      }
    },
    quxiao() {
      this.$nextTick(() => {
        this.$refs["newdomainSimpleVo"].clearValidate();
      });
      this.dialogVisible = false;
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
    // 编辑
    bj(val) {
      // console.log(val);
      console.log(val);
      this.dialog = true;
      this.domainSimpleVo.id = val.id;
      this.domainSimpleVo.yhm = val.username;
      // this.domainSimpleVo.pass = val.pwd;
      // this.domainSimpleVo.ssbm = val.dept_name;
      this.domainSimpleVo.xinphoto = val.phone;
      this.domainSimpleVo.xinrole = val.role_name;
      this.domainSimpleVo.state = JSON.stringify(val.state);
      this.domainSimpleVo.time = val.create_time;
      this.domainSimpleVo.xinjh = val.police_num;
      this.domainSimpleVo.pass = val.password;
      this.domainSimpleVo.xinbz = val.remark;
    },

    // 角色
    juese(val) {
      if (val == "superAdmin") {
        return "超级管理员";
      } else if (val == "operation") {
        return "操作员";
      } else if (val == "admin") {
        return "管理员";
      }
    },
    state(val) {
      if (val == "1") {
        return "有效";
      } else if (val == "0") {
        return "锁定";
      }
    },
  },
};
</script>

<style scoped lang='less'>
.el-row {
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.left {
  float: left;
}
.bottom {
  width: 100%;
  height: 3.75rem;
}
.right {
  float: right;
}
.el-table::before {
  height: 0px;
}
.right_main_under /deep/ .el-table__body tr:hover > td {
  background-color: rgba(3, 17, 35, 0.34901960784313724) !important;
}

.eright_main_under /deep/ .el-table__body tr.current-row > td {
  background-color: rgba(3, 17, 35, 0.34901960784313724) !important;
}
</style>