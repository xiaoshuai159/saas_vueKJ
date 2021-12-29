<style scoped lang="less">
.right_main_under{
  position: relative;
  padding: 0;
  margin: 0;
  width: 99%;
  height: 96%;
  .header{
   width: 100%;
   height: 50px;
   background: #ffffff00 url(../assets/img/statistic/header.png) no-repeat  top;
   background-size:100% 100%;
   p{
     color: #01c4f7;
     line-height: 50px;
     height: 50px;
     font:normal  small-caps bolder 2.2em Georgia, Sans-serif; text-shadow: 2px 2px 5px #329cad;
     text-align: center;
   }
 }
}
.btn{
position: absolute;
top: 1.25rem /* 20/16 */;
right: 0;
}
</style>
<template>
    <div class="right_main_under">
    <div class="header"><p></p></div>
     <el-button type="success" class="btn" @click="btn">登录</el-button>
      
    
    
    </div>
</template>

<script>
    

    export default {
        data() {
            return {
              dateDay_list:[],
              isLoading1:false,
              isLoading2:false,
              isLoading3:false,
              isLoading4:false,
              isLoading5:false,
              isLoading6:false,
              isLoading7:false,
              isLoading8:false,
              selectData: {
                sourceTypeData: [
                  {value: 'CA', label: '长安'},
                  {value: 'PG', label: '盘古'},
                  {value: 'XZ', label: '刑侦'},
                  // {value: 'WA', label: '网安'},
                ],
                dateType:[
                  // {value: 'year', label: '年'},
                  // {value: '1', label: '月'},
                  {value: '0', label: '日'},
                ],
                model_typeData:[
                  { value:'DK',label:'网络贷款'},
                  { value:'SD',label:'兼职刷单'},
                  { value:'GJF',label:'冒充政府网站'},
                  { value:'LC',label:'投资理财'},
                  { value:'GW',label:'网络购物'},

                ],
                //处置单位
                options: [
                  {value: "TGJ",label: "上海通管局"},
                  {value: "DX",label: "上海电信"},
                  {value: "YD",label: "上海移动"},
                  {value: "CA",label: "长安"},
                ],
              },
              day_value_1:'',
              day_value_2:'',
              day_value_3:'',
              day_value_4:'',
              day_value_5:'',
              day_value_6:'',
              day_value_7:'',
              day_value_8:'',
              form:{
                type:'0',
                startFindTime:null,
                endFindTime:null,
              },
              pickerOptions: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                },
                  {
                    text: '最近一年',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                      picker.$emit('pick', [start, end]);
                    }
                  },
                ]
              },
            }
        },
      methods:{
          btn(){
        this.$router.push('/login')
    }
      },
       
       
    }
</script>
