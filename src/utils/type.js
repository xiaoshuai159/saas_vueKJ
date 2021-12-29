export default function  zP(val){
    if (val == "dk"&&'DK') {
        return "贷款";
      } else if (val == "sd"&&'SD') {
        return "刷单";
      } else if (val == "gjf"&&'GJF') {
        return "冒充公务单位";
      } else if (val == "lc"&&'LC') {
        return "理财";
      } else if (val == "kf"&&'KF') {
        return "客服";
      } else if (val == "szp"&&'SZP') {
        return "杀猪盘";
      }else if (val == "GW") {
        return "网络购物";
      }
}