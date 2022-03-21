<template>
  <div @mousemove="handleTime"  style="height:100vh;">
    <router-view id="app" class="analysis" />
  </div>
</template>

<script>
export default {
  //  inject:['raload'],
  name: "App",
  //   provide(){
  //   return{
  //     reload:this.reload
  //   }
  // },

  data() {
    return {
      //  isRouterShow:true,
      lastTime: null, //最后一次点击的时间
      currentTime: null, //当前点击的时间
      // timeOut: , //设置超时时间： 15分钟
    };
  },

  components: {},

  // data(){
  //   return {
  //
  //   }
  // },
  methods: {
    // async reload(){
    //   this.isRouterShow=false
    //    this.$nextTick(()=>{
    //         this.isRouterShow=true
    //    })

    // },
    handleTime() {
      // console.log(1);
      if (this.$route.path != "/") {
        this.currentTime = new Date().getTime(); //记录这次点击的时间
        if (this.currentTime - this.lastTime > 15 * 60 * 1000) {
          //判断上次最后一次点击的时间和这次点击的时间间隔是否大于15分钟
          //大于15分钟,跳转路由到login页
          // this.$store.dispatch("/");
          this.$message("连接超时，重新登录");
          this.$router.push({ name: "login" });
          sessionStorage.clear();
          this.lastTime = new Date().getTime();
        } else {
          this.lastTime = new Date().getTime(); //如果在15分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
          // console.log(3);
        }
      } else {
        // this.currentTime = null;
        this.lastTime = new Date().getTime();
      }
    },

    // jinzhi() {
    //   document.oncontextmenu = function () {
    //     return false;
    //   };
    //   document.onkeydown = function (e) {
    //     let currKey = 0;
    //     const evt = e || window.event;
    //     currKey = evt.keyCode || evt.which || evt.charCode;
    //     if (currKey == 123) {
    //       window.event.cancelBubble = true;
    //       window.event.returnValue = false;
    //     }
    //   };
    // },
  },
  created() {
    // this.jinzhi();
    this.lastTime = new Date().getTime(); //网页第一次打开时，记录当前时间
  },
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
@import "./assets/css/public.css";
/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
/* #app{
overflow-y:scroll;
overflow-x:hidden;
height:100%
   } */
</style>
