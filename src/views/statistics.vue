<style scoped lang='less'>
    /*.right_main_under{*/
    /*    width: 95%;*/
    /*    height: 95%;*/
    /*    background-color:  #32373c;*/
    /*    padding: 20px;*/
    /*    position: relative;*/
    /*}*/
    .top{
        width: 95%;
        height: 20%;
        padding-left: 40px;
        padding-top: 20px;
    }

    .bottom{
      width: 100%;
      height: 80%;
    }
    #chart_1{
          width: 80%;
          height: 90%;
          border: 1px solid #606266;
          margin: 0 auto;
        }


    /*/deep/.el-input__inner{*/
    /*  background-color: #747d888a;*/
    /*  border: 1px solid #606266;*/
    /*  color: #fdf6ec;*/
    /*}*/
    /*/deep/.el-form-item__label{*/
    /*  color: rgb(191, 203, 217);*/
    /*}*/
    /*/deep/.el-date-editor .el-range-input, .el-date-editor .el-range-separator{*/
    /*  background-color: #747d888a;*/
    /*}*/
    /*/deep/.el-range-editor.is-active, .el-range-editor.is-active:hover,*/
    /*/deep/.el-select .el-input__inner:focus,*/
    /*/deep/.el-select .el-input.is-focus .el-input__inner{*/
    /*  border-color: #606266;*/
    /*}*/
    /*/deep/.el-date-editor .el-range-input{*/
    /*  color: #fdf6ec;*/
    /*}*/
</style>
<template>
    <div class="right_main_under">
        <div class="top">
          <el-form :inline="true" class="search_select_form" size="mini">
            <el-form-item label="展示时间类型">
              <el-select v-model="form.dateType" placeholder="展示时间类型" clearable @clear="dateType_clearFun">
                <el-option
                  v-for="item in selectData.dateType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"

                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始时间" v-if="form.dateType != null">
              <el-date-picker
                v-if="form.dateType == 'year'"
                v-model="year_value1"
                type="year"
                range-separator="至"
                start-placeholder="开始年份"
                end-placeholder="结束年份">
              </el-date-picker>
              <span  v-if="form.dateType == 'year'" style="color: #f0f0f0">至</span>
              <el-date-picker
                v-model="year_value2"
                v-if="form.dateType == 'year'"
                type="year"
                range-separator="至"
                start-placeholder="开始年份"
                end-placeholder="结束年份">
              </el-date-picker>

              <el-date-picker
                v-model="month_value"
                v-if="form.dateType == 1"
                :change="day_change(month_value)"
                type="monthrange"
                value-format="yyyy-MM"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份">
              </el-date-picker>

              <el-date-picker
                v-model="day_value"
                type="daterange"
                v-if="form.dateType == 0"
                :change="day_change(day_value)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="数据来源">
              <el-select v-model="form.sourceType" placeholder="数据来源" clearable  @clear="sourceType_clearFun">
                <el-option
                  v-for="item in selectData.sourceTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="诈骗类型">
              <el-select v-model="form.modelType1" placeholder="诈骗类型" clearable @clear="modelType1_clearFun">
                <el-option
                  v-for="item in selectData.model_typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="searchData" :loading="isLoading"><i class="el-icon-search el-icon--left" ></i>查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <div id="chart_1"></div>
        </div>

    </div>
</template>

<script>
    import * as echarts from 'echarts'
    export default {
        data() {
            return {
                dateValue_handle:'',
                dateValue_pendingHandle:'',
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
              },
              dateValue_find:'',
              day_value:'',
              month_value:'',
              year_value1:'',
              year_value2:'',
              form:{
                dateType:'0',
                startFindTime:null,
                endFindTime:null,
                modelType1:null,
                sourceType:null,
              },
              dateDay_list:[],
              isLoading:false
            }
        },
        mounted() {
          this.getData()
        },
        methods: {
            //从后台获取数据
             getData(){
              //处理数据格式
              //  this.form.dateType = '日'
              let transData = {
                dateType:0,
                startFindTime:this.formatDate.get30day(),
                endFindTime:this.formatDate.getNowTime(2),
                modelType1:null,
                sourceType:null,
              }
               this.initSearch(transData)
            },
          searchData(){
            this.isLoading = true
               //处理日期
            let startFindTime = this.form.startFindTime;
            let endFindTime = this.form.endFindTime;

            if(this.form.dateType == 1){
               startFindTime = this.formatDate.addDay(this.form.startFindTime,1),
                 endFindTime = this.formatDate.addDay(this.form.endFindTime,1);
            }
            let transData = {
              dateType:this.form.dateType,
              startFindTime:startFindTime,
              endFindTime:endFindTime,
              modelType1:this.form.modelType1,
              sourceType:this.form.sourceType,
            }
            this.initSearch(transData)
            },

          async initSearch(transData){
            // const {data:res} = await this.$http.post('/domain/getStat',transData)
            const  res = {
              "code": 200,
              "data":
                {
                  "id": 0,
                  "sourceMap": {
                    CA: [21,22,34,444,44,5],//（长安）
                    PG: [21,22,34,44,44,5],//（盘古）
                    XZ: [2,22,34,344,74,0],//（刑侦）
                    WA: [1,22,34,244,94,5]//（网安）
                              },
                  "typeMap": {
                            DK:[21,22,34,444,44,5],
                            SD:[21,22,34,444,44,5],
                            LC:[21,22,34,444,44,5],
                     },
                  dateDay:['2020-1','2020-2','2020-3','2020-4','2020-5','2020-6'],
                },
              "expandData": {},
              "message": "string"
            }
            if(res.code = 200){
             /* 1. 什么来源和类型都不筛选，就返回sourcemap里的所有数组
              只筛选类型，就返回sourcemap对象里所有数组*/
            /*  2.  只筛选来源，就返回typemap对象里的所有数组
              既筛选来源又筛选类型，就返回typemap对象里面就返回筛的那条类型的数组*/
              this.dateDay_list = res.data.dateDay
              if(this.form.modelType1 == null && this.form.sourceType == null){
                this.initChart_1(res.data.sourceMap ,1)
              }
              if(this.form.modelType1 != null && this.form.sourceType == null){
                this.initChart_1(res.data.sourceMap,1)
              }
              if(this.form.modelType1 == null && this.form.sourceType != null){
                this.initChart_1(res.data.typeMap,2)
              }
              if(this.form.modelType1 != null && this.form.sourceType != null){
                this.initChart_1(res.data.typeMap,2)
              }
              this.isLoading = false
            }
          },
          day_change(val){
            if(val && val != ""){
              this.form.startFindTime = val[0]
              this.form.endFindTime = val[1]
            }else{
              this.form.startFindTime = null
              this.form.endFindTime = null
            }

          },
          checkFun(arr,value){
            for(let i = 0;i < arr.length;i++){
              if(value == arr[i].value){
                return arr[i].label
              }
            }
          },
            //初始化echarts
           initChart_1(allData,type){
               let seriesArr = []
               let legendArr = []
               Object.keys(allData).forEach((key) => {
               console.log(allData[key]) // foo
                 let key_zh = ''
                 if(type == 1){
                    key_zh = this.checkFun(this.selectData.sourceTypeData,key)
                 }
                 if(type == 2){
                    key_zh = this.checkFun(this.selectData.model_typeData,key)
                 }
               let seriesObj = {
                 name: key_zh,
                 type: 'line',
                 // stack: '总量',
                 data: allData[key]
               }
               legendArr.push(key_zh)
               seriesArr.push(seriesObj)
             })
            //chart_1
            let myChart_1 = echarts.init(document.getElementById('chart_1'));
            let option_1 =
              {
                title: {
                  // left: 'center',
                  text: '入库数据统计图',
                  textStyle:
                    {color :'rgb(32, 160, 255)'}
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  right: '5%',
                  data: legendArr,
                  textStyle: {
                    color: '#ccc'
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: this.dateDay_list,
                  axisLine: {
                    lineStyle: {
                      color: '#ccc'
                    }
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#ccc'
                    }
                  }
                },
                series:seriesArr
              };
            myChart_1.clear();
            myChart_1.setOption(option_1);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize',function() {myChart_1.resize()});

          },

          dateType_clearFun(val){
            this.form.dateType = null
          },
          sourceType_clearFun(val){
            this.form.sourceType = null
          },
          modelType1_clearFun(val){
            this.form.modelType1 = null
          },
        },
        watch: {},
        created() {

        }
    }
</script>
