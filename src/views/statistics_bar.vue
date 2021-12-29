<style scoped>
    .right_main_under{
        width: 95%;
        height: 95%;
        background-color:  #32373c;
        padding: 20px;
        position: relative;
    }
    .top{
        width: 100%;
        height: 50%;
        /*padding: 8px;*/
        /*background-color: #777777;*/
    }
    .bottom_left{
        float: left;
        width: 50%;
        height: 50%;
        /*padding: 8px;*/
        /*background-color: #00a854;*/
    }
    .bottom_right{
        float: right;
        width: 50%;
        height: 50%;
        /*padding: 8px;*/
        /*background-color: #20a0ff;*/
    }
    #chart_1{
        width: 80%;
        height: 90%;
        border: 1px solid #606266;
        margin: 0 auto;
    }
    #chart_2{
        width: 100%;
        height: 100%;
        border: 1px solid #606266;
        margin: 0 auto;
    }
    #chart_3{
        width: 100%;
        height: 100%;
        border: 1px solid #606266;
        margin: 0 auto;
    }
</style>
<template>
    <div class="right_main_under">
        <div class="top">
            <div id="chart_1"></div>
        </div>
        <div class="bottom_left">
            <div id="chart_2"> </div>
        </div>
        <div class="bottom_right">
            <div id="chart_3"></div>
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
                dateValue_find:'',
                dateData:[],
                caAmount_list: [],//长安发现数量
                confirmAmount_list: [],//待处置
                dateDay_list: [],
                deDuplicationAmount_list: [],//去重后总数量
                feedbackTreatmentAmount_list: [],//运营商反馈处置数量
                id_list: [],
                pgAmount_list: [],//盘古发现数量
                treatmentAmount_list: [],//我方处置数量
            }
        },
        mounted() {
          this.getData()

        },
        methods: {
            //从后台获取数据
            async getData(){
                const {data:res} = await this.$http.post('/domain/getStat')
                if(res.code = 200){
                    this.dateDay_list = []
                    this.caAmount_list = []                 //长安发现数量
                    this.pgAmount_list = []                 //盘古发现数量
                    this.confirmAmount_list = []            //待处置
                    this.deDuplicationAmount_list = []      //去重后总数量 *暂时无用
                    this.feedbackTreatmentAmount_list = []  //运营商反馈处置数量
                    this.treatmentAmount_list = []          //我方处置数量

                    this.caAmount_list = res.data.caAmount
                    this.confirmAmount_list = res.data.confirmAmount
                    this.dateDay_list = res.data.dateDay
                    this.deDuplicationAmount_list = res.data.deDuplicationAmount
                    this.feedbackTreatmentAmount_list = res.data.feedbackTreatmentAmount
                    this.pgAmount_list = res.data.pgAmount
                    this.treatmentAmount_list = res.data.treatmentAmount
                    this.initChart_1()
                    this.initChart_2()
                    this.initChart_3()
                }
            },

            //初始化echarts
           initChart_1(){
            //chart_1
            let myChart_1 = echarts.init(document.getElementById('chart_1'));
            let option_1 = {
              color: ['#80FFA5', '#00DDFF'],
              title: {
                left: 'center',
                type:'',
                text: '处置数量统计图',
                textStyle:
                  {color :'rgb(32, 160, 255)'}
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                },
                position: function (pt) {
                  return [pt[0], '10%'];
                }
              },
              legend: {
                right: '10%',
                data: ['运营商反馈处置数量', '我方处置数量'],
                textStyle:
                  {color :'rgb(32, 160, 255)'}
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none',
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              // grid: {
              //     left: '3%',
              //     right: '4%',
              //     bottom: '3%',
              //     containLabel: true
              // },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: this.dateDay_list
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  boundaryGap: [0, '100%']
                }
              ],
              dataZoom: [{
                type: 'inside',
                start: 0,
                end: 80
              }, {
                start: 0,
                end: 80
              }],
              series: [
                {
                  name: '运营商反馈处置数量',
                  type: 'line',
                  stack: '总量',
                  smooth: true,
                  lineStyle: {
                    width: 0
                  },
                  showSymbol: false,
                  areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(128, 255, 165)'
                    }, {
                      offset: 1,
                      color: 'rgba(1, 191, 236)'
                    }])
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data:this.feedbackTreatmentAmount_list
                },
                {
                  name: '我方处置数量',
                  type: 'line',
                  stack: '总量',
                  smooth: true,
                  lineStyle: {
                    width: 0
                  },
                  showSymbol: false,
                  areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0, 221, 255)'
                    }, {
                      offset: 1,
                      color: 'rgba(77, 119, 255)'
                    }])
                  },
                  emphasis: {
                    focus: 'series'
                  },
                  data: this.treatmentAmount_list
                }
              ]
            };
            myChart_1.setOption(option_1);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize',function() {myChart_1.resize()});

          },
           initChart_2(){
             //     chart_2

             let myChart_2 = echarts.init(document.getElementById('chart_2'));
             let  option_2 = {
               tooltip: {
                 trigger: 'axis',
                 position: function (pt) {
                   return [pt[0], '10%'];
                 }
               },
               title: {
                 left: 'center',
                 text: '待处置数据统计图',
                 textStyle:
                   {color :'rgb(32, 160, 255)'}
               },
               toolbox: {
                 feature: {
                   dataZoom: {
                     yAxisIndex: 'none',
                   },
                   restore: {},
                   saveAsImage: {}
                 }
               },
               xAxis: {
                 type: 'category',
                 boundaryGap: false,
                 data: this.dateDay_list
               },
               yAxis: {
                 type: 'value',
                 boundaryGap: [0, '100%']
               },
               dataZoom: [{
                 type: 'inside',
                 start: 0,
                 end: 80
               }, {
                 start: 0,
                 end: 80
               }],
               series: [
                 {
                   name: '待处置数量',
                   type: 'line',
                   symbol: 'none',
                   sampling: 'lttb',
                   itemStyle: {
                     color: 'rgb(255, 70, 131)'
                   },
                   areaStyle: {
                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: 'rgb(255, 158, 68)'
                     }, {
                       offset: 1,
                       color: 'rgb(255, 70, 131)'
                     }])
                   },
                   data: this.confirmAmount_list
                 }
               ]
             };
             myChart_2.setOption(option_2);
             //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
             window.addEventListener('resize',function() {myChart_2.resize()});

           },
           initChart_3(){
            //chart_3
            let myChart_3 = echarts.init(document.getElementById('chart_3'));
            let option_3 = {
              backgroundColor: '#32373c',
              title: {
                left: 'center',
                text: '发现数量统计图',
                textStyle:
                  {color :'rgb(32, 160, 255)'}
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },

              },
              toolbox: {
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none',
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              legend: {
                right: '18%',
                data: ['长安', '盘古'],
                textStyle: {
                  color: '#ccc'
                }
              },
              xAxis: {
                data: this.dateDay_list,
                axisLine: {
                  lineStyle: {
                    color: '#ccc'
                  }
                }
              },
              yAxis: {
                splitLine: {show: false},
                axisLine: {
                  lineStyle: {
                    color: '#ccc'
                  }
                }
              },
              dataZoom: [{
                type: 'inside',
                start: 0,
                end: 80
              }, {
                start: 0,
                end: 80
              }],

              series: [{
                name: '长安',
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 15,
                data: this.caAmount_list
              },
                {
                  name: '盘古',
                  type: 'line',
                  smooth: true,
                  showAllSymbol: true,
                  symbol: 'emptyCircle',
                  symbolSize: 15,
                  data: this.pgAmount_list
                },

              //   {
              //   name: '盘古',
              //   type: 'line',
              //   barWidth: 10,
              //   itemStyle: {
              //     barBorderRadius: 5,
              //     color: new echarts.graphic.LinearGradient(
              //       0, 0, 0, 1,
              //       [
              //         {offset: 0, color: '#14c8d4'},
              //         {offset: 1, color: '#43eec6'}
              //       ]
              //     )
              //   },
              //   data: this.pgAmount_list
              // },
              ]
            };
            myChart_3.resize();

            myChart_3.setOption(option_3);
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize',function() {myChart_3.resize()});
          },
        },
        watch: {},
        created() {

        }
    }
</script>
