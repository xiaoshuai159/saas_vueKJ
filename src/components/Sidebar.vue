<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      background-color="#01162d"
      text-color="#bfcbd9"
      active-text-color="rgb(69 125 187)"
      router
    >
      <NavItem
        v-for="(v, index) in items"
        :key="index"
        :item="v"
        :path="v.name"
      />
    </el-menu>
  </div>
</template>

<script>
import NavItem from "./NavItem";

export default {
  data() {
    return {
      pid: [],
      Newname: [],
      Newname1: [],
      Newname2: [],
      Newname3: [],
      items: [
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "shouye",
        //   title: "首页",
        // },
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "one",
        //   title: "反制",
        //   // img: Images.logoUrl1,
        //   subs: [
        //     {
        //       index: "domain",
        //       title: "数据详情",
        //     },
        //     {
        //       index: "getUploadDomain",
        //       title: "上传样本",
        //     },
        //   ],
        // },
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "dashboard",
        //   title: "预警",
        //   // img: Images.logoUrl,
        //   subs: [
        //     {
        //       index: "getWarning",
        //       title: "进行中",
        //     },
        //     {
        //       index: "search_success",
        //       title: "已完成",
        //     },
        //     {
        //       index: "search_echarts",
        //       title: "统计结果",
        //     },
        //   ],
        // },
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "faxian",
        //   title: "访问记录",
        //   // img: Images.logoUrl,
        //   subs: [
        //     {
        //       index: "getDiscover",
        //       title: "数据详情",
        //     },
        //   ],
        // },
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "xitong",
        //   title: "系统管理",
        //   subs: [
        //     {
        //       index: "findUser",
        //       title: "用户管理",
        //     },
        //     {
        //       index: "allMenu",
        //       title: "菜单管理",
        //     },
        //     {
        //       index: "findRole",
        //       title: "角色管理",
        //     },
        //     {
        //       index: "bumen",
        //       title: "部门管理",
        //     },
        //   ],
        // },
        // // ——————————————————————————————————————————————————————————
        // // {
        // //   icon: "el-icon-pie-chart",
        // //   // index: "ruleFeatures",
        // //   title: "侦察",
        // //   img: Images.logoUrl1,
        // // },
        // // {
        // //   icon: "el-icon-pie-chart",
        // //   // index: "checkTrans",
        // //   title: "管控",
        // //   img: Images.logoUrl1,
        // // },
        // // {
        // //   icon: "el-icon-pie-chart",
        // //   // index: "search_bak",
        // //   title: "警情",
        // //   img: Images.logoUrl1,
        // // },
        // // subs: [
        // //   {
        // //     index: "permission",
        // //     title: "权限测试",
        // //   },
        // //   {
        // //     index: "404",
        // //     title: "404页面",
        // //   },
        // // ],
        // // },
      ],
    };
  },
  components: {
    NavItem,
  },
  mounted() {
    this.qx();
  },
  methods: {
    async qx() {
      const that = this;
      const { data: res } = await this.$http.post("/menu/queryUserMenuList");
      // console.log(res);
      if (res.code == 200) {
        // console.log(res.data);
        this.items = res.data;

        // =========================
        res.data.forEach((item) => {
          that.menuFir(item);
        });
        this.pid = this.getSetArr(this.pid);
        // console.log(this.pid);
        if (!window.sessionStorage.getItem("btn")) {
          window.sessionStorage.setItem("btn", this.Newname1);
        }
        if (!window.sessionStorage.getItem("list")) {
          window.sessionStorage.setItem("list", this.Newname3);
        }
        // console.log(this.Newname3);
        res.data.forEach((item) => {
          that.menuSec(item);
        });
        // console.log(res.data);
      }

      // console.log(res.data);
      // this.items = res.data;
    },
    getSetArr(arr) {
      return [...new Set(arr)];
    },
    //
    menuFir(data) {
      if (data.menuType != 1) {
        // data["isShow"] = true;
        if (data.children) {
          data.children.forEach((item) => {
            if (item.menuType == 2) {
              this.Newname2.push(item.name);
              this.Newname3 = this.Newname2;
            }
            this.menuFir(item);
          });
        }
      } else {
        // data["isShow"] = false;
        this.pid.push(data.pid);
        this.Newname.push(data.name);
        this.Newname1 = this.Newname;
      }
    },

    menuSec(data) {
      var flag = false;
      for (var item in this.pid) {
        // console.log(item);
        // console.log(data.id,this.pid[item]);
        if (data.id != this.pid[item]) {
          flag++;
          continue;
        } else {
          data.menuType = 1;
          break;
        }
      }
      if (data.children) {
        data.children.forEach((item) => {
          this.menuSec(item);
        });
      } else {
        data.menuType = 1;
      }
    },
  },
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace("/", "");
    // },
    // collapse() {
    //   return this.$store.state.collapse;
    // },
  },
};
</script>

<style scoped lang="less">
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 15rem;
}
.sidebar > ul {
  height: 100%;
}
/deep/.el-menu-item,
/deep/.el-submenu__title {
  height: 67px;
  line-height: 70px;
}
/deep/.el-submenu__title {
}
// .el-submenu{
//   padding: 10px;
//     box-sizing: border-box;
// }
.el-submenu /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.el-menu-item /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
