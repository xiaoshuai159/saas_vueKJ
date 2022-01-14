// 二级分类映射
export default function erji(val) {
    switch (val) {
        case "kf_ds":
         return    "冒充电商客服"
            // //break;
        case "kf_wl":
            "冒充物流客服(物流快递)"
            // //break;
        case "kf_other":
            return "其他冒充客服类"
            // //break;
        case "gjf_mc":
            return   "冒充公检法"
            //break;
        case "gjf_ss":
            return  "工商平台类"
            //break;
        case "gjf_etc":
            return   "ETC通行卡"
            //break;
        case "gjf_other":
            return  "其他政府机关或单位组织"
            //break;
        case "dk_xyz":
            return   "虚假代办信用卡"
            //break;
        case "dk_te":
            return   "虚假提额套现"
            //break;
        case "dk_dk":
            return   "虚假贷款"
            //break;
        case "dk_other":
            return  "其他贷款代办信用卡类"
            //break;
        case "jjgw":
            return    "冒充军警购物诈骗"
            //break;
        case "szp_lc":
          return  "虚假投资理财(股票期货交易/数字币)"
            // //break;
        case "szp_dubo":
            return  "博彩彩票/娱乐城/购彩/投注押注/开奖/赛马会"
            //break;
        case "szp_ty":
            return   "体育直播/比分竞猜"
            //break;
        case "szp_yx":
            return   "棋牌游戏"
            //break;
        case "ds_gw":
            return  "虚假购物(购买账号/发卡/自动下单/购物商城/领卷/卡密/刷单刷信誉/提升店铺流量/提升排名"
            //break;
        case "ds_fw":
            return   "虚假服务"
            //break;
        case "ds_other":
            return  "其他电商类诈骗"
            //break;
        case "jy_jr":
            return  "冒充外国军人"
            //break;
        case "jy_hl":
            return   "冒充婚恋"
            //break;
        case "jy_jy":
            return   "网络教育/聊天交友(密聊/闲聊)"
            //break;
        case "jy_other":
            return  "其他网络婚恋/交友类"
            //break;
        case "zx_xyd":
            return  "消除校园贷记录"
            //break;
        case "zx_bljl":
            return "消除不良记录"
            //break;
        case "zx_other":
            return "其他虚假征信类"
            //break;
        case "mc_ld":
            return   "冒充领导"
            //break;
        case "mc_sr":
            return "冒充熟人"
            //break;
        case "mc_gz":
            return  "冒充公众人物"
            //break;
        case "mc_other":
            return  "冒充其他身份"
            //break;
        case "yx_card":
            return "游戏币/游戏点卡诈骗"
            //break;
        case "yx_zhzb":
            return  "游戏账号/游戏装备诈骗"
            //break;
        case "yx_other":
            return  "消除不良记录"
            //break;
        case "zx_other":
            return  "其他游戏产品虚假交易"
            //break;
        case "other_zj":
            return   "虚假中奖诈骗"
            //break;
        case "other_zp":
            return    "虚假招聘"
            //break;
        case "other_jp":
            return   "机票退改诈骗"
            //break;
        case "other_tp":
            return  "ps图片诈骗"
            //break;
        case "app_ff":
            return  "分发平台"
            //break;
        case "xzym":
            return  "下载页面"
            //break;
        case "dk_bxf":
            return  "贷款(部下发)"
            //break;
        case "dk_aj":
            return  "贷款(案件)"
            //break;
        case "sd_bxf":
            return  "刷单(部下发)"
            //break;
        case "sd_aj":
            return  "刷单(案件)"
            //break;
        case "gJf_bxf":
            return   "仿冒公检法(部下发)"
            //break;
        case "gjf_aj":
            return  "仿冒公检法(案件)"
            //break;
        case "lc_bxf":
            return  "投资理财(部下发)"
            //break;
        case "lc_aj":
            return  "投资理财(案件)"
            //break;
        case "gw_bxf":
            return   "网络购物(部下发)"
            //break;
        case "gw_aj":
            return  "网络购物(案件)"
            //break;
        case "qt_bxf":
            return "其他类型诈骗(部下发)"
            //break;
        case "qt_aj":
            return "其他类型诈骗(案件)"
            //break;
        case "jjgw_bxf":
            return  "冒充军警购物诈骗(部下发)"
            //break;
        case "jjgw_aj":
            return  "冒充军警购物诈骗(案件)"
            //break;
        case "szp_bxf":
            return   "杀猪盘(部下发)"
            //break;
        case "szp_aj":
            return  "杀猪盘(案件)"
            //break;
        case "ds_bxf":
            return  "虚假购物/服务类(部下发)"
            //break;
        case "ds_aj":
            return  "虚假购物/服务类(案件)"
            //break;
        case "jy_bxf":
            return  "网络婚恋/交友类(部下发)"
            //break;
        case "jy_aj":
            return  "网络婚恋/交友类(案件)"
            //break;
        case "zx_bxf":
            return   "虚假征信类(部下发)"
            //break;
        case "zx_aj":
            return   "虚假征信类(案件)"
            //break;
        case "mc_bxf":
            return   "冒充领导/熟人类(部下发)"
            //break;
        case "mc_aj":
            return  "冒充领导/熟人类(案件)"
            //break;
        case "yx_bxf":
            return  "网络游戏产品虚假交易类(部下发)"
            //break;
        case "yx_aj":
            return  "网络游戏产品虚假交易类(案件)"
            //break;
        case "app_bxf":
            return  "分发平台(部下发)"
            //break;
        case "app_aj":
            return   "分发平台(案件)"
            //break;
        case "xzym_bxf":
            return  "下载页面(部下发)"
            //break;
        case "xzym_aj":
            return   "下载页面(案件)"
            //break;
        case "other_bxf":
            return  "其他类型诈骗(部下发)"
            //break;
        case "other_aj":
            return   "其他类型诈骗(案件)"
            //break;
        case "dk":
            return   "贷款代办信用卡类"
            //break;
        case "gjf":
            return   "冒充公检法及政府机关类"
            //break;
        case "lc":
            return  "投资理财"
            //break;
        case "gw":
            return  "网络购物"
            //break;
        case "qt":
            return  "其他"
            //break;
        case "kf":
            return "冒充电商客服类"
            //break;
        case "szp":
            return  "杀猪盘"
            //break;
        case "ds":
            return   "虚假购物、服务类"
            //break;
        case "jy":
            return  "网络婚恋、交友类（非杀猪盘类）"
            //break;
        case "zx":
            return   "虚假征信类"
            //break;
        case "mc":
            return   "冒充领导、熟人类"
            //break;
        case "yx":
            return   "网络游戏产品虚假交易类"
            //break;
        case "other":
            return  "其他类型诈骗"
            //break;
        case "app":
            return   "APP签名分发"
            //break;
        case "xzym":
            return  "带二维码的下载链接"
            //break;
            case "sd":
                return  "刷单"
                //break;
    
        default:
            return   val
    }
}