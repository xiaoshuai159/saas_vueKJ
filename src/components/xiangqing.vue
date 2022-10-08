<template>
  <div class="content" ref="xiangqing_ref">
    <el-card style="border-radius: 15px" shadow="hover">
      <el-main style="background-color: white">
        <el-row :gutter="20" style="margin-bottom: 25px; margin-top: -12px">
          <el-col :span="4"
            ><div
              class="grid-content bg-purple"
              style="font-size: 16px; margin-top: 9px; margin-left: -53px"
            >
              事件详情
            </div></el-col
          >
          <el-col :span="20"
            ><div class="grid-content bg-purple">
              <div align="left">
                省份 &nbsp;&nbsp;&nbsp;&nbsp;
                <el-select
                  v-model="searchValue.value"
                  clearable
                  filterable
                  classplaceholder="请选择"
                  ref="selectLable1"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option> </el-select
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 事件类型
                &nbsp;&nbsp;<el-select
                  v-model="searchValue.value2"
                  clearable
                  placeholder="请选择"
                  ref="selectLable2"
                >
                  <el-option
                    v-for="item in options2"
                    :key="'new1' + item.value2"
                    :label="item.label2"
                    :value="item.value2"
                  >
                  </el-option> </el-select
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 单位类型
                &nbsp;&nbsp;<el-select
                  v-model="searchValue.value3"
                  clearable
                  placeholder="请选择"
                  ref="selectLable3"
                >
                  <el-option
                    v-for="item in options3"
                    :key="'new2' + item.value3"
                    :label="item.label3"
                    :value="item.value3"
                  >
                  </el-option>
                </el-select>
              </div>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <div align="left">
                涉事IP &nbsp;&nbsp;<el-input
                  v-model="searchValue.input1"
                  placeholder="单行输入"
                  style="width: 20%"
                ></el-input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;涉事单位
                &nbsp;&nbsp;<el-input
                  v-model="searchValue.input2"
                  placeholder="单行输入"
                  style="width: 20%"
                ></el-input>
              </div>
              <div align="left">
                <el-button @click="chaxun">查询</el-button
                ><el-button @click="daochu()" :disabled="isDisabled"
                  >导出</el-button
                ><el-button
                  @click="newdaochu()"
                  :disabled="isDisabled"
                  class="newButton"
                  >最近记录导出</el-button
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="block">
              <el-table
                class="tableClass"
                stripe
                border
                v-loading="loading"
                ref="multipleTable"
                :data="
                  tableData.slice(
                    (currentPage - 1) * pagesize,
                    currentPage * pagesize
                  )
                "
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="50" fixed>
                </el-table-column>
                <el-table-column label="IP" prop="_id" min-width="130" sortable>
                  <template slot-scope="scope">     
                    <span v-if="scope.row._id != ''&&$store.state.userinfo.user_level==5"> {{ numberMask(scope.row._id) }}</span>
                    <span v-else>{{ scope.row._id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="日期" width="110" sortable>
                  <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <!-- <el-table-column
                        prop="time"
                        label="时间"
                        width="90"
                        >
                        </el-table-column> -->
                <el-table-column
                  prop="event_type"
                  label="事件类型"
                  min-width="110"
                  sortable
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="涉及城市"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="district"
                  label="涉及地区"
                  min-width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="unit_type"
                  label="涉及单位类型"
                  min-width="105"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="unit_name"
                  label="涉及单位名称"
                  min-width="200"
                  show-overflow-tooltip
                >
                <template slot-scope="scope">     
                    <span v-if="scope.row.unit_name != ''&&$store.state.userinfo.user_level==5"> {{ companyMask(scope.row.unit_name) }}</span>
                    <span v-else>{{ scope.row.unit_name }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios";
import {numberMask,companyMask} from '@/utils/mask'
import store from "../store";
export default {
  data() {
    this.numberMask = numberMask
    this.companyMask = companyMask  
    return {
      loading: false,
      isDisabled: false,
      percentage: 0, //进度条的占比
      currentPage: 1,
      pagesize: 10,
      
      searchValue: {
        value: "",
        value2: "",
        value3: "",
        input1: "",
        input2: "",
      },
      // currentTime: this.$store.state.currentTime,
      options: [
        { value: "选项1", label: "北京" },
        { value: "选项2", label: "天津" },
        { value: "选项3", label: "上海" },
        { value: "选项4", label: "重庆" },
        { value: "选项5", label: "内蒙古" },
        { value: "选项6", label: "广西" },
        { value: "选项7", label: "西藏" },
        { value: "选项8", label: "宁夏" },
        { value: "选项9", label: "新疆" },
        { value: "选项10", label: "香港" },
        { value: "选项11", label: "澳门" },
        { value: "选项12", label: "河北" },
        { value: "选项13", label: "山西" },
        { value: "选项14", label: "辽宁" },
        { value: "选项15", label: "吉林" },
        { value: "选项16", label: "黑龙江" },
        { value: "选项17", label: "江苏" },
        { value: "选项18", label: "浙江" },
        { value: "选项19", label: "安徽" },
        { value: "选项20", label: "福建" },
        { value: "选项21", label: "江西" },
        { value: "选项22", label: "山东" },
        { value: "选项23", label: "河南" },
        { value: "选项24", label: "湖北" },
        { value: "选项25", label: "湖南" },
        { value: "选项26", label: "广东" },
        { value: "选项27", label: "海南" },
        { value: "选项28", label: "四川" },
        { value: "选项29", label: "贵州" },
        { value: "选项30", label: "云南" },
        { value: "选项31", label: "陕西" },
        { value: "选项32", label: "甘肃" },
        { value: "选项33", label: "青海" },
        { value: "选项34", label: "台湾" },
      ],
      options2: [],
      options3: [],
      tableData: [
      ],
      multipleSelection: "",
      multipleSelection_id: [],
      exportid: [],
    };
  },
  methods: {
    filterOptions2() {
      let list1 = [];
      for (var i = 0; i < this.tableData.length; i++) {
        list1.push(this.tableData[i].event_type);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options2.push({
            value2: `2.选项${i + 1}`,
            label2: list2[i],
          });
        }
      }
    },
    filterOptions3() {
      let list1 = [];
      for (var i = 0; i < this.tableData.length; i++) {
        list1.push(this.tableData[i].unit_type);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options3.push({
            value3: `3.选项${i + 1}`,
            label3: list2[i],
          });
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection_id.push(this.multipleSelection[i]._id); //记得clear
      }
      this.exportid = [];
      this.multipleSelection.forEach((item) => {
        this.exportid.push({
          s_time: this.$store.state.currentTime[0],
          e_time: this.$store.state.currentTime[1],
          _id: item._id,
          unit_name: item.unit_name,
          event_type: item.event_type,
        });
      });
      return this.multipleSelection;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      //console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //console.log(`当前页: ${val}`);
    },
    changeTime(data1) {
      this.loading = true;
      axios({
        method:"post",
        url:"/details",
        data:{
          s_time: data1[0],
          e_time: data1[1],
          data: {
            address: [
              this.$store.state.userinfo.province || "",
              this.$store.state.userinfo.city || "",
              this.$store.state.userinfo.district || "",
              this.$store.state.userinfo.adcode || "",
            ],
            search: [
              this.$refs.selectLable1.selected.label || "",
              this.$refs.selectLable2.selected.label || "",
              this.$refs.selectLable3.selected.label || "",
              this.searchValue.input1,
              this.searchValue.input2,
            ],
          },
        },
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          this.tableData = rep.data;
          // this.filterOptions1()
          this.loading = false;
        });
    },
    chaxun() {
      this.loading = true;
      axios({
        method:"post",
        url:"/details",
        data:{
            s_time: this.$store.state.currentTime[0],
            e_time: this.$store.state.currentTime[1],
            data: {
              address: [
                this.$store.state.userinfo.province || "",
                this.$store.state.userinfo.city || "",
                this.$store.state.userinfo.district || "",
                this.$store.state.userinfo.adcode || "",
              ],
              search: [
                this.$refs.selectLable1.selected.label || "",
                this.$refs.selectLable2.selected.label || "",
                this.$refs.selectLable3.selected.label || "",
                this.searchValue.input1,
                this.searchValue.input2,
              ],
            },
          },
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          this.tableData = rep.data;
          this.loading = false;
        });
    },
    newdaochu(){
      this.percentage = 0;
      this.isDisabled = true;
      Message({
        message: "正在导出，请稍等。",
      });

      axios({
        method: "post",
        url: "/new",
        // params: this.exportid,
        responseType: "blob",
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          if (rep) {
            this.exportid = [];
            let binaryData = [];
            binaryData.push(rep.data);
            const blobUrl = window.URL.createObjectURL(new Blob(binaryData));
            const a = document.createElement("a");
            a.style.display = "none";
            const disposition = rep.headers["content-disposition"];
            let fileName = disposition.substring(
              disposition.indexOf("filename=") + 9,
              disposition.length
            );
            fileName = decodeURI(escape(fileName));
            fileName = fileName.replace(/\"/g, "");
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            Message({
              message: "导出完成！",
              type: "success",
            });
            this.percentage = 100;
            this.isDisabled = false;
          }
        })
        .catch((err) => {
          this.isDisabled = false;
          Message({
            message: "导出失败，请稍后再试！",
            type: "error",
          });
        });
    },
    daochu() {
      if (this.exportid.length === 0) {
        Message({
          message: "请至少选择一条需要导出的数据",
          type: "warning",
        });
        return;
      }
      this.percentage = 0;
      this.isDisabled = true;
      Message({
        message: "正在导出，请稍等。",
      });

      axios({
        method: "post",
        url: "/export_paper",
        params: this.exportid,
        responseType: "blob",
        headers:{
          'X-CSRFToken':this.$store.state.token
        }
      })
        .then((rep) => {
          if (rep) {
            this.exportid = [];
            let binaryData = [];
            binaryData.push(rep.data);
            const blobUrl = window.URL.createObjectURL(new Blob(binaryData));
            const a = document.createElement("a");
            a.style.display = "none";
            const disposition = rep.headers["content-disposition"];
            let fileName = disposition.substring(
              disposition.indexOf("filename=") + 9,
              disposition.length
            );
            // console.log(fileName)
            // iso8859-1的字符转换成中文
            fileName = decodeURI(escape(fileName));
            // console.log(fileName)
            // 去掉双引号
            fileName = fileName.replace(/\"/g, "");
            // console.log(fileName)
            a.download = fileName;
            a.href = blobUrl;
            a.click();
            Message({
              message: "导出完成！",
              type: "success",
            });
            this.percentage = 100;
            this.isDisabled = false;
          }
        })
        .catch((err) => {
          //console.log(err)
          this.isDisabled = false;
          Message({
            message: "导出失败，请稍后再试！",
            type: "error",
          });
        });
    },
  },
  mounted() {
    this.loading = true;
    axios({
      method: "post",
      url: "/details",
      data: {
        s_time: this.$store.state.currentTime[0],
        e_time: this.$store.state.currentTime[1],
        data: {
          address: [
            this.$store.state.userinfo.province || "",
            this.$store.state.userinfo.city || "",
            this.$store.state.userinfo.district || "",
            this.$store.state.userinfo.adcode || "",
          ],
          search: [
            this.$refs.selectLable1.selected.label || "",
            this.$refs.selectLable2.selected.label || "",
            this.$refs.selectLable3.selected.label || "",
            this.searchValue.input1,
            this.searchValue.input2,
          ],
        },
      },
      headers:{
        'X-CSRFToken':this.$store.state.token
      }
    }).then((rep) => {
      this.tableData = rep.data;
      this.filterOptions2();
      this.filterOptions3();
      this.loading = false;
    });
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        this.changeTime(newValue);
      },
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-select {
  width: 20%;
}
/deep/.el-input__inner {
  height: 23px;
}
/deep/.el-input__suffix {
  top: -1px;
}
/deep/.el-input__icon {
  line-height: inherit;
}
/deep/.el-button {
  line-height: 0.1;
  border-radius: 5px;
  letter-spacing: 10px;
  margin: 15px 30px -8px 0;
  padding: 12px 21px 12px 28px;
}
/deep/.el-icon-loading {
  width: 14px;
  height: 14px;
  margin-top: 14px;
}
/deep/.tableClass .cell {
  // padding-bottom: 12px;
  height: 20px;
  line-height: 20px !important;
}
/deep/.el-table .caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
  margin: -6px auto;
}
</style>
<style>
.newButton {
  letter-spacing: 1px !important;
  padding: 12px 21px 12px 20px !important;
}
</style>