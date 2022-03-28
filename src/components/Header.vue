<template>
  <div class="header">
 

    <div class="dp_top">
      <!-- 预留 -->
      <div class="logo">沈阳黑样本发现处理平台</div>
      <!-- <div class="nav">
        <el-button
          size="mini"
          type="primary"
          class="navnum"
          v-for="(item, index) in daohangnum"
          :key="index"
              :class="['/'+item.name !== $route.path?'':'yangshi']"
          @click="navclick(item.name, item.menuName)"
     
          >{{ item.menuName }}</el-button
        >
      </div> -->
      <!-- 返回按钮 -->
      <!-- <div>
        <div class="fanhui" @click="ret1">
          <img src="../assets/img/shouye/返回按钮.png" alt="" />
        </div>
      </div> -->
      <div class="topguanli">
        <!-- <span class="img"> -->
        <!-- <img src="../assets/img/guanliyuan.png" alt="" /> </span
          > -->
        <!-- <span class="guanliy">管理员</span
          ><span class="tuichu" @click="tuichu">退出</span> -->
        <div class="role">
          <img :src="require('../assets/img/shouye/guanliyuan.png')" alt="" />
          <el-dropdown
            class="user-name"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              {{ username }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="upload" >修改密码</el-dropdown-item>
                <el-dropdown-item divided command="loginout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div>
        <!-- <button><span></span>返回</button> -->
      </div>
      <!-- <div class="fanhui" @click="tuichudapin" style="padding-top: 10px">
          退出大屏
        </div> -->

      <!-- <div class="fanhui">退出大屏</div> -->
    </div>
    <!-- 头部_光条-->
    <div class="top1_line">
      <!-- <div class="top11_line"></div> -->
      <div class="top12_line">
        <div class="top12_line_son"></div>
      </div>
      <!-- <div class="top13_line"></div> -->
    </div>
    <!-- ============================== -->

    <!-- ============================== -->
    <!-- </div>
    </div> -->

    <el-dialog
      title="修改密码"
      :visible.sync="dialog"
      width="30%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        :rules="rules"
        ref="newdomainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <el-form-item label="原密码" prop="oldpwd">
          <el-input
            v-model="newdomainSimpleVo.oldpwd"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="oldpwd" style="visibility: hidden" v-if="yinc">
          <el-input
            v-model="newdomainSimpleVo.oldpwd"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="xinpwd">
          <el-input
            v-model="newdomainSimpleVo.xinpwd"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="xinpwd2">
          <el-input
            v-model="newdomainSimpleVo.xinpwd2"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="submitForm('newdomainSimpleVo')"
          type="primary"
          size="mini"
      
          >修 改</el-button
        >
        <el-button   type="primary" @click="err" size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { sendWebsocket, closeWebsocket } from "@/utils/websocket.js";

export default {
  // inject: ["reload"],
  data() {
    let pwd = JSON.parse(window.sessionStorage.getItem('pwd'))
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else if (value !== pwd) {
        callback(new Error('原密码不正确!'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newdomainSimpleVo.xinpwd) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldpwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'change',
          },
          {
            validator: validatePwd,
            trigger: 'blur',
            required: true,
          },
        ],
        xinpwd: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
          { min: 8, max: 12, message: '密码长度为8到12位', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: '格式不正确，请输入数字与字母组合',
            trigger: 'blur',
          },
        ],

        xinpwd2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'change',
          },
          {
            validator: validatePass2,
            trigger: 'blur',
            required: true,
          },
        ],
      },
      newdomainSimpleVo: {
        oldpwd: '',
        xinpwd: '',
        xinpwd2: '',
      },
      yinc:false,
      dialog: false,
      fullscreen: false,
      message: 1,
      name: 'wu',
      path: '',
      msgType: '',
      use: '',
      old: '',
      daohangtitle: '',
      daohangnum: [],
      namenav: '',
    }
  },
  created() {
    // console.log(this.$route.path);
    // this.namenav=window.location.search
    // this.namenav = this.$route.query.name

    // this.daohang()
  },
  // watch: {
  //   $route: 'getPath',
  // },
  computed: {
    username() {
      let username = JSON.parse(window.sessionStorage.getItem('one'))
      // window.sessionStorage.setItem("userName", this.param.username);
      return username ? username : this.name
    },
    collapse() {
      return this.$store.state.collapse
    },
    pro() {
      return this.$store.state.webSocketMsg
    },
  },

  methods: {
    // getPath() {
      // this.namenav = this.$route.query.name
      // this.daohang()
    // },
    //头部动态导航
    navclick(val) {
      this.$router.push('/' + val)
      //  this.daohang()
    },
    // async daohang() {
    //   this.daohangtitle = this.$route.path.slice(1, this.$route.path.length)
    //   // console.log(this.daohangtitle)
    //   // console.log(this.daohangtitle)
    //   const { data: res } = await this.$http.post('/menu/queryUserMenuList')
    //   if (res.code == 200) {
    //     // console.log(res.data)
    //     for (var i = 0; i < res.data.length; i++) {
    //       // console.log(res.data[i]);
    //       if (res.data[i].children != null && res.data[i].children.length > 1) {
    //         for (var j = 0; j < res.data[i].children.length; j++) {
    //           if (this.daohangtitle == res.data[i].children[j].name) {
    //             this.namenav = res.data[i].menuName
    //             this.daohangnum = res.data[i].children
    //             // console.log(  this.daohangnum);
    //           }
    //         }
    //       } else {
    //         if (this.daohangtitle == res.data[i].name) {
    //           this.namenav = res.data[i].menuName
    //           this.daohangnum = []
    //         }
    //       }
    //     }
    //     // console.log(res.data);
    //     // for (var i = 0; i < res.data.length; i++) {
    //     //   // let that=this
    //     //   // console.log(JSON.parse(res.data[i].name ));
    //     //   // console.log(res.data[i].menuUrl ,this.daohangtitle);

    //     //   if (res.data[i].menuUrl == this.daohangtitle) {
    //     //     this.daohangnum = res.data[i].children
    //     //     this.namenav = res.data[i].menuName

    //     //   }
    //     // }
    //   }
    // },
    submitForm(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.up()
          // this.dialogVisible = false
          this.$nextTick(() => {
            that.$refs['newdomainSimpleVo'].clearValidate()
          })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    err() {
      this.newdomainSimpleVo.oldpwd = ''
      let that = this
      this.$nextTick(() => {
        that.$refs['newdomainSimpleVo'].clearValidate()
      })
      this.dialog = false
    },
    async up() {
      let list = {
        oldPassword: this.newdomainSimpleVo.oldpwd,
        newPassword: this.newdomainSimpleVo.xinpwd,
        newPassword1: this.newdomainSimpleVo.xinpwd2,
      }
      const { data: res } = await this.$http.post('/user/modifyPwd', list)
      if (res.code == 200) {
        this.dialog = false
        this.$message(res.data)
        this.$router.push('/')
      } else {
        this.$message(res.data)
        this.dialog = false
      }
    },
    //-------------------------------------------------------------------------------------
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == 'loginout') {
        // localStorage.removeItem("ms_username");

        window.sessionStorage.clear()
        this.$router.push('/')
      } else if (command == 'upload') {
        this.dialog = true
        // this.newdomainSimpleVo.oldpwd = JSON.parse(
        //   window.sessionStorage.getItem('pwd')
        // )
      }
    },
    // ret1() {
    //   this.$router.push('/shouye')
    // },
    handleClose1() {
      this.dialog = false
    },
    collapseChage() {
      this.$store.commit('hadndleCollapse', !this.collapse)
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  },
}
</script>
<style scoped lang='less'>
@import '../common/font.css';
.dialog-footer /deep/ .el-button-xitongerr{
    background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}

.dialog-footer /deep/ .el-button-xitongerr:focus,
.dialog-footer /deep/ .el-button-xitongerr:hover {
  background: url(../assets/img/shouye/确定按钮.png) no-repeat;
  background-size: cover;
  border: none;
  color: #25c0fd;
}
.dialog-footer /deep/ .el-button-xitongup{
    background: url(../assets/img/shouye/取消按钮.png) no-repeat;
  background-size: cover;
  border: none;
}
.dialog-footer /deep/ .el-button-xitongup:focus,
.dialog-footer /deep/ .el-button-xitongup:hover {
  background: url(../assets/img/shouye/取消按钮.png) no-repeat;
  background-size: cover;
  border: none;
}
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
      background-color: #031123;
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
  /* width: 35px;
  height: 35px;
  margin: 15px; */
}
.header .logo {
  position: absolute;
  left: 36.5%;
  top: 18%;
  font-family: 'heiti';
  font-size: 38px;
  /* letter-spacing: 5px ; */
  background-image: linear-gradient(0deg, #f8f8fb 0%, #8ec4fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 27%;
  text-align: center;
    text-shadow: 0 0 20px rgba(0, 121, 255,.5);
letter-spacing: 5px
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
/* ++++++++++ */
.dp_top {
  width: 100%;
  height: 60px;
  background: url(../assets/newimg/newhome/顶部.png) no-repeat 100% 100%;
  // background-position: 0;
  background-size: cover;
  position: relative;
  /* background-color: red; */
}
.dp_top .img {
  display: block;
  float: left;
}

.dp_top .topguanli {
  width: 8.1% /* 150/16 */ /* 277/16 */;
  height: 50% /* 30/16 */ /* 35/16 */;
  position: absolute;
  right: 0%;
  top: 20%;
}
.role {
  height: 30px /* 30/16 */;
}
.role img {
  height: 30px;
  /* margin-top:10px */
}
// .nav {
//   position: absolute;
//   width: 500px;
//   height: 50%;
//   right: 10%;
//   top: 20%;
// }
.navnum {
  cursor: pointer;
  float: right;
  margin-left: 0 !important;
  margin-right: 1%;
  color: #ecf5ff;
  // background-color: #409eff80;
  // border-color: #1a5da0;
  background: url(../assets/img/shouye/未选中.png) no-repeat;
  background-size: 100% 100%;
  border:0px
}
.navnum:hover,
.navnum:focus{
   cursor: pointer;
  float: right;
  margin-left: 0 !important;
  margin-right: 1%;
  color: #ecf5ff;
  // background-color: #409eff80;
  // border-color: #1a5da0;
  background: url(../assets/img/shouye/选中1.png) no-repeat;
  background-size: 100% 100%;
  border:0px
}
//当前样式
.yangshi{
 background: url(../assets/img/shouye/选中1.png) no-repeat;
  background-size: 100% 100%;
}
.fanhui {
  position: absolute;
  left: 0.5%;
  top: 15%;
  cursor: pointer;
 
}
.fanhui img{
   width: 75px;
  height: 40px;
}
.top1_line {
  height: 10px;
  width: 100%;

  // background: url('../assets/newimg/newhome/光.png') no-repeat;
  // background-size: 100% 100%;
}
// .top11_line,
// .top12_line,
// .top13_line {
//   float: left;
// }
// .top11_line,
// .top13_line {
//   width: 10%;
//   height: 10px;
// }
.top12_line {
  width: 100%;
  height: 10px;
  position: relative;
  overflow: hidden;
}
.top12_line_son {
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 10px;
  background: url('../assets/newimg/newhome/光.png') no-repeat;
  background-size: 100% 100%;
  animation: myfirst 5s linear normal;
  animation-iteration-count: infinite;
}
@keyframes myfirst {
  0% {
    left: -80%;
    top: 0px;
  }
  10% {
    left: -60%;
    top: 0px;
  }
  20% {
    left: -40%;
    top: 0px;
  }
  30% {
    left: -20%;
    top: 0px;
  }
  40% {
    left: 0%;
    top: 0px;
  }
  50% {
    left: 20%;
    top: 0px;
  }
  60% {
    left: 40%;
    top: 0px;
  }
  70% {
    left: 60%;
    top: 0px;
  }
  80% {
    left: 80%;
    top: 0px;
  }
  90% {
    left: 90%;
    top: 0px;
  }
  100% {
    left: 100%;
    top: 0px;
  }
}

.dialogInfo /deep/ .el-dialog {
  border: 1px solid #224c77;
    background-color:#01162d;
  // background: #021c2d url(../assets/img/shouye/背景框.png) no-repeat;
  // background-size: 100% 100%;
  padding: 10px;
   opacity: .85;
  box-sizing: border-box;
  .el-dialog__headerbtn {
    top: 0px !important;
    right: 6px !important;
    .el-dialog__close {
      color: #fff;
      font-size: 14px;
    }
  }
  .el-dialog__header {
    margin: 20px 50px 0px 40px;
    // background: url(../assets/img/shouye/标题矩形.png) no-repeat;
  // background-color:#01162d;
  // background-size: 100% 100%;
  border-bottom: 1px solid #224c77;
  }
  .el-dialog__title,
  .gailan h3,
  .gailan1 h3 {
    color: #2fbcfc;
  }
  .gailan h3,
  .gailan1 h3 {
    padding-left: 10px;
  }
}
/deep/  .search_select_form .el-form-item__label{
 color: #b9e6ff; 
}
</style>
