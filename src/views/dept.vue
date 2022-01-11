<template>
  <div class="right_main_under">
    <div class="top">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="add">添加</el-button>
            <el-button type="primary" size="mini" @click="upload"
              >编辑</el-button
            >
            <el-button type="primary" size="mini" @click="del">删除</el-button>
          </div></el-col
        ></el-row
      >
    </div>
    <div class="bottom">
      <el-row>
        <el-col :span="3"
          ><div class="grid-content bg-purple">
            <span style="color: transparent">1</span>
          </div></el-col
        >
        <el-col :span="9"
          ><div class="grid-content bg-purple">
            <el-tree
              :data="data"
              node-key="id"
              ref="tree"
              :default-expanded-keys="[-1, 1, 27, 3, 4]"
              :default-checked-keys="[]"
              :props="defaultProps"
              @node-click="handleNodeClick"
              class="tree"
              :expand-on-click-node="false"
            >
            </el-tree></div
        ></el-col>
        <el-col :span="12" class="righttable"
          ><div class="grid-content bg-purple">
            <!-- 222222222222222222222222222222222222222222 -->
            <el-form
              v-show="yin"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item
                  label="父级节点"
                  class="search_select_form"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form.father"
                    placeholder="请输入父级节点"
                    disabled
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="节点编号"
                  class="search_select_form zi"
                  v-if="yingchang"
                  disabled
                >
                  <el-input
                    v-model="form.son"
                    placeholder="请输入节点编号"
                    style="width: 25rem"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="16">
                <el-form-item
                  label="排序"
                  class="search_select_form zi"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form.sort"
                    placeholder="请输入排序"
                    style="width: 25rem"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="16">
                <el-form-item label="部门名称" class="search_select_form zi">
                  <el-input
                    v-model="form.bm"
                    style="width: 25rem"
                    placeholder="请输入部门名称"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门电话" class="search_select_form zi">
                  <el-input
                    v-model="form.phone"
                    style="width: 25rem"
                    placeholder="请输入部门名称"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门地址" class="search_select_form zi">
                  <el-input
                    v-model="form.dz"
                    style="width: 25rem"
                    placeholder="请输入部门名称"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 222222222222222222222222222222222222222222 -->
            <!-- //添加 -->
            <el-form
              v-show="yin1"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item
                  label="父级节点"
                  class="search_select_form"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form1.son1"
                    placeholder="请输入父级节点"
                    disabled
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="16">
                <el-form-item
                  label="排序"
                  class="search_select_form zi"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form1.sort1"
                    placeholder="请输入排序"
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="16">
                <el-form-item label="所属部门" class="search_select_form zi">
                  <el-input
                    v-model="form1.bm1"
                    style="width: 25rem"
                    placeholder="请输入所属部门"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="添加部门" class="search_select_form zi">
                  <el-input
                    v-model="form1.addbm1"
                    style="width: 25rem"
                    placeholder="请输入添加部门"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门地址" class="search_select_form zi">
                  <el-input
                    v-model="form1.dz1"
                    style="width: 25rem"
                    placeholder="请输入部门地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门电话" class="search_select_form zi">
                  <el-input
                    v-model="form1.phone1"
                    style="width: 25rem"
                    placeholder="请输入部门电话"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item>
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-left: 5rem"
                    @click="tianjia"
                    >保存</el-button
                  >
                  <el-button type="primary" size="mini" @click="err"
                    >取消</el-button
                  >
                </el-form-item>
              </el-col>
            </el-form>

            <!-- 222222222222222222222222222222222222222222 -->
            <!-- //编辑 -->
            <el-form
              v-show="yin2"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item
                  label="父级节点"
                  class="search_select_form"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form2.son2"
                    placeholder="请输入父级节点"
                    disabled
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="部门名称" class="search_select_form zi">
                  <el-input
                    v-model="form2.bm2"
                    style="width: 25rem"
                    placeholder="请输入要修改的部门名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门地址" class="search_select_form zi">
                  <el-input
                    v-model="form2.dz2"
                    style="width: 25rem"
                    placeholder="请输入要修改的部门地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门电话" class="search_select_form zi">
                  <el-input
                    v-model="form2.phone2"
                    style="width: 25rem"
                    placeholder="请输入要修改的部门电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="16">
                <el-form-item
                  label="排序"
                  class="search_select_form zi"
                  v-if="yingchang"
                >
                  <el-input
                    v-model="form2.sort2"
                    placeholder="请输入排序"
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col> -->

              <el-col :span="16">
                <el-form-item>
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-left: 5rem"
                    @click="xiugai"
                    >修改</el-button
                  >
                  <el-button type="primary" size="mini" @click="err"
                    >取消</el-button
                  >
                </el-form-item>
              </el-col>
            </el-form>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "bumen",
  data() {
    return {
      yingchang: false,
      yin: true,
      yin1: false,
      yin2: false,
      newson: "",
      newfather: "",
      loading2: false,
      loading1: false,
      disabled: true,
      loading: true,
      treezhankai: [],
      quehuan: true,
      form: {
        father: "",
        son: "",
        bm: "",
        sort: "",
        phone: "",
        dz: "",
      },
      form1: {
        phone1: "",
        dz1: "",
        // father1: "",
        son1: "",
        bm1: "",
        sort1: "",
        addbm1: "",
        phone1: "",
        dz1: "",
      },
      form2: {
        // father2: "",
        son2: "",
        bm2: "",
        sort2: "",
        dz2: "",
        phone2: "",
        id2: "",
      },
      data: [
        // {
        //   id: 1,
        //   deptName: "四川省公安厅",
        //   deptPhone: null,
        //   deptAddr: null,
        //   sort: 1,
        //   createTime: null,
        //   updateTime: "",
        //   isdel: 1,
        //   remark: null,
        //   children: [
        //     {
        //       id: 2,
        //       deptName: "成都市公安局",
        //       deptPhone: null,
        //       deptAddr: null,
        //       sort: 2,
        //       createTime: null,
        //       updateTime: null,
        //       isdel: 1,
        //       remark: null,
        //       children: [
        //         {
        //           id: 3,
        //           deptName: "青羊区分局",
        //           deptPhone: null,
        //           deptAddr: null,
        //           sort: 3,
        //           createTime: null,
        //           updateTime: null,
        //           isdel: 1,
        //           remark: null,
        //           children: [
        //             {
        //               id: 5,
        //               deptName: "成都市青羊区XX街道派出所",
        //               deptPhone: null,
        //               deptAddr: null,
        //               sort: 4,
        //               createTime: null,
        //               updateTime: null,
        //               isdel: 1,
        //               remark: null,
        //               children: null,
        //               pid: 3,
        //               check: true,
        //             },
        //           ],
        //           pid: 2,
        //           check: true,
        //         },
        //         {
        //           id: 4,
        //           deptName: "成都市XX县公安局",
        //           deptPhone: null,
        //           deptAddr: null,
        //           sort: 3,
        //           createTime: null,
        //           updateTime: null,
        //           isdel: 1,
        //           remark: null,
        //           children: [
        //             {
        //               id: 6,
        //               deptName: "成都市XX县XX街道派出所",
        //               deptPhone: null,
        //               deptAddr: null,
        //               sort: 4,
        //               createTime: null,
        //               updateTime: null,
        //               isdel: 1,
        //               remark: null,
        //               children: null,
        //               pid: 4,
        //               check: true,
        //             },
        //           ],
        //           pid: 2,
        //           check: true,
        //         },
        //       ],
        //       pid: 1,
        //       check: true,
        //     },
        //   ],
        //   pid: -1,
        //   check: true,
        // },
      ],
      defaultProps: {
        children: "children",
        label: "deptName",
      },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //初次渲染
    async getdata() {
      const { data: res } = await this.$http.get("/dept/queryDeptList");
      console.log(res);
      if (res.code == 200) {
        const newArrObject = {};
        const newARrr = [];
        const newArrlist = [];
        newArrObject.check = true;
        newArrObject.children = [];
        newArrObject.createTime = null;
        newArrObject.deptAddr = null;
        newArrObject.deptName = "公安部";
        newArrObject.deptPhone = null;
        newArrObject.id = -1;
        newArrObject.isdel = 1;
        // newArrObject.pid = -2;
        newArrObject.remark = "公安部";
        newArrObject.sort = 1;
        newArrObject.updateTime = "";
        // console.log(newArrObject);
        // newArrObject.children.push(res.data);
        //  console.log(newARrr.push(newArrObject.children.push(res.data)));
        //  console.log(newArrlist);
        res.data.forEach((item) => {
          newArrObject.children.push(item);
        });
        //  newArrObject.children.push(res.data)
        newARrr.push(newArrObject);
        this.data = [];
        this.data = newARrr;
        //  console.log(this.data);
      } else if (res.code == 500) {
        this.dialogVisible = false;
        this.$message(res.message);
      }
    },
    //删除
    del() {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const list = {
            id: this.form.son,
          };
          const { data: res } = await this.$http.post("/dept/delDept", list);
          // console.log(res);
          if (res.code == 200) {
            // this.$message(res.message);
            this.zhikong();
            this.getdata();
          } else if (res.code == 500) {
            this.dialogVisible = false;
            this.$message(res.message);
          }
          // else {
          //   this.$message(res.message);
          // }
          this.$message("删除成功!");
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    //添加保存
    async tianjia() {
      const list = {
        deptName: this.form1.addbm1,
        pId: this.form1.son1,
        // sort: this.form1.sort1,
        deptAddr: this.form1.dz1,
        deptPhone: this.form1.phone1,
      };
      const { data: res } = await this.$http.post("/dept/addDept", list);
      if (res.code == 200) {
        this.$message(res.data);
        this.getdata();
        this.zhikong();
      } else {
        this.$message(res.data);

        this.zhikong();
      }
    },
    async xiugai() {
      if (this.form2.id2 == -1) {
        this.$message({
          message: "公安部不可修改",
          type: "warning",
        });
      } else {
        const list = {
          deptName: this.form2.bm2,
          pId: this.form2.son2,
          id: this.form2.id2,
          deptAddr: this.form2.dz2,
          deptPhone: this.form2.phone2,
        };
        console.log(list);
        const { data: res } = await this.$http.post("/dept/updateDept", list);
        if (res.code == 200) {
          this.$message(res.data);
          this.getdata();
          this.zhikong1();
        } else {
          this.$message(res.data);
          this.zhikong1();
        }
      }
    },
    zhikong() {
      // this.form.father = "";
      this.form1.son1 = "";
      // this.form1.sort1 = "";
      this.form1.bm1 = "";
      this.form1.addbm1 = "";
      this.form1.phone1 = "";
      this.form1.dz1 = "";
    },
    zhikong1() {
      // this.form.father = "";
      this.form2.son2 = "";
      // this.form2.sort2 = "";
      this.form2.bm2 = "";
      this.form2.phone2 = "";
      this.form2.dz2 = "";
    },
    handleNodeClick(data) {
      console.log(data);
      this.form.father = data.pid;
      this.form.son = data.id;
      this.form.bm = data.deptName;
      // this.form.sort = data.sort;
      this.form.phone = data.deptPhone;
      this.form.dz = data.deptAddr;
      this.form1.son1 = data.id;
      this.form1.bm1 = data.deptName;

      // this.form1.bm1 = data.deptName;
      // this.form1.sort1 = data.sort;
      this.form2.son2 = data.pid;
      this.form2.bm2 = data.deptName;
      // this.form2.sort2 = data.sort;
      this.form2.dz2 = data.deptAddr;
      this.form2.phone2 = data.deptPhone;
      this.form2.id2 = data.id;
      this.treezhankai.push(data.id);
    },
    // 添加
    add() {
      this.yin = false;
      this.yin1 = true;
      this.yin2 = false;
    },
    upload() {
      this.yin = false;
      this.yin1 = false;
      this.yin2 = true;
    },
    err() {
      this.yin = true;
      this.yin1 = false;
      this.yin2 = false;
      this.zhikong1();
      this.zhikong();
      // this.form2.bm2=""
    },
  },
};
</script>

<style scoped lang='less'  >
.bottom {
  margin-top: 1.875rem /* 30/16 */ /* 600/16 */;
}
.tree {
  /* background-color: rgb(1, 22, 45); */
  background-color: transparent;
  color: #bfcbd9;
}
.el-tree-node__content:hover {
  background-color: #909090 !important;
}
.zi {
  color: #909090;
}
.right_main_under /deep/ .el-input.is-disabled .el-input__inner {
  color: #000;
}

/* .el-tree-node.is-current > .el-tree-node__content {
 
         background-color: #909090 !important;
 
} */
/* .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
   background-color: #909090 !important;
} */
.right_main_under /deep/ .el-input__inner {
  background-color: #fff;
  color: #000;
}
/deep/ .el-tree-node__label {
  font-size: 22px;
  line-height: 22px;
}
/deep/ .el-tree-node__content {
  height: 40px !important;
}
.righttable {
  padding-top: 20px;
}
</style>