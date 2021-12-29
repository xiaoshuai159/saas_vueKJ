<template>
  <div class="right_main_under">
    <div class="top">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="add">添加</el-button>
            <el-button type="primary" size="mini" @click="add1">编辑</el-button>
            <el-button type="primary" size="mini" @click="del">删除</el-button>
          </div></el-col
        ></el-row
      >
      <el-row>
        <el-col :span="24" class="topone">
          <span class="wenzi"
            >*请先选择下列部门，在进行添加，编辑，删除操作</span
          >
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <span class="i">.</span>
          </div></el-col
        >
        <el-col :span="16" class="zhong"
          ><div class="grid-content bg-purple">
            <el-tree
              :data="data"
              node-key="id"
              ref="tree"
              default-expand-all
              :props="defaultProps"
              @node-click="handleNodeClick"
              class="tree"
            >
            </el-tree></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <span class="i">.</span>
          </div></el-col
        >
        <!-- ++++++++++++++++++++++++++++++++++++++++++++= -->
        <el-dialog
          title="添加"
          :visible.sync="dialogVisible"
          width="45%"
          :before-close="handleClose"
          :close-on-click-modal="false"
          class="dialogInfo"
        >
          <el-form
            size="mini"
            :inline="true"
            style="margin-left: 3rem"
            label-width="80px"
          >
            <el-form-item
              label="父级节点"
              class="search_select_form"
              v-if="yin2"
            >
              <el-input
                v-model="form1.son1"
                placeholder="请输入父级节点"
                disabled
                style="width: 25rem"
              ></el-input>
            </el-form-item>

            <el-form-item label="部门名称" class="search_select_form zi">
              <el-input
                v-model="form1.bm1"
                style="width: 25rem"
                placeholder="请输入部门名称"
              ></el-input>
            </el-form-item>

            <el-form-item label="排序" class="search_select_form zi">
              <el-input
                v-model="form1.sort1"
                placeholder="请输入排序"
                style="width: 25rem"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="tianjia" type="primary" size="mini"
              >添加</el-button
            >
            <el-button type="primary" @click="dialogVisible = false" size="mini"
              >取消</el-button
            >
          </span>
        </el-dialog>
        <!-- ++++++++++++++++++++++++++++++++++++++++++++ -->

        <el-dialog
          title="编辑"
          :visible.sync="dialogVisible1"
          width="45%"
          :before-close="handleClose1"
          :close-on-click-modal="false"
          class="dialogInfo"
        >
          <el-form
            size="mini"
            :inline="true"
            style="margin-left: 3rem"
            label-width="80px"
          >
            <el-form-item
              label="父级节点"
              class="search_select_form"
              v-if="yin2"
            >
              <el-input
                v-model="form2.son2"
                placeholder="请输入父级节点"
                disabled
                style="width: 25rem"
              ></el-input>
            </el-form-item>

            <el-form-item label="部门名称" class="search_select_form zi">
              <el-input
                v-model="form2.bm2"
                style="width: 25rem"
                placeholder="请输入部门名称"
              ></el-input>
            </el-form-item>

            <el-form-item label="排序" class="search_select_form zi">
              <el-input
                v-model="form2.sort2"
                placeholder="请输入排序"
                style="width: 25rem"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="xiugai" type="primary" size="mini"
              >保存</el-button
            >
            <el-button
              type="primary"
              @click="dialogVisible1 = false"
              size="mini"
              >取消</el-button
            >
          </span>
        </el-dialog>
        <!-- <div class="grid-content bg-purple"> -->
        <!-- 222222222222222222222222222222222222222222 -->
        <!-- <el-form
              v-show="yin"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item label="父级节点" class="search_select_form">
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
                  v-if="loading"
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
                <el-form-item label="排序" class="search_select_form zi">
                  <el-input
                    v-model="form.sort"
                    placeholder="请输入排序"
                    style="width: 25rem"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col> -->
        <!-- </el-form> -->
        <!-- <el-col :span="16">
                <el-form-item v-if="loading1">
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
                <el-form-item v-if="loading2">
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
              </el-col> -->

        <!-- 222222222222222222222222222222222222222222 -->
        <!-- //添加 -->
        <!-- <el-form
              v-show="yin1"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item label="父级节点" class="search_select_form">
                  <el-input
                    v-model="form1.son1"
                    placeholder="请输入父级节点"
                    disabled
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="部门名称" class="search_select_form zi">
                  <el-input
                    v-model="form1.bm1"
                    style="width: 25rem"
                    placeholder="请输入部门名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="排序" class="search_select_form zi">
                  <el-input
                    v-model="form1.sort1"
                    placeholder="请输入排序"
                    style="width: 25rem"
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
            </el-form> -->

        <!-- 222222222222222222222222222222222222222222 -->
        <!-- //编辑 -->
        <!-- <el-form
              v-show="yin2"
              size="mini"
              :inline="true"
              style="margin-left: 3rem"
              label-width="80px"
            >
              <el-col :span="16">
                <el-form-item label="父级节点" class="search_select_form">
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
                    placeholder="请输入部门名称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="排序" class="search_select_form zi">
                  <el-input
                    v-model="form2.sort2"
                    placeholder="请输入排序"
                    style="width: 25rem"
                  ></el-input>
                </el-form-item>
              </el-col>

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
            </el-form> -->
        <!-- </div> -->
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "bumen",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      // yin: true,
      // yin1: false,
      yin2: false,
      newson: "",
      newfather: "",
      quehuan: true,
      form: {
        father: "",
        son: "",
        bm: "",
        sort: "",
      },
      form1: {
        // father1: "",
        son1: "",
        bm1: "",
        sort1: "",
      },
      form2: {
        // father2: "",
        son2: "",
        bm2: "",
        sort2: "",
        id2:'',
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
      newdata: [],
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //初次渲染
    async getdata() {
      const { data: res } = await this.$http.get("/dept/queryDeptList");
      // console.log(res);
       if (res.code == 200) {
        const newArrObject = {};
        const newARrr = [];
        const newArrlist=[]
        newArrObject.check = true;
        newArrObject.children = [];
        newArrObject.createTime = null;
        newArrObject.deptAddr = null;
        newArrObject.deptName = "最高级";
        newArrObject.deptPhone = null;
        newArrObject.id = -1;
        newArrObject.isdel = 1;
        // newArrObject.pid = -2;
        newArrObject.remark = "最高级";
        newArrObject.sort = 1;
        newArrObject.updateTime = "";
        // console.log(newArrObject);
        // newArrObject.children.push(res.data);
        //  console.log(newARrr.push(newArrObject.children.push(res.data))); 
      //  console.log(newArrlist); 
        res.data.forEach(item => {
          newArrObject.children.push(item)
        });
      //  newArrObject.children.push(res.data)
       newARrr.push(newArrObject)
     this.data=[]
     this.data=newARrr
    //  console.log(this.data);
      }
    },
    //删除
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
      if (
        this.form1.bm1 == "" &&
        this.form1.son1 == "" &&
        this.form1.sort1 == ""
      ) {
        this.$message("请先选择部门，在进行添加");
        this.dialogVisible = false;
      } else {
        const list = {
          deptName: this.form1.bm1,
          pId: this.form1.son1,
          sort: this.form1.sort1,
        };
        const { data: res } = await this.$http.post("/dept/addDept", list);
        if (res.code == 200) {
          this.$message(res.message);
          this.getdata();
          this.zhikong();
          this.dialogVisible = false;
        } else {
          this.$message(res.message);
          this.dialogVisible = false;
          this.zhikong();
        }
      }
    },
    async xiugai() {
      if (
        this.form2.bm2 == "" &&
        this.form2.son2 == "" &&
        this.form2.sort2 == ""
      ) {
        this.$message("请先选择部门，在进行修改");
        this.dialogVisible1 = false;
      } else {
        const list = {
          deptName: this.form2.bm2,
          sort: this.form2.sort2,
          pId: this.form2.son2,
          id:this.form2.id2
        };
        const { data: res } = await this.$http.post("/dept/updateDept", list);
        if (res.code == 200) {
          this.$message(res.message);
          this.getdata();
          this.zhikong1();
          this.dialogVisible1 = false;
        } else {
          this.$message(res.data);
          this.zhikong1();
          this.dialogVisible1 = false;
        }
      }
    },
    zhikong() {
      // this.form.father = "";
      this.form1.son1 = "";
      this.form1.sort1 = "";
      this.form1.bm1 = "";
    },
    zhikong1() {
      // this.form.father = "";
      this.form2.son2 = "";
      this.form2.sort2 = "";
      this.form2.bm2 = "";
    },
    handleNodeClick(data) {
      console.log(data);
      this.form.father = data.pid;
      this.form.son = data.id;
      this.form.bm = data.deptName;
      this.form.sort = data.sort;
      this.form1.son1 = data.id;
      // this.form1.bm1 = data.deptName;
      // this.form1.sort1 = data.sort;
      this.form2.son2 = data.pid;
      this.form2.bm2 = data.deptName;
      this.form2.sort2 = data.sort;
        this.form2.id2 = data.id;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose1() {
      this.dialogVisible = false;
    },
    // 添加
    add() {
      // this.zhikong()
      this.dialogVisible = true;
      // this.yin = false;
      // this.yin1 = true;
      // this.yin2 = false;
    },
    add1() {
      this.dialogVisible1 = true;
      // this.yin = false;
      // this.yin1 = false;
      // this.yin2 = true;
    },
    err() {
      // this.yin = true;
      // this.yin1 = false;
      // this.yin2 = false;
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
.right_main_under /deep/ .el-tree-node__label {
  font-size: 20px;
  font-family: "\534E\6587\7EC6\9ED1";
}
.zhong {
  border: 1px solid #909090;
  border-radius: 5px;
  padding: 10px;
}
.el-tree-node__content:hover {
  background-color: #909090 !important;
}
.zi {
  color: #909090;
}
.right_main_under /deep/ .el-input.is-disabled .el-input__inner {
  color: #fff;
}
.i {
  color: transparent;
}
.topone {
  padding-left: 3rem;
  margin-top: 2rem;
}
.wenzi {
  // float: right;
  color: rgb(172, 15, 15);
  font-size: 10px;
}
/* .el-tree-node.is-current > .el-tree-node__content {
 
         background-color: #909090 !important;
 
} */
/* .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
   background-color: #909090 !important;
} */
</style>