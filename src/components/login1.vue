<template>
  <div class="login-wrap">
    <!-- <div><img :src="imgurl" alt="imgurl" style="width:150px;height:120px;margin-left:10%"></div> -->
    <div><img :src="imgurl" alt="imgurl" title="登录页面" style="width:60px;height:60px;margin-left:20%;cursor:pointer;"></div>
    <div class="login1">
      <el-form :rules="rules" class="login-container" ref="loginForm" :model="loginForm">
      <h1 class="title">网络安全事件态势感知</h1>
      <el-form-item prop="login_user">
        <el-input type="text" v-model="loginForm.login_user" placeholder="请输入账号" auto-complete="false" prefix-icon="el-icon-user-solid" minlength="5" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="login_passwd">
        <el-input  v-model="loginForm.login_passwd" placeholder="请输入密码" auto-complete="false" prefix-icon="el-icon-lock" minlength="5" maxlength="30" show-password></el-input>
      </el-form-item>
       <el-form-item prop="code" class='codebox'>
        <el-input type="text" class='code' v-model="loginForm.code" placeholder="请输入验证码" auto-complete="false" prefix-icon="el-icon-key" style="vertical-align:middle;margin-right:5px;">
         
        </el-input>
         <span><img :src="captchaUrl"  @click="updateCaptcha" style="vertical-align:middle; height:37px"  align='right'></span>
        <!-- style="height:35px;margin-top:6px" -->
      </el-form-item> 
      
      <el-form-item class="buttonBox">
        <el-button type="primary" style="width: 35%; " @click="submitLogin" @keyup.enter="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div> 
</template>
 
<script>
  export default {
    name: 'login',
    data: function() {
      return {
        imgurl:require("@/assets/logo2.png"),
        // imgurl:require("@/assets/changanlogo.png"),
        captchaUrl:'/verify_code?time'+new Date(),
        loginForm:{
          login_user:'',
          login_passwd:'',
          code:''
        },
        checked:true,
        rules:{          
          login_user: [{required:true,message:'请输入用户名',trigger:'blur'}],          
          login_passwd: [{required:true,message:'请输入密码',trigger:'blur'}],
          code: [{required:true,message:'请输入验证码',trigger:'blur'}],
        }
        
      }
    },
    created() {
        var lett = this;
        document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
        lett.submitLogin();
        }
      }
    },
    methods: {
      submitLogin() {
        
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            //第一种
            this.$http.interceptors.response.use((rep)=>{
              return Promise.resolve(rep)
            }, (error) => {
              //console.log(error.response.data.code)
              if(error.response.data.code=='401'){
                this.$message.error('验证码有误，请重试！');
              }else{
                this.$message.error('账号或密码有误，请重试！');
              }
                // return Promise.reject(error);
              })
           this.$http.post('/login_in',this.loginForm).then(rep=>{
              if(rep){
                // const user_info = rep.data;                
                // window.sessionStorage.setItem('user_info',JSON.stringify(user_info))
                this.$message({
                  message: '登陆成功！',
                  type: 'success'
                });
                this.$store.dispatch('updateuserlevel',rep.data.user_level)
                this.$store.dispatch('updateuserinfo',rep.data)
                this.$store.dispatch('updatetoken',rep.data.csrf_token)
                if(rep.data.user_level===1){
                  //中国地图跳转
                  this.$router.replace('/countryPage')
                }
                else if(rep.data.user_level===2){
                  //省份地图跳转
                  this.$store.dispatch('updateprovince',rep.data.province)
                  this.$router.push({
                    name:'provincePage',
                    params:{
                        province_name:rep.data.province,
                        province_adcode:rep.data.adcode                        
                    }
                  })
                }
                else if(rep.data.user_level === 3){
                  //市级地图跳转
                  this.$store.dispatch('updateprovince',rep.data.province)
                  this.$store.dispatch('updatecity',rep.data.city)
                  this.$router.push({
                    name:'cityPage',
                    params:{
                        city_name:rep.data.city,
                        city_adcode:rep.data.adcode
                    }
                  })
                }
                else if(rep.data.user_level === 4){
                  //区级地图跳转
                  this.$store.dispatch('updateprovince',rep.data.province)
                  this.$store.dispatch('updatecity',rep.data.city)
                  this.$store.dispatch('updatearea',rep.data.area)
                  this.$router.push({
                    name:'areaPage',
                    params:{
                        area_name:rep.data.area,
                        area_adcode:rep.data.adcode
                    }
                  })
                }
            
              }
            }).catch((err)=>{
               //console.log(err)
              //  this.$message.error('输入有误，请重试！');
            })

          } else {
            this.$message.error('请输入所有字段！');
            return false;
          }
        });
      
      },
      updateCaptcha() {
        this.captchaUrl = '/verify_code?time'+new Date();
      },
 

    }
  }
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1%;
    /* background-color: #112346; */
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
  }
 .login1{
   position: absolute;
    left:50%;
    margin-left: -228px;
    top:50%;
    margin-top:-190px;
 }
  .login-container {
    // position: relative;
    border-radius: 10px;
    /* margin: 50px auto; */
    width: 385px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: center;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  }

 /deep/.el-form-item__content{
   display: flex;
   align-items: center;
  //  text-align: center;
 }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
//   .el-select{
//   width:20%; 
// }
/deep/.el-input__inner{
  height: 37px;
}

.el-input__suffix {
  top: -1px;
}
.el-input__icon {
  line-height: inherit;
}
.el-button{

  height:37px;
    line-height: 0.1;
    margin: 0 auto;
    border-radius:20px;
    background-color: #fff;
    color: #4595e9;
    letter-spacing:5px;
}
.el-button:hover{
  background-color: #4595e9;
    color: #fff;
}
.el-input{
  margin: auto 40px;
}
/deep/.el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    margin-left: 40px;
    position: absolute;
    top: 100%;
    left: 0;
}
//将验证码放进input框内
// .codebox{
//   position:relative;
//   box-sizing: border-box;
// }
// .codebox span{
//   position: absolute;
//   display: block;
//   right:2px;
//   top:2px;
//   // vertical-align:middle;
// }
.code{
  width: 210px;
}
</style>
