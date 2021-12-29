<template>
  <div class="right_main_under">
    <!-- <h3>系统管理</h3> -->
    <!-- <el-divider></el-divider> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 用户管理 -->
      <el-tab-pane label="用户管理" class="one" name="first">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          size="mini"
        >
          <el-form-item label="用户名" class="chang">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" class="chang">
            <el-input v-model="formLabelAlign.user"></el-input>
          </el-form-item>
          <el-form-item label="警号" class="chang">
            <el-input v-model="formLabelAlign.jh"></el-input>
          </el-form-item>
          <el-form-item label="原密码" class="chang">
            <el-input v-model="formLabelAlign.pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" class="chang">
            <el-input v-model="formLabelAlign.newpwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" class="chang">
            <el-input v-model="formLabelAlign.errpwd"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="region" class="chang">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="成都市公安局" value="chengduo"></el-option>
              <el-option label="未知" value="weizhi"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button>确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 权限配置 -->
      <el-tab-pane label="权限配置" class="one" name="second">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          size="mini"
        >
          <el-form-item label="用户名" class="chang">
            <el-input v-model="newformLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="姓名" class="chang">
            <el-input v-model="newformLabelAlign.user"></el-input>
          </el-form-item>
          <el-form-item label="警号" class="chang">
            <el-input v-model="newformLabelAlign.jh"></el-input>
          </el-form-item>
          <el-form-item label="部门" class="chang">
            <el-select v-model="newruleForm.region" placeholder="请选择">
              <el-option label="成都市公安局" value="chengduo"></el-option>
              <el-option label="未知" value="weizhi"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" class="chang">
           <el-select v-model="ruleForm.js" placeholder="请选择">
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="普通用户" value="pt"></el-option>
            </el-select>
          </el-form-item>
     <el-form-item label="选择开通模块">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="预警" name="type"></el-checkbox>
      <el-checkbox label="反制" name="type"></el-checkbox>
      <el-checkbox label="侦察" name="type"></el-checkbox>
      <el-checkbox label="管控" name="type"></el-checkbox>
       <el-checkbox label="警情" name="type"></el-checkbox>
      <el-checkbox label="可视化" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
          <el-form-item>
            <el-button>确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "rulemange",
  data() {
    return {
      activeName: "first",
      labelPosition: "top",
      formLabelAlign: {
        name: "",
        user: "",
        jh: "",
        pwd: "",
        newpwd: "",
        errpwd: "",
      },
      newformLabelAlign: {
        name: "",
        user: "",
        jh: "",
        bm:'',
      
      
      },
      ruleForm: {
        region: "",
      },
        newruleForm: {
        region: "",
        js:''
      },
      form:{
        type:''
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style scope>
.el-tabs__item {
  color: #fff;
}
.chang {
  width: 500px;
}
</style>