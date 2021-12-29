<template>
  <div class="right_main_under">
    <!-- <h3>系统管理</h3> -->
    <!-- <el-divider></el-divider> -->

    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      :stretch="true"
      type="card"
    >
      <!-- 来源 -->
      <el-tab-pane label="来源" name="first">
        <child1 v-if="isChildUpdate1"></child1>
      </el-tab-pane>
      <!-- 处理情况 -->
      <el-tab-pane label="处理情况" name="second">
        <child2 v-if="isChildUpdate2"></child2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import child1 from "./child1.vue";
import child2 from "./child2.vue";
export default {
  name: "rulemange",
  components: { child1, child2 },
  data() {
    return {
      activeName: "first",
      isChildUpdate1: true,
      isChildUpdate2: false,
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.name == "first") {
        this.isChildUpdate1 = true;
        this.isChildUpdate2 = false;
      } else if (tab.name == "second") {
        this.isChildUpdate1 = false;
        this.isChildUpdate2 = true;
      }
    },
  },
};
</script>

<style scope>
.el-tabs__item {
  color: #fff;
}
.chang {
  width: 500px;
}
.right_main_under {
  margin-left: 1.25rem /* 20/16 */;
}
</style>