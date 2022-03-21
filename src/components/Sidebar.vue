<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      background-color="rgba(1, 22, 45,.5)"
      text-color="#fff"
      active-text-color="rgb(69, 125 ,187)"
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
    
        {
          // icon: "el-icon-pie-chart",
          index: "shouye",
          menuName: "首页",
          name: "shouye",
          children: null,
          menuType: 1,
          menuUrl: "/shouye",
          pid: -1
        },
        {
          // icon: "el-icon-pie-chart",
          index: "numhei",
          menuName: "黑样本整合",
          menuType: 0,
          menuUrl: "/numhei",
          name: "numhei",
          pid: 3,
          // img: Images.logoUrl1,
          children: [
            {
              index: "domain",
              menuName: "黑样本上传",
              name: "domain",
              menuType: 1,
              children: null,
              menuUrl: "/domain",
            },
            {
              index: "getUploadDomain",
              menuName: "黑样本展示",
              name: "getUploadDomain",
              children: null,
              menuType: 1,
              menuUrl: "/getUploadDomain",
            },
          ],
        },
        {
          // icon: "el-icon-pie-chart",
          index: "finished",
          menuName: "黑样本处理",
          name: "finished",
          children: null,
          menuType: 1,
          menuUrl: "/finished",
          // img: Images.logoUrl,
        },
           {
          // icon: "el-icon-pie-chart",
          index: "404",
          menuName: "黑样本应用",
          name: "404",
          children: null,
          menuType: 1,
          menuUrl: "/404",
          // img: Images.logoUrl,
        },
        {
          // icon: "el-icon-pie-chart",
          index: "boce",
          menuName: "黑样本拨测",
          name: "boce",
          children: null,
          menuType: 1,
          menuUrl: "/boce",
          // img: Images.logoUrl,
        },
        // {
        //   // icon: "el-icon-pie-chart",
        //   index: "findUser",
        //   menuName: "用户管理",
        //   name: "findUser",
        //   children: null,
        //   menuType: 1,
        //   menuUrl: "/findUser",
        // },
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
      // const { data: res } = await this.$http.post("/menu/queryUserMenuList");
      // console.log(res);
      // if (res.code == 200) {
      // console.log(res.data);
      //  this.items= res.data;
let  res=[]
      // =========================
      res.forEach((item) => {
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
     res.forEach((item) => {
        that.menuSec(item);
      });
      // console.log(res.data);
      // }

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

// .el-submenu{
//   padding: 10px;
//     box-sizing: border-box;
// }
.el-submenu /deep/ img {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

/deep/ .el-menu {
  border-right: 0px solid transparent;
}
/deep/ .el-menu-item.is-active {
  background-color: rgba(48, 105, 132, 0.5) !important; //你要修改的颜色
  color: #409eff !important;
}
/deep/.el-submenu__title:hover,
/deep/ .el-menu-item:focus,
/deep/ .el-menu-item:hover {
  background-color: rgba(48, 105, 132, 0.5) !important;
  color: #409eff !important;
}
</style>
