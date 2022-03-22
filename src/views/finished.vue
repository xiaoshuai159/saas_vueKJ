<template>
  <div class="right_main_under">
    <div class="search_select_form">
      <template>
        <el-form
          :inline="true"
          class="demo-form-inline"
          size="mini"
          enctype="multipart/form-data"
        >
          <!-- 上传时间 -->
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="list_num.dateValue_find"
              type="datetimerange"
              :change="dataCreate_change(list_num.dateValue_find)"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              size="mini"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>

          <!-- 是否存活 -->
          <el-form-item label="是否存活">
            <el-select
              v-model="list_num.cunhou"
              placeholder="是否存活"
              clearable
              @clear="cunhou_clearFun(list_num.cunhou)"
            >
              <el-option
                v-for="item in selectData.cunhuolist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 是否备案 -->
          <el-form-item label="是否备案">
            <el-select
              v-model="list_num.modelType1"
              placeholder="是否备案"
              clearable
              @clear="modelType1_clearFun(list_num.modelType1)"
            >
              <el-option
                v-for="item in selectData.balist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 是否为境内外 -->
          <el-form-item label="是否为境内外">
            <el-select
              v-model="list_num.jinneiwai"
              placeholder="是否为境内外"
              clearable
              @clear="jinnei_clearFun(list_num.jinneiwai)"
            >
              <el-option
                v-for="item in selectData.jinneiwailist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 服务器IP同源标记 -->
          <!-- <el-form-item label="服务器IP同源标记">
            <el-input
              v-model="list_num.ty"
              placeholder="服务器IP同源标记"
            ></el-input>
          </el-form-item> -->
          <!-- 是否跳转 -->
          <el-form-item label="是否跳转">
            <el-select
              v-model="list_num.tz"
              placeholder="是否跳转"
              clearable
              @clear="tz_clearFun(list_num.tz)"
            >
              <el-option
                v-for="item in selectData.tzlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 是否使用cdn -->
          <el-form-item label="是否使用cdn">
            <el-select
              v-model="list_num.cdn"
              placeholder="是否使用cdn"
              clearable
              @clear="cdn_clearFun(list_num.cdn)"
            >
              <el-option
                v-for="item in selectData.cdnlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              @click.native.stop="searchTabData"
              v-prevent-click
              >查询</el-button
            >
            <el-button type="primary" size="mini" @click.native="resetFun"
              >重置</el-button
            >

            <!-- </template> -->
          </el-form-item>
        </el-form>
      </template>
    </div>

    <el-table
      :row-key="getRowKeys"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="600px"
      size="mini"
      class="tableStyle"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" :reserve-selection="true" width="55">
      </el-table-column> -->
      <!-- <el-table-column label="id" prop="id" v-if="isLoading"> </el-table-column> -->

      <el-table-column label="域名" prop="ym" show-overflow-tooltip>
      </el-table-column>
       <el-table-column label="是否存活" prop="cunhuo"> </el-table-column>
      <el-table-column label="是否备案" prop="ba"> </el-table-column>
      <el-table-column label="境内外识别" prop="ly"> </el-table-column>
      <el-table-column label="是否跳转" prop="tz" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="跳转后网址" prop="tzh"> </el-table-column>
      <!-- <el-table-column label="服务器IP同源标记" prop="ty"> </el-table-column> -->
      <el-table-column label="是否使用cdn" prop="ifcdn" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="Cdn(IP)" prop="ip"> </el-table-column>
      <el-table-column label="cdn公司" prop="gs"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list_num: {
        modelType1: null, //是否备案
        jinneiwai: null, //是否为境内外
        ty: null, //服务器IP同源标记
        tz: null, //是否跳转
        cdn: null, //是否使用cdn
        cunhou: null, //是否存活
        dateValue_find: null,
      },
      whiteSearchList: {
        startUploadTime: "",
        endUploadTime: "",
      },
      //下拉框的选项数据
      selectData: {
        protocolData: [
          { value: "HTTP", label: "HTTP" },
          { value: "HTTPS", label: "HTTPS" },
        ],

        stateTypeData: [
          { value: 0, label: "处置中" },
          { value: 1, label: "已处置" },
        ],
        model_typeData: [
          { value: "DK", label: "贷款代办信用卡类" },
          { value: "SD", label: "刷单返利类" },
          { value: "GJF", label: "冒充公检法及政府机关类" },
          { value: "LC", label: "投资理财" },
          { value: "GW", label: "网络购物" },
          { value: "QT", label: "其他类型" },
          { value: "KF", label: "冒充电商客服类" },
          { value: "JJGW", label: "冒充军警购物诈骗" },
          { value: "SZP", label: "杀猪盘" },
          { value: "DS", label: "虚假购物、服务类" },
          { value: "JY", label: "网络婚恋、交友类（非杀猪盘类）" },
          { value: "ZX", label: "虚假征信类" },
          { value: "MC", label: "冒充领导、熟人类" },
          { value: "YX", label: "网络游戏产品虚假交易类" },
          { value: "APP_FF", label: "分发平台(APP签名分发)" },
          { value: "XZYM", label: "下载页面(带二维码的下载链接)" },
          { value: "OTHER", label: "其他类型诈骗" },
        ],

        authorize: [
          { value: 0, label: "未授权" },
          { value: 1, label: "已授权" },
        ],
        balist: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
        jinneiwailist: [
          { value: 0, label: "境内" },
          { value: 1, label: "境外" },
        ],
        tzlist: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
        cdnlist: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
        cunhuolist: [
          { value: 0, label: "是" },
          { value: 1, label: "否" },
        ],
      },
      tableData: [
        {
          ym: "网址1",
          ba: "是",
          cunhuo:'是',
          ly: "境外",
          tz: "是",
          tzh: "www.12.com",
          ty: "12.33.12.1 ",
          ifcdn: "是",
          ip: "12.333.42.",
          gs: "长安公司",
        },
      ],
      mypageable: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1,
      totalPages: "",
    };
  },
  methods: {
    getRole1(data) {
      return getRole(data);
    },
    // 诈骗类型
    modelType1_clearFun(val) {
      if (val == "") {
        this.list_num.modelType1 = null;
      }
    },
    //是否为境内外
    jinnei_clearFun(val) {
      if (val == "") {
        this.list_num.jinneiwai = null;
      }
    },
    // 是否跳转
    tz_clearFun(val) {
      if (val == "") {
        this.list_num.tz = null;
      }
    },
    cdn_clearFun(val) {
      if (val == "") {
        this.list_num.cdn = null;
      }
    },
    cunhou_clearFun(val) {
      if (val == "") {
        this.list_num.cunhou = null;
      }
    },
    //上传时间
    dataCreate_change(val) {
      if (val && val != "") {
        this.whiteSearchList.startUploadTime = val[0];
        this.whiteSearchList.endUploadTime = val[1];
      } else {
        this.whiteSearchList.startUploadTime = null;
        this.whiteSearchList.endUploadTime = null;
      }
    },
  },
};
</script>

<style  scoped lang='less'>
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #192d45;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #03112359;
}
/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #192d45 !important;
}
</style>