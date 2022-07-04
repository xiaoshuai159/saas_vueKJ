<template>
  <div>
    <div class="login-wrap">
      <!-- 头部 -->
      <div class="top1">
        <div class="top1_title">
          <!-- 头部_一级标头 -->
          <div class="title">沈阳黑样本发现处理平台</div>
        </div>
        <!-- 头部_光条-->
        <div class="top1_line">
          <div class="top12_line">
            <div class="top12_line_son"></div>
          </div>
        </div>
      </div>
    <div class="ms-xxgx"></div>
      <div class="ms-login">
        <div class="ms-title">欢迎登录</div>
        <el-form
          :model="param"
          :rules="rules"
          ref="param"
          label-width="0px"
          class="ms-content"
          @keyup.enter.native="submitForm('param')"
        >
          <el-form-item prop="username">
            <el-input
              v-model="param.username"
              placeholder="请输入用户名"
              class="user"
            >
            </el-input>

            <!-- <el-button icon="el-icon-user" class="ic"></el-button>

          <el-select v-model="param.username" placeholder="用户名" style="width:17.6875rem">
            <el-option label="sadmin(超级)" value="sadmin"></el-option>
            <el-option label="admin(管理员)" value="admin"></el-option>
            <el-option label="bob(操作员)" value="bob）"></el-option>
          </el-select> -->
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="pwd"
              type="password"
              placeholder="请输入密码"
              v-model="param.password"
              @keyup.enter="submitForm()"
              show-password
            >
              <!--  -->
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <div
              type="primary"
              class="denglu"
              @click="submitForm('param')"
            ></div>
          </div>
        </el-form>
          <div class="login-tips"></div>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newarr: [],
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不能超出10个字符', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  created() {
    // this.$store.commit("clearTags");
  },
  methods: {
    submitForm(param) {
      this.$refs[param].validate(async (valid) => {
        if (valid) {
          try {
            const formData = new FormData()
            formData.append('username', this.param.username)
            formData.append('password', this.param.password)
            const res = await this.$http.post('/login', formData)
            // //   //将role数据从字符串的数组中截取出来
            //   let roleStr = res.data.data.roleNames.split('[')[1]
            /*  ROLE_ADMIN */
            //   let role = roleStr.split(']')[0]
            //   console.log(res)
            if (res.data.code == 200) {
              this.$message('登录成功')
              window.sessionStorage.setItem(
                'one',
                JSON.stringify(this.param.username)
              )
              window.sessionStorage.setItem(
                'pwd',
                JSON.stringify(this.param.password)
              )
              window.sessionStorage.setItem('isLogin', 'true')

              // window.sessionStorage.setItem("role", role);
              this.$router.push('/getUploadDomain')
            } else {
              this.$message('账号或密码错误！')
            }
          } catch (e) {
            this.$message.error(e)
          }
        } else {
          this.$message.error('请输入账号和密码')
          return false
        }
      })
    },
  },
}
</script>

<style scoped lang='less'>
@import '../common/font.css';
.top1 {
  width: 100%;
  height: 8%;
  /* background-color: blue; */
  /* border: 1px solid blue; */
  position: relative;
}
.title {
  position: absolute;
  left: 38%;
  top: 15%;
  font-family: 'heiti';
  font-size: 38px;
  letter-spacing: 5px /* 12/16 */;
  background-image: linear-gradient(0deg, #f8f8fb 0%, #8ec4fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* // text-shadow: 0px 1px 2px #fff */
}
.top1_title {
  height: 65px;
  width: 100%;
  background: url('../assets/newimg/newhome/dingbu.png') no-repeat 100% 100%;
  background-size: cover;
}
.top1_line {
  height: 15px;
  width: 100%;
}

.top12_line {
  width: 100%;
  height: 15px;
  position: relative;
  overflow: hidden;
  /* background-color: #1a6e9c; */
}
.top12_line_son {
  position: absolute;
  left: -100%;
  top: 0;
  width: 80%;
  height: 15px;
  background: url('../assets/newimg/newhome/guang.png') no-repeat;
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

.login-wrap {
  /* position: relative; */
  position: fixed;
  width: 100%;
  height: 100%;

  background: #ffffff00 url(../assets/Login/src/bg12.png) no-repeat 100% 100%;

  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 70px;
  text-align: center;
  font-size: 26px;
  color: #fff9fdc7;
  padding-top: 30px;
  letter-spacing: 8px;
  text-decoration: none;
  font-family: 'siyuanheitinormal1'; /*设置字体*/

  text-shadow: 0 0 5px #fffffd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 400px;
  transform: translate(-50%, -60%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  background: url(../assets/Login/src/dl1.png) no-repeat 100% 100%;
  background-size: 100% 100%;
  box-sizing: border-box;
  // border: 5px solid #000;
  // border-image-source: url(../assets/img/login/光效1.png);
  // /* 背景图片路径 */
  // border-image-slice: 0 0 30 0;
  // /* 如何切割图片 */
  // border-bottom-width: 20px;
}
.ms-content {
  padding: 20px 30px 50px;
  position: relative;
}
.login-btn {
  text-align: center;
  padding: 0 80px;
  box-sizing: border-box;
}
.login-btn button {
  width: 100%;
  height: 50px;
  /* margin-bottom: 10px; */
}
.login-tips {
  // position: absolute;
  // left: 50%;
  // top: 68%;
  width: 500px;
  height: 15px;
  // transform: translate(-50%, -60%);

  background: url(../assets/Login/src/gx1.png) no-repeat 100% 100%;
  background-size: 100% 100%;
  margin-top: 32px;
}
.edit {
  position: absolute;
  left: -1000px;
}
/deep/ .el-form-item {
  padding: 0 80px;
}
/deep/ .user {
  background: url(../assets/Login/src/user.png) no-repeat 100% 100%;
  background-size: 100% 100%;
}
/deep/ .pwd {
  background: url(../assets/Login/src/pwd.png) no-repeat 100% 100%;
  background-size: 100% 100%;
}
/deep/ .el-input__inner {
  background: transparent !important;
  padding-left: 50px !important;
  color: #fff !important;
  border: 1px solid transparent;
  letter-spacing: 1px;
}
/deep/ .el-form-item.is-error .el-input__inner {
  border-color: transparent;
}
/deep/ .el-input__inner:hover {
  border-color: transparent;
}
.denglu {
  cursor: pointer;
  height: 60px;
  background: url(../assets/Login/src/dlbtn.png) no-repeat 100% 100%;
  background-size: 100% 100%;
}
/deep/ .el-input__inner::-webkit-input-placeholder {
  color: #157fa7;
  font-size: 12px;
  //  -webkit-transform: scale(0.9); 
  font-weight: 600;
 
}
.ms-xxgx{
  position: relative;
  top: -1%;
  left: 15%;
    background: url(../assets/img/login/gxone.png) no-repeat 100% 100%;
  background-size: 100% 100%;
  width: 200px;
  height: 100px;
       animation: myfour 2s linear infinite;
}
@keyframes myfour {
    0%{opacity:.6;}
      25%{opacity:.8;}
      50%{opacity:1;}
     75%{opacity:.8;}
        100%{opacity:.6;}
}
</style>
