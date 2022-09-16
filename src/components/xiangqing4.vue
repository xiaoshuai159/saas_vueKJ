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
                <!-- 城市 &nbsp;&nbsp;&nbsp;&nbsp;
                  <el-select v-model="searchValue.value" clearable  classplaceholder="请选择" ref='selectLable1'>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        
                    </el-option>
                </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
                事件类型 &nbsp;&nbsp;<el-select
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
                  </el-option> </el-select
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 涉事IP
                &nbsp;&nbsp;<el-input
                  v-model="searchValue.input1"
                  placeholder="单行输入"
                  style="width: 20%"
                ></el-input>
              </div>

              <div align="left">
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />涉事单位
                &nbsp;&nbsp;<el-input
                  v-model="searchValue.input2"
                  placeholder="单行输入"
                  style="width: 20%"
                ></el-input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button @click="chaxun"
                  >查询</el-button
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
                stripe
                border
                class="tableClass"
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
                <el-table-column type="selection" width="50"> </el-table-column>
                <el-table-column label="IP" prop="_id" min-width="130" sortable>
                  <!-- v-if="false" -->
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
                  v-if="false"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="district"
                  label="涉及地区"
                  min-width="100"
                  v-if="false"
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
// import docxtemplater from 'docxtemplater'
// import PizZip from 'pizzip'
// import JSZipUtils from 'jszip-utils'
// import {saveAs} from 'file-saver'
export default {
  data() {
    return {
      loading: false,
      isDisabled: false,
      percentage: 0, //进度条的占比
      currentPage: 1,
      pagesize: 10,
      searchValue: {
        value2: "",
        value3: "",
        input1: "",
        input2: "",
      },
      currentTime: this.$store.state.currentTime,
      options: [],
      options2: [],
      options3: [],
      tableData: [],
      multipleSelection: "",
      multipleSelection_id: [],
      exportid: [],
    };
  },

  methods: {
    filterOptions1() {
      let list1 = [];
      for (var i = 0; i < this.tableData.length; i++) {
        list1.push(this.tableData[i].city);
      }
      let list2 = [...new Set(list1)];
      if (list2 == "") return;
      for (var i = 0; i < list2.length; i++) {
        if (list2[i] != "") {
          this.options.push({
            value: `1.选项${i + 1}`,
            label: list2[i],
          });
        }
      }
    },
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
      // console.log(this.multipleSelection)
      for (var i = 0; i < this.multipleSelection.length; i++) {
        // console.log(this.multipleSelection[i]._id)
        this.multipleSelection_id.push(this.multipleSelection[i]._id); //记得clear
      }

      // console.log(this.multipleSelection[0])
      this.exportid = [];
      this.multipleSelection.forEach((item) => {
        this.exportid.push({
          s_time: this.currentTime[0],
          e_time: this.currentTime[1],
          _id: item._id,
          unit_name: item.unit_name,
          event_type: item.event_type,
        }); //选中数据id给对账单ID
      });
      // console.log(typeof this.exportid)//Object
      // this.exportid = this.exportid.join(",");
      // console.log(typeof this.exportid)//string
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
      // this.$nextTick(()=>{})
      if (
        this.$store.state.province == "重庆市" ||
        this.$store.state.province == "上海市" ||
        this.$store.state.province == "北京市" ||
        this.$store.state.province == "天津市" ||
        this.$store.state.city == "中山市"
      ) {
        axios({
        method:"post",
        url:"/details",
        data:{
              s_time: data1[0],
              e_time: data1[1],
              data: {
                address: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
                  this.$store.state.userinfo.adcode || "",
                ],
                search: [
                  "",
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
            // this.filterOptions1()
            // this.filterOptions2()
            // this.filterOptions3()
            this.loading = false;
          });
      } else {
        axios({
        method:"post",
        url:"/details",
        data:{
              s_time: data1[0],
              e_time: data1[1],
              data: {
                address: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.area ||
                    this.$store.state.userinfo.district ||
                    "",
                  this.$store.state.userinfo.adcode || "",
                ],
                search: [
                  "",
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
            // this.filterOptions1()
            // this.filterOptions2()
            // this.filterOptions3()
            this.loading = false;
          });
      }
    },
    chaxun() {
      this.loading = true;
      if (
        this.$store.state.province == "重庆市" ||
        this.$store.state.province == "上海市" ||
        this.$store.state.province == "北京市" ||
        this.$store.state.province == "天津市" ||
        this.$store.state.city == "中山市"
      ) {
        axios({
        method:"post",
        url:"/details",
        data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
              data: {
                address: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.province ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.district ||
                    "",
                  this.$store.state.userinfo.adcode || "",
                ],
                search: [
                  "",
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
            // this.filterOptions1()
            // this.filterOptions2()
            // this.filterOptions3()
            this.loading = false;
          });
      } else {
        axios({
        method:"post",
        url:"/details",
        data:{
              s_time: this.currentTime[0],
              e_time: this.currentTime[1],
              data: {
                address: [
                  this.$store.state.province ||
                    this.$store.state.userinfo.province ||
                    "",
                  this.$store.state.city ||
                    this.$store.state.userinfo.city ||
                    "",
                  this.$store.state.area ||
                    this.$store.state.userinfo.district ||
                    "",
                  this.$store.state.userinfo.adcode || "",
                ],
                search: [
                  "",
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
            // this.filterOptions1()
            // this.filterOptions2()
            // this.filterOptions3()
            this.loading = false;
          });
      }
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
            // console.log(rep.headers.content-disposition )
            const disposition = rep.headers["content-disposition"];
            // console.log(disposition)
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
    daochu() {
      //console.log(this.exportid)
      if (this.exportid.length === 0) {
        Message({
          message: "请至少选择一条需要导出的数据",
          type: "warning",
        });
        return;
      }
      this.percentage = 0;
      Message({
        message: "正在导出，请稍等。",
      });
      this.isDisabled = true;
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
            // console.log(rep.headers.content-disposition )
            const disposition = rep.headers["content-disposition"];
            // console.log(disposition)
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
    // this.$nextTick(()=>{})
    if (
      this.$store.state.province == "重庆市" ||
      this.$store.state.province == "上海市" ||
      this.$store.state.province == "北京市" ||
      this.$store.state.province == "天津市" ||
      this.$store.state.city == "中山市"
    ) {
      axios({
        method:"post",
        url:"/details",
        data:{
            s_time: this.$store.state.currentTime[0],
            e_time: this.$store.state.currentTime[1],
            data: {
              address: [
                this.$store.state.province ||
                  this.$store.state.userinfo.province ||
                  "",
                this.$store.state.province ||
                  this.$store.state.userinfo.city ||
                  "",
                this.$store.state.city ||
                  this.$store.state.userinfo.district ||
                  "",
                this.$store.state.userinfo.adcode || "",
              ],
              search: [
                "",
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
          this.filterOptions1();
          this.filterOptions2();
          this.filterOptions3();
          this.loading = false;
        });
    } else {
      axios({
        method:"post",
        url:"/details",
        data:{
            s_time: this.$store.state.currentTime[0],
            e_time: this.$store.state.currentTime[1],
            data: {
              address: [
                this.$store.state.province ||
                  this.$store.state.userinfo.province ||
                  "",
                this.$store.state.city || this.$store.state.userinfo.city || "",
                this.$store.state.area ||
                  this.$store.state.userinfo.district ||
                  "",
                this.$store.state.userinfo.adcode || "",
              ],
              search: [
                "",
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
          this.filterOptions1();
          this.filterOptions2();
          this.filterOptions3();
          this.loading = false;
        });
    }
  },
  watch: {
    "$store.state.currentTime": {
      handler(newValue) {
        //console.log(newValue)
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
  margin: 0 30px 0 0;
  border-radius: 5px;
  padding: 12px 21px 12px 28px;
  letter-spacing: 10px;
}
/deep/.tableClass .cell {
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