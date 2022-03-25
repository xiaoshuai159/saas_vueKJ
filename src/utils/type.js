export default function zP(val) {
  switch (val) {
    case "DK":
      return "贷款"
    case "SD":
     return "刷单返利类"
    // //break;
    case "GJF":
      return "冒充公检法及政府机关类"
    // //break;
    case "LC":
      return "投资理财"
    //break;
    case "GW":
      return "网络购物"
    //break;
    case "QT":
      return "其他"
    //break;
    case "KF":
      return "冒充电商客服类"
    //break;
    case "JJGW":
      return "冒充军警购物诈骗"
    //break;
    case "SZP":
      return "杀猪盘"
    case "DS":
      "虚假购物、服务类"
    // //break;
    case "JY":
      return "网络婚恋/交友类（非杀猪盘类）"
    // //break;
    case "ZX":
      return "虚假征信类"
    //break;
    case "MC":
      return "网络游戏产品虚假交易类"
    //break;
    case "OTHER":
      return "其他类型诈骗"
    //break;
    case "APP":
      return "APP签名分发"
    //break;
    case "XZYM":
      return "带二维码的下载链接"

      default :
      return val
    //break;
  }


}