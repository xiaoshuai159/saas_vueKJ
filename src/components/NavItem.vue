<template>
  <div>
       <!-- 无子级 -->
      <el-menu-item :index="'/'+item.name+''" v-if="item.menuType==1">
        <!-- <i class="el-icon-location"></i> -->
        <span slot="title">{{item.menuName}}</span>
      </el-menu-item>

      <!-- 有子级 -->
      <el-submenu :index="'/'+path+''" v-else>
        <template slot="title" >
          <!-- <i class="el-icon-menu"></i> -->
          <span>{{item.menuName}}</span>
        </template>
        <NavItem v-for="child in item.children" :key="child.name" :item="child" :path="child.name"  />
      </el-submenu>

      <!-- <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <span>{{ item.title }}</span>
           
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <template #title>
              <span>{{ item.title }}</span>
          
            </template>
          </el-menu-item>
        </template>
      </template> -->
  </div>
</template>

<script>
export default {
  name:'NavItem',
  data(){
    return {
      items:[]
    }
  },
  props:['item','path']  //父传子参数
}
</script>

<style>

</style>