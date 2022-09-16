export let compareNum = {
    compareNum(IPnum,areanum,ipData,areaData){
        let iplist=[]
        let arealist=[]
        // console.log(ipData)
        // console.log(IPnum,areanum)
        if(IPnum==areanum){
            for(var i=0;i<areanum;i++){
                iplist.push(ipData[i])
                arealist.push(areaData[i])
            }
        }
        else if(IPnum>areanum){
            // console.log(ipData)
            for(var i=0;i<areanum;i++){
                iplist.push(ipData[i])
                arealist.push(areaData[i])
            }
        }else if(areanum>IPnum){
            for(var i=0;i<IPnum;i++){
                iplist.push(ipData[i])
                arealist.push(areaData[i])
            }
        }
        
        return [iplist,arealist]
    }
}