<template>
     <div class="search_select_form">
    <el-form class="demo-form-inline" :inline="true" >
      <el-form-item label="下发时间">
        <el-date-picker
          v-model="dateValue_find"
          type="datetimerange"
          :change="dataCreate_change(dateValue_find)"
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
    </el-form>
        </div>
</template>

<script>
export default {
  name: "child1",
  data() {
    return {
      dateValue_find: "",
      whiteSearchList: {
        startUploadTime: "",
        endUploadTime: "",
      },
    };
  },
  methods: {
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

<style>
</style>