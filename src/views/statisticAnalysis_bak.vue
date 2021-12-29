<style scoped lang="less">
.right_main_under{
  background: #ffffff00 url(../assets/img/5.png) no-repeat  top;
  background-size:70% 100%;

  .chartTitle{
    width: 93%;
    height: 33px;
    line-height: 33px;
    background: #ffffff00 url(../assets/img/rectanTitle.png) no-repeat  top;
    background-size:100% 100%;
    color: #0dbae3;
    font:  normal  small-caps bolder 13px/30px Georgia, serif;
    padding: 0px 4px;
  }
  .el-date-editor{
    width: 50%;
    margin-left: 5%;
  }
  .el-button{
    margin-left: 1%;
  }
  .bottom_left{
    float: left;
    width: 30%;
    height: 100%;
    .left_one{
      width: 100%;
      height: 50%;
     }
    .left_two{
      width: 100%;
      height: 50%;
    }
  }
  .bottom_right{
    float: right;
    width: 30%;
    height: 100%;
    .right_one{
      width: 100%;
      height: 50%;
    }
    .right_two{
      width: 100%;
      height: 50%;
      .changeItem{
        width: 100%;
        height: 18px;
        .icoImg{
          height: 10px;
          width: 10px;
          display: inline-block;
          background: #ffffff00 url(../assets/img/statistic/bar.png) no-repeat  top;
          background-size:100% 100%;
        }
        span{
          font-size: 12px;
          color: #04bbce;
          margin-right: 8px;
        }
      }
    }
  }
  .bottom_center{
    float: left;
    position: relative;
    width: 40%;
    height: 100%;
    .centerUp{
      margin-top: 10%;
      width: 100%;
      height: 40%;
      .line_one{
        height: 50px;
        width: 350px;
        margin: 0 auto;
        .iconOfNum{
          width: 45px;
          height: 100%;
          float: left;
          background: #ffffff00 url(../assets/img/statistic/icon.png) no-repeat  top;
          background-size:100% 100%;
        }
        p{
          color: #ffd200;
          font:normal  small-caps bolder 2.8em Georgia, serif; text-shadow: 2px 2px 5px #f56cab;
        }
      }
      .line_two{
        /*margin-left: 40%;*/

        height: 50px;
        width: 300px;
        margin: 10px auto;
        color: #ffffff;
        font:normal  small-caps bolder 1.89em Georgia, serif; text-shadow: 2px 2px 5px #f56cab;
      }

    }

    .centerDown{
      width: 100%;
      height: 53%;
      background: #ffffff00 url(../assets/img/statistic/centerbc.png) no-repeat  top;
      background-size:100% 100%;
      .downArea1{
        height: 70%;
      }
      .downArea2{
        height: 30%;
        width: 100%;
        .tipData{
          width: 20%;
          height: 100%;
          float: left;
          margin-right: 5%;
          color: #27c9f0;
          font:normal  small-caps bolder 1.3em Georgia, serif; text-shadow: 2px 2px 5px #080808;
          /*padding: 8px;*/
          p{
            padding: 8px;
          }
        }
        #tipData1{
          background: #ffffff00 url(../assets/img/statistic/d1.png) no-repeat  top;
          background-size:100% 100%;
        }
        #tipData2{
          background: #ffffff00 url(../assets/img/statistic/d2.png) no-repeat  top;
          background-size:100% 100%;
        }
        #tipData3{
          background: #ffffff00 url(../assets/img/statistic/d3.png) no-repeat  top;
          background-size:100% 100%;
        }
        #tipData4{
          background: #ffffff00 url(../assets/img/statistic/d4.png) no-repeat  top;
          background-size:100% 100%;
          margin-right: 0;
        }
      }

    }

  }
}
    #chart_1{
      width: 100%;
      height: 82%;
      margin: 0 auto;
    }

    #chart_2{
        width: 100%;
        height: 82%;
        margin: 0 auto;
    }
    #chart_3{
        width: 100%;
        height: 82%;
        margin: 0 auto;
    }
    #chart_4{
      width: 100%;
      height: 80%;
      margin: 0 auto;
    }
</style>
<template>
    <div class="right_main_under">

        <div class="bottom_left">
          <div class="left_one">
            <div class="chartTitle">来源检出统计</div>
            <div id="chart_1"> </div>
            <div class="static_form">
              <el-date-picker
                v-model="day_value_one"
                type="daterange"
                :change="day_change(day_value_one)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right"
                size="mini" >
              </el-date-picker>
              <el-button type="primary" size="mini" @click="searchData" :loading="isLoading" icon="el-icon-search"></el-button>
            </div>
          </div>
          <div class="left_two">
            <div class="chartTitle">来源处置统计</div>
            <div id="chart_2"> </div>
            <div class="static_form" >
              <el-date-picker
                v-model="day_value_one"
                type="daterange"
                :change="day_change(day_value_one)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right"
                size="mini" >
              </el-date-picker>
              <el-button type="primary" size="mini" @click="searchData" :loading="isLoading" icon="el-icon-search"></el-button>
            </div>
          </div>
        </div>
      <div class="bottom_center">
        <div class="centerUp">
          <div class="line_one">
            <div class="iconOfNum"></div>
            <p class="centerUpArea" style="">数据统计分析</p>
          </div>
<!--          <div class="line_two">累计检出数据总量</div>-->
          <div class="centerUpArea"></div>
          <div class="centerUpArea"></div>
        </div>
        <div class="centerDown">
          <div class="downArea1"></div>
          <div class="downArea2">
            <div class="tipData" id="tipData1">
<!--              <p>今日检出数据总量：111111</p>-->
            </div>
            <div class="tipData" id="tipData2">
<!--              <p>今日处置数据总量：111111</p>-->
            </div>
            <div class="tipData" id="tipData3">
<!--              <p>本月检出数据总量：111111</p>-->
            </div>
            <div class="tipData" id="tipData4">
<!--              <p>本月处置数据总量：111111</p>-->
            </div>
          </div>
        </div>
      </div>
        <div class="bottom_right">
          <div class="right_one">
            <div class="chartTitle">协议数据量</div>
            <div id="chart_3"> </div>
            <div class="static_form" >
              <el-date-picker
                v-model="day_value_one"
                type="daterange"
                :change="day_change(day_value_one)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right"
                size="mini" >
              </el-date-picker>
              <el-button type="primary" size="mini" @click="searchData" :loading="isLoading" icon="el-icon-search"></el-button>
            </div>
          </div>
          <div class="right_two">
            <div class="chartTitle">其他统计类型</div>
            <div class="changeItem">
              <div class="icoImg"></div>
              <span>全国特征检出量</span>
              <div class="icoImg"></div>
              <span>APK提供量</span>
              <div class="icoImg"></div>
              <span>IPA提供量</span>
              <div class="icoImg"></div>
              <span>全国特征检出量</span>
              <div class="icoImg"></div>
              <span>全国特征检出量</span>
            </div>
            <div id="chart_4"> </div>
            <div class="static_form" >
              <el-date-picker
                v-model="day_value_one"
                type="daterange"
                :change="day_change(day_value_one)"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                align="right"
                size="mini" >
              </el-date-picker>
              <el-button type="primary" size="mini" @click="searchData" :loading="isLoading" icon="el-icon-search"></el-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        data() {
            return {
              dateDay_list:[],
              isLoading:false,
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
              day_value_one:'',
              form:{
                dateType:'0',
                startFindTime:null,
                endFindTime:null,
                modelType1:null,
                sourceType:null,
              },
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
          //查询方法
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
        //请求获取展示数据
        async initSearch(transData){
          // const {data:res} = await this.$http.post('/domain/getStat',transData)
          const  res = {
            "code": 200,
            "data":
              {
                "id": 0,
                "sourceFindMap": {
                  CA: [21,22,34,444,44,5],//（长安）
                  PG: [21,22,34,44,44,5],//（盘古）
                  XZ: [2,22,34,344,74,0],//（刑侦）
                },
                "sourceTreatMap": {
                  "DX":[41,22,34,74,41,5],
                  "YD":[51,42,34,24,47,0],
                  "TGJ":[61,82,34,64,48,9],
                  "CA":[11,72,34,4,4,8],
                },
                protocolMap:{
                  "HTTP":[41,22,34,74,41,5],
                  "HTTPS":[51,42,34,24,47,10]
                },
                otherMap:{
                  "ALL":[41,22,34,74,41,5],
                  "APK":[51,42,34,24,47,0],
                  "IPA":[61,82,34,64,48,9],
                  "LINK":[21,12,34,4,44,7],
                  "PAGE":[11,72,34,4,4,8],
                },
                dateDay:['2020-1','2020-2','2020-3','2020-4','2020-5','2020-6'],
              },
            "expandData": {},
            "message": "string"
          }
          if(res.code = 200){
            this.dateDay_list = res.data.dateDay
            this.initChartData(res.data)
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

          //后端返回的数据代码和名称 的 对应的 方法
        checkFun(arr,value){
          for(let i = 0;i < arr.length;i++){
            if(value == arr[i].value){
              return arr[i].label
            }
          }
        },

       //统一处理数据,初始化图表
          initChartData(dataList){
            this.initChart_1(dataList.sourceFindMap,1,'chart_1')
            this.initChart_1(dataList.sourceTreatMap,2,'chart_2')
            this.initChart_2(dataList.protocolMap,3,'chart_3')
            this.initChart_3(dataList.otherMap,'ALL','chart_4')
          },

        //初始化echarts
        initChart_1(allData,type,idStr){
          let seriesArr = []
          let legendArr = []
          Object.keys(allData).forEach((key) => {
            console.log(allData[key]) // foo
            let key_zh = key
            if(type == 1){
              key_zh = this.checkFun(this.selectData.sourceTypeData,key)
            }
            if(type == 2){
              key_zh = this.checkFun(this.selectData.options,key)
            }
            //默认的series是 type = 2
            let seriesObj = {
              name: key_zh,
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: allData[key]
            }

            if(type == 1){

              let areaStyleItem = {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(240,199,37,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(240,199,37,0.01)'
                }])
              };
              let  itemStyleItem = {
                normal: {color: '#f0c725'}
              }
              if(key == "PG"){
                areaStyleItem = {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#cc99cc9c'//#cc99cc3b
                  }, {
                    offset: 1,
                    color: '#cc99cc3b'
                  }])
                }
                itemStyleItem = { normal:{ color:'#CC99CC' } }
              }
              if(key == "XZ"){
                areaStyleItem = {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(22,248,146,0.5)'
                  }, {
                    offset: 1,
                    color: 'rgba(22,248,146,0.01)'
                  }])
                }
                itemStyleItem = { normal:{ color:'#16f892' } }
              }

              seriesObj = {
                name: key_zh,
                type: 'line',
                smooth: true,
                symbolSize: 8,
                areaStyle: areaStyleItem,
                barWidth: '30%',
                itemStyle: itemStyleItem,
                data: allData[key]
              }
            }
            legendArr.push(key_zh)
            seriesArr.push(seriesObj)
          })
          //chart_1
          let myChart_1 = echarts.init(document.getElementById(idStr));

          let option_1 = {
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
        initChart_2(allData,type,idStr){
          let seriesArr = []
          let legendArr = []
          let lineStyleColorArr = ['#6c50f3','#00ca95']
          let areaStyleColorArr1 = ['rgba(108,80,243,0.3)','rgba(0,202,149,0.3)']
          let areaStyleColorArr2 = ['rgba(108,80,243,0)','rgba(0,202,149,0)']
          let areaStyleColorArr3 = ['rgba(108,80,243, 0.9)','rgba(0,202,149,0.9)']
          Object.keys(allData).forEach((key,index) => {
            console.log(index)
            console.log(allData[key]) // foo
            let key_zh = key
            //默认的series是 type = 2
            let seriesObj = {
              name: key_zh,
              type: 'line',
              // smooth: true, //是否平滑
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: 'circle',
              symbolSize: 25,
              lineStyle: {
                normal: {
                  color: lineStyleColorArr[index],
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: lineStyleColorArr[index],
                }
              },
              itemStyle: {
                color: lineStyleColorArr[index],
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: areaStyleColorArr1[index]
                  },
                    {
                      offset: 1,
                      color: areaStyleColorArr2[index]
                    }
                  ], false),
                  shadowColor: areaStyleColorArr3[index],
                  shadowBlur: 20
                }
              },
              data: allData[key]
            }
            legendArr.push(key_zh)
            seriesArr.push(seriesObj)
          })
          //chart_1
          let myChart_2 = echarts.init(document.getElementById(idStr));

          let  option_2 = {
            // backgroundColor: '#080b30',
            legend:{
              data:legendArr,
              textStyle:{
                color:'#fff',
                align: 'right',
              },
              x:'right'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(0, 255, 233,0)'
                    }, {
                      offset: 0.5,
                      color: 'rgba(255, 255, 255,1)',
                    }, {
                      offset: 1,
                      color: 'rgba(0, 255, 233,0)'
                    }],
                    global: false
                  }
                },
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              axisLine: {
                show: true
              },
              splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                  color: '#f00'
                },
              },
              axisLabel: {
                color: '#fff'
              },
              splitLine: {
                show: false
              },
              boundaryGap: false,
              data: this.dateDay_list,
            }],

            yAxis: [{
              type: 'value',
              min: 0,
              // max: 140,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,0.1)'
                }
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                  color: '#d1e6eb',

                },
              },
              axisTick: {
                show: false,
              },
            }],
            series: seriesArr
          };
              myChart_2.clear();
              myChart_2.setOption(option_2);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize',function() {myChart_2.resize()});
          },
        initChart_3(allData,type,idStr)  {

          let myChart_3 = echarts.init(document.getElementById(idStr));
          // var XName = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          var data1 = allData[type]
          var img = [
            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC',
            'image://data:image/png;base64,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',
            'image://data:image/png;base64,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',
            'image://data:image/png;base64,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',
          ]
          let coords = []
          let dataArr = this.dateDay_list
          for(let i = 0;i< dataArr.length;i++){
            let array = []
            array.push(dataArr[i])
            array.push(data1[i])
            coords.push(array)
          }
          var data = [{
            coords: coords
          }]

          let option_3 = {
            // backgroundColor: '#0e2147',
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              type: "scroll",
              data: "来电量",
              itemWidth: 18,
              itemHeight: 12,
              textStyle: {
                color: "#00ffff",
                fontSize: 14
              },
            },
            yAxis: [{
              type: 'value',
              position: 'left',
              nameTextStyle: {
                color: '#00FFFF'
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: 'rgba(135,140,147,0.8)'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                formatter: '{value}',
                color: '#fff',
                fontSize: 14
              }
            }, ],
            xAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#0696f9',
                }
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: '#fff', // x轴颜色
                  fontWeight: 'normal',
                  fontSize: '12',
                  lineHeight: 4
                }

              },
              data: this.dateDay_list,
            }, ],
            series: [{
              symbolSize: 150,
              symbol: img[2],
              name: '小灯光',
              type: "line",
              data: data1,
              itemStyle: {
                normal: {
                  borderWidth: 5,
                  color: '#0696f9',
                }
              }
            },
              {
                name: '滑行的光点',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                symbolSize: 30,
                polyline: true,
                effect: {
                  show: true,
                  trailLength: 0,
                  symbol: "arrow",
                  period: 10, //光点滑动速度
                  symbolSize: 150,
                  symbol: img[0]
                },
                lineStyle: {
                  normal: {
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                  }
                },
                data: data
              }
            ],
          };
          myChart_3.clear();
          myChart_3.setOption(option_3);
          //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
          window.addEventListener('resize',function() {myChart_3.resize()});
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
