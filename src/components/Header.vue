<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <img src="@/assets/img/police.png" alt />
    <div class="logo">综合处置系统</div>
    <div class="collapse-btn" @click="collapseChage"></div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell"></div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="upload">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialog"
      width="30%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="原密码">
          <el-input v-model="newdomainSimpleVo.oldpwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newdomainSimpleVo.xinpwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="newdomainSimpleVo.xinpwd2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="up" type="primary" size="mini">修 改</el-button>
        <el-button type="primary" @click="dialog = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { sendWebsocket, closeWebsocket } from "@/utils/websocket.js";

export default {
  // inject: ["reload"],
  data() {
    return {
      newdomainSimpleVo: {
        oldpwd: "",
        xinpwd: "",
        xinpwd2: "",
      },
      dialog: false,
      fullscreen: false,
      message: 1,
      name: "wu",
      path: "",
      msgType: "",
      use: "",
      old: "",
    };
  },
  // created(){
  //     this.use=JSON.parse(window.sessionStorage.getItem('one'))
  //    console.log(whi.use);
  // },
  computed: {
    username() {
      let username = JSON.parse(window.sessionStorage.getItem("one"));
      // window.sessionStorage.setItem("userName", this.param.username);
      return username ? username : this.name;
    },
    collapse() {
      return this.$store.state.collapse;
    },
    pro() {
      return this.$store.state.webSocketMsg;
    },
  },

  methods: {
    async up() {
      let list = {
        oldPassword: this.newdomainSimpleVo.oldpwd,
        newPassword: this.newdomainSimpleVo.xinpwd,
        newPassword1: this.newdomainSimpleVo.xinpwd2,
      };
      const { data: res } = await this.$http.post("/user/modifyPwd", list);
      if (res.code == 200) {
        this.dialog = false;
        this.$message(res.data);
        this.$router.push("/login");
      } else {
        this.$message(res.data);
        this.dialog = false;
      }
    },
    //-------------------------------------------------------------------------------------
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        // localStorage.removeItem("ms_username");

        window.sessionStorage.clear();
        this.$router.push("/");
      } else if (command == "upload") {
        this.dialog = true;
        this.newdomainSimpleVo.oldpwd = JSON.parse(
          window.sessionStorage.getItem("pwd")
        );
      }
    },
    handleClose1() {
      this.dialog = false;
    },
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
};
</script>
<style scoped>
.item {
  position: absolute;
  top: -0.7rem;
  left: 1.4rem;
  margin-top: 0.5rem;
  margin-right: 2rem;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  /* border-bottom: 1px solid #fff; */
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
img {
  float: left;
  width: 35px;
  height: 35px;
  margin: 15px;
}
.header .logo {
  float: left;
  width: 135px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: -8px;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  position: absolute;
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
