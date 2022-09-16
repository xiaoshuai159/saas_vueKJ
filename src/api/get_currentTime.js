export let getDate = {
    getDateRange(dateNow,intervalDays,bolPastTime){
        let oneDayTime = 24 * 60 * 60 * 1000;
        let list = [];
        let lastDay;
    
        if(bolPastTime == true){
            lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
            list.push(this.formateDate(lastDay));
            list.push(this.formateDate(dateNow));
        }else{
            lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
            list.push(this.formateDate(dateNow));
            list.push(this.formateDate(lastDay));
        }
        return list;
    },
    formateDate(time){
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
    
        if (month < 10) {
          month = '0' + month
        }
    
        if (day < 10) {
          day = '0' + day
        }
        return year + '-' + month + '-' + day + ''
     },

 }

        