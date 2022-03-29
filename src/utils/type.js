export default function zP(val) {
  switch (val) {
    case "DK":
      return "贷款"
    case "SD":
     return "刷单"
    // //break;
    case "GJF":
      return "仿冒公检法"
    // //break;
    case "LC":
      return "投资理财"
    //break;
    case "GW":
      return "冒充电商客服类"
    //break;
    case "QT":
      return "其他类型诈骗"
    //break;
    case "KF":
      return "冒充电商客服类"
    //break;
    case "JJGW":
      return "冒充军警购物诈骗"
      case "MC":
        return "冒充领导/熟人类"
    //break;
    case "SZP":
      return "杀猪盘"
    case "DS":
     return "虚假购物/服务类"
    // //break;
    case "JY":
      return "网络婚恋/交友类"
    // //break;
    case "ZX":
      return "虚假征信类"
    //break;
    case "YX":
      return "网络游戏产品虚假交易类"
    //break;
    case "OTHER":
      return "其他类型诈骗"
    //break;
    case "APP":
      return "分发平台"
    //break;
    case "XZYM":
      return "下载页面"

      default :
      return val
    //break;
  }


}