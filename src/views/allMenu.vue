<template>
  <div class="right_main_under">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData1"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          class="tableStyle"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="menuName" label="菜单名字"> </el-table-column>
          <el-table-column prop="id" label="id" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="pid" label="pid" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="menuUrl" label="路径" v-if="oneloading">
          </el-table-column>
          <el-table-column prop="name" label="路由"> </el-table-column>
          <el-table-column prop="sort" label="排序"> </el-table-column>
          <el-table-column prop="creatTime" label="创建时间"> </el-table-column>
          <el-table-column prop="updateTime" label="修改时间">
          </el-table-column>

          <el-table-column label="删除标记">
            <template slot-scope="scope">
              {{ biaoji(scope.row.delFlag) }}
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              {{ user(scope.row.menuType) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="add(scope.row.pid)"
                v-if="hide"
                >新增</el-button
              >
              <el-button type="text" size="mini" @click="upload(scope.row)"
                >修改</el-button
              >
              <el-button type="text" size="mini" @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12"> </el-col>
    </el-row>
    <!-- 111111111111111111111111 -->
    <el-dialog
      title="新 增"
      :visible.sync="dialog"
      width="40%"
      :before-close="handleClose"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="domainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:">
          <el-input v-model="domainSimpleVo.menuName1"></el-input>
        </el-form-item>
        <el-form-item label="路径:">
          <el-input
            v-model="domainSimpleVo.menuUrl1"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:">
          <el-input
            v-model="domainSimpleVo.xuhao1"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:">
          <el-select v-model="domainSimpleVo.state1" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:">
          <el-input
            v-model="domainSimpleVo.name1"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="baocun" type="primary" size="mini">保 存</el-button>
        <el-button type="primary" @click="dialog = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ============================== 修改-->
    <el-dialog
      title="修改"
      :visible.sync="dialog1"
      width="40%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="domainSimpleVo1"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="菜单名称:">
          <el-input v-model="domainSimpleVo1.menuName11"></el-input>
        </el-form-item>
        <el-form-item label="路径:" v-if="hide">
          <el-input
            v-model="domainSimpleVo1.menuUrl11"
            placeholder="请输入新路径(如：/xxx/xxx)"
          ></el-input>
        </el-form-item>

        <el-form-item label="序号:">
          <el-input
            v-model="domainSimpleVo1.xuhao11"
            placeholder="请输入序号"
          ></el-input>
        </el-form-item>

        <el-form-item label="类型:">
          <el-select v-model="domainSimpleVo1.state11" placeholder="请选择">
            <el-option label="菜单" value="0"></el-option>
            <el-option label="按钮" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="路由:">
          <el-input
            disabled
            v-model="domainSimpleVo1.name11"
            placeholder="请输入路由(如：/xxx)"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="err" type="primary" size="mini">确定</el-button>
        <el-button type="primary" @click="dialog1 = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- ================================== -->
  </div>
</template>

<script>
import getRole from "@/utils/promission.js";
export default {
  name: "NEwmeun",
  data() {
    return {
      hide: false,
      domainSimpleVo: {
        menuName1: "",
        menuUrl1: "",
        xuhao1: "",
        state1: "",
        name1: "",
      },
      domainSimpleVo1: {
        menuName11: "",
        menuUrl11: "",
        xuhao11: "",
        state11: "",
        name11: "",
        pid1: "",
        id1: "",
      },
      pid: "",
      oneloading: false,
      activeName: "first",
      activeName1: "first",
      dialog: false,
      dialog1: false,

      zuo: {
        name1: null,
        router: null,
      },
      anniu: {
        name2: null,
        qxbs: null,
      },
      xiuzuo: {
        name1: null,
        router: null,
      },
      xiuanniu: {
        name2: null,
        qxbs: null,
      },
      tableData1: [],
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    getRole1(data) {
      return getRole(data);
      // console.log( getRole(data));
    },
    // 初始化渲染
    async getdata() {
      const { data: res } = await this.$http.get("/menu/queryMenuTree");
      // console.log(res);
      if (res.code == 200) {
        this.tableData1 = res.data;
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    add(val) {
      this.pid = val;
      this.dialog = true;
    },
    async baocun() {
      let list = {
        menuName: this.domainSimpleVo.menuName1,
        menuUrl: this.domainSimpleVo.menuUrl1,
        sort: this.domainSimpleVo.xuhao1,
        menuType: this.domainSimpleVo.state1,
        pid: this.pid,
        name: this.domainSimpleVo.name1,
      };
      const { data: res } = await this.$http.post("menu/saveMenu", list);
      if (res.code == 200) {
        this.$message("添加成功");
        this.getdata();
        this.dialog = false;
      } else {
        this.dialog = false;
        this.$message(res.message);
      }
    },
    async del(val) {
      let list = {
        id: val,
      };
      const { data: res } = await this.$http.post("/menu/delMenuById", list);
      if (res.code == 200) {
        this.$message("删除成功");
        this.getdata();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    upload(val) {
      this.domainSimpleVo1.menuName11 = val.menuName;
      this.domainSimpleVo1.menuUrl11 = val.menuUrl;
      this.domainSimpleVo1.xuhao11 = val.sort;
      this.domainSimpleVo1.state11 = JSON.stringify(val.menuType);
      this.domainSimpleVo1.name11 = val.name;
      this.domainSimpleVo1.pid1 = val.pid;
      this.domainSimpleVo1.id1 = val.id;
      this.dialog1 = true;
    },
    async err() {
      let list = {
        id: this.domainSimpleVo1.id1,
        pid: this.domainSimpleVo1.pid1,
        menuName: this.domainSimpleVo1.menuName11,
        menuUrl: this.domainSimpleVo1.menuUrl11,
        sort: this.domainSimpleVo1.xuhao11,
        menuType: this.domainSimpleVo1.state11,
        name: this.domainSimpleVo1.name11,
      };
      const { data: res } = await this.$http.post("/menu/updateMenuById", list);
      if (res.code == 200) {
        this.dialog1 = false;
        this.$message("修改成功");
        this.getdata();
      } else if (res.code == 500) {
        this.$message(res.message);
      }
    },
    handleClose() {
      this.dialog = false;
    },
    handleClose1() {
      this.dialog1 = false;
    },
    handleClickes(tab, event) {
      console.log(tab, event);
    },
    user(val) {
      if (val == 0) {
        return "菜单";
      } else if (val == 1) {
        return "按钮";
      }
    },
    biaoji(val) {
      if (val == 0) {
        return "正常";
      } else if (val == 1) {
        return "删除";
      }
    },
  },
};
</script>

<style scoped lang='less'>
.right_main_under /deep/ .el-table__body tr:hover > td {
  background-color: rgba(3, 17, 35, 0.34901960784313724) !important;
}

.eright_main_under /deep/ .el-table__body tr.current-row > td {
  background-color: rgba(3, 17, 35, 0.34901960784313724) !important;
}
.el-table::before {
  height: 0px;
}
.el-table {
  border: 0;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: transparent;
}
.el-tabs--border-card {
  background: transparent;
  border: 0;
}
.right_main_under /deep/ .el-tabs__header {
  background-color: transparent !important;
}
.right_main_under /deep/ .el-form-item__label {
  color: #bfcbd9;
}
/deep/ tbody .el-table_1_column_1 {
  text-align: left !important;
}
</style>