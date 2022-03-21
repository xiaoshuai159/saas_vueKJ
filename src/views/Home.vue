<template>
    <div class="about">
        <v-header :inpName="warns"/>
      <div class="bgs">
            <v-sidebar />
        <div class="content-box" >
           
            <div class="content">
                <router-view >
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                         
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
// import vTags from "../components/Tags.vue";
// import { sendWebsocket, closeWebsocket } from "@/utils/websocket.js";
export default {
    data(){
        return{
            warns:"",
            twoTarns:""
        }
    },
    components: {
        vHeader,
        vSidebar,
        // vTags
    },
    computed: {
        tagsList() {
            return this.$store.state.tagsList.map(item => item.name);
        },
      
    },
    methods:{
    //     getUrl() {
    //     // console.log(1);
    //     // console.log(window.location.host);
    //   // this.path = "ws://" + window.location.host + "/ws/connect";
    //   this.path = "ws://172.31.0.112:8080/ws/connect";
    //   this.requstWs();
    //   // this.wsMessage()
    // },
    // wsMessage(res) {
     
    //   if(res.msgType=="dataCheck"){
    //     this.$store.commit('readMsg',res.data)
    //   //  this.warns=res.data
    //   //  this.msgType=res.msgType
    //   }

    //   else if(res.msgType!="dataCheck"){       //如果msgType！=dataCheck，执行下
    //     this.$store.commit('readMsgtwo',res.data)
    //   }
    //     //   console.log(res.data);
   
    //     //  this.warns=res.data

      
    //     //   console.log(res);
     
    //   // this.todo = res.data.data.todoNum || 0;
    //   // this.$children[0].$children[0].$forceUpdate();
    // },
    //    wsError() {
    //   // 比如取消页面的loading
    // },
    // requstWs() {
    //   // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
    //   closeWebsocket();
    //   // 跟后端协商，需要什么参数数据给后台
    //   const obj = {
    //     //需要传入用户信息
    //     msgType: "dataCheck",
    //   };
    //   // 发起ws请求

    //   sendWebsocket(this.path, obj, this.wsMessage, this.wsError);
    //   // this.$store.commit('setPrint',this.data)
    //   // console.log(this.$store.state.data);
      
    // },
    },
      created() {
    // this.getUrl();
    
  },
};
</script>
<style>
  .content-box{
    /* background:#031123; */
    left: 15rem;
  }
  .content-collapse{
    background:#031123;
    left: 4rem;
  }
  .bgs{
      width: 100%;
      height: 100%;
          background-image: url(../assets/img/shouye/bg1.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
