// 日期格式处理（日期对象转换为特定格式）、 日期计算分钟差值、获取当前时间的特定格式、等
import de from "element-ui/src/locale/lang/de";

var formatDate = {

    //日期对象转换为 yyyy-MM-dd HH:mm:ss 或者 其他类型 日期字符串
    formatDates(aData,type) {
        let nowTime = '2020-1-1 00:00:00';
        aData = new Date();
        let year = aData.getFullYear(),
        month = '' + (aData.getMonth() + 1),
        day = '' + aData.getDate(),
        hours = '' + aData.getHours(),
        minutes = '' + aData.getMinutes(),
        seconds = '' + aData.getSeconds();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;
        if(type === 1){//2020-1-1 00:00:00
          nowTime = year + "-" + month + "-" + day + ' '+ hours + ':' + minutes+':' + seconds;
        }
        if(type === 2){//2020-1-1
          nowTime = year + "-" + month + "-" + day;
        }
        return nowTime;
      },

    //计算两个时间分钟的差值
    minutesCha( begin, end ) {
        // 如果日期是对象类型进行转换成对象字符串
        if(begin instanceof Object){
          begin = formatDate.formatDates(begin,1)
        }
        if(end instanceof Object){
          end = formatDate.formatDates(end,1)
        }
        //定义两个变量time1,time2分别保存开始和结束时间
        var time1 = begin || "2009-12-02T12:25:10.592Z";
        var time2 = end || "2009-12-02T12:35:20.589Z";

        //判断开始时间是否大于结束日期
        if (time1 > time2) {
            // alert("开始时间不能大于结束时间！");
            return false;
        }

        //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
        var begin1 = time1.substr(0, 10).split("-");
        var end1 = time2.substr(0, 10).split("-");

        //将拆分的数组重新组合，并实例成化新的日期对象
        var date1 = new Date(begin1[1] + - + begin1[2] + - + begin1[0]);
        var date2 = new Date(end1[1] + - + end1[2] + - + end1[0]);

        //得到两个日期之间的差值m，以分钟为单位
        //Math.abs(date2-date1)计算出以毫秒为单位的差值
        //Math.abs(date2-date1)/1000得到以秒为单位的差值
        //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
        var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);

        //小时数和分钟数相加得到总的分钟数
        //time1.substr(11,2)截取字符串得到时间的小时数
        //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
        var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
        var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));

        //两个分钟数相减得到时间部分的差值，以分钟为单位
        var n = min2 - min1;

        //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
        var minutes = m + n;
        // 返回 分钟差
        return minutes;
  },

    //获取 yyyy-MM-dd HH:mm:ss格式的当前时间
    getNowTime(type) {
      let aData = new Date();
      let nowTime ='';
      let year = aData.getFullYear(),
      month = '' + (aData.getMonth() + 1),
      day = '' + aData.getDate(),
      hours = '' + aData.getHours(),
      minutes = '' + aData.getMinutes(),
      seconds = '' + aData.getSeconds();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hours.length < 2) hours = '0' + hours;
      if (minutes.length < 2) minutes = '0' + minutes;
      if (seconds.length < 2) seconds = '0' + seconds;
      if(type === 1){
        nowTime = year + "-" + month + "-" + day + ' '+ hours + ':' + minutes+':' + seconds;
      }
      if(type === 2){
        nowTime = year + "-" + month + "-" + day;
      }
      return nowTime;
    },

  //给月补充日
    addDay(date,day){
      // debugger
      if(date != "" && date != null){
        if (day < 10){
          day = '0'+day;
        }
        date = date+'-'+day;
      }
      return date;
    },

    //获取30天前的日期
    get30day(){
      let day_30 = new Date().setMonth((new Date().getMonth()-1));    //日期是30天前的对应时间戳
      day_30 = new Date(day_30);       //转换成标准时间
      let y = day_30.getFullYear();    //年
      let m = day_30.getMonth() +1;    //月
      let d = day_30.getDay();         //日
      if(m < 10){
        m = '0'+m;
      }
      if(d < 10){
        d = '0' + d;
      }
      day_30 = y+'-'+m+'-'+d;　　　　//日期是30天前的对应字符串 xxxx-xx-xx　　\
      return day_30;
    }

}
export default formatDate
