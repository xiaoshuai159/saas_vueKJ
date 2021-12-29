import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";




Vue.use(VueRouter)
const routes = [
  // {
  //   path: '/',name:'statisticAnalysis', meta:{ title:'大屏统计' }, component: ()=>import('../views/statisticAnalysis')
  // },
  {
    path: '/', name: 'login', meta: { title: '登录页' }, component: () => import('../views/Login')
  },
  {
    path: '/notPrivilege', name: 'notPrivilege', meta: { title: '无权限' }, component: () => import('../views/403')
  },
  {
    path: '/notPage', name: 'notPage', meta: { title: '无页面' }, component: () => import('../views/404')
  },
  {
    path: '*',
    redirect: '/notPage'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/shouye',
    children: [
      {
        path: '/shouye',
        name: 'shouye',
        meta: {
          title: '首页'
        },
        component: () => import("../views/shouye")
      },

      {
        path: '/domain',
        name: 'domain',
        meta: {
          title: '查看处置'
        },
        component: () => import('../views/domain')
      },

      {
        path: '/getWarning',
        // name:'search_bak',
        name: 'getWarning',
        meta: {
          title: '预警'
        },
        component: () => import("../views/getWarning")
      },
      {
        path: '/finished',
        // name:'search_bak',
        name: 'finished',
        meta: {
          title: '预警-统计结果'
        },
        component: () => import("../views/finished")
      },
      {
        path: '/boce',
        // name:'search_bak',
        name: 'boce',
        meta: {
          title: '拨测详情'
        },
        component: () => import("../views/boce")
      },
      {
        path: '/tongJiResults',
        // name:'search_bak',
        name: 'tongJiResults',
        meta: {
          title: '预警-已完成任务'
        },
        component: () => import("../views/tongJiResults")
      },
      {
        path: '/getUploadDomain',
        name: 'getUploadDomain',
        meta: {
          title: '上传关联'
        },
        component: () => import('../views/getUploadDomain')
      },
      {
        path: '/allocate',
        name: 'allocate',
        meta: {
          title: '管控'
        },
        component: () => import('../views/allocate')
      },
      {
        path: '/getDiscover',
        name: 'getDiscover',
        meta: {
          title: '数据详情'
        },
        component: () => import('../views/getDiscover')
      },
      {
        path: '/taishi',
        name: 'taishi',
        meta: {
          title: '访问态势'
        },
        component: () => import('../views/taishi')
      },
      {
        path: '/xitong',
        name: 'xitong',
        meta: {
          title: '系统管理'
        },
        component: () => import('../views/xitong')
      },
      // {
      //   path: '/ruleFeatures',
      //   name: 'ruleFeatures',
      //   meta: {
      //     title: '侦察'
      //   },
      //   component: () => import('../views/ruleFeatures')
      // },
      // {
      //   path: '/checkTrans',
      //   name: 'checkTrans',
      //   meta: {
      //     title: '管控'
      //   },
      //   component: () => import('../views/checkTrans')
      // },
      // {
      //   path:'/statisticAnalysis',
      //   name:'statisticAnalysis',
      //   meta:{
      //     title:'数据统计分析'
      //   },
      //   component:()=>import('../views/statisticAnalysis')
      // },
      // {

      //   path:'/dataManage',
      //   name:'dataManage',
      //   meta:{
      //     title:'数据存储管理'
      //   },
      //   component:()=>import('../views/dataManage')
      // },{
      //   path:'/verificaTask',
      //   name:'verificaTask',
      //   meta:{
      //     title:'验证任务'
      //   },
      //   component:()=>import('../views/verificaTask')
      // },
      // {
      //   path:'/warnData',
      //   name:'warnData',
      //   meta:{
      //     title:'预警数据管理'
      //   },
      //   component:()=>import('../views/warnData')
      // },
      {
        path: '/findUser',
        name: 'findUser',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/findUser')
      },
      {
        path: '/findRole',
        name: 'findRole',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/findRole')
      },
      {
        path: '/allMenu',
        name: 'allMenu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/allMenu')
      },
      {
        path: '/dept',
        name: 'dept',
        meta: {
          title: '部门管理'
        },
        component: () => import('../views/dept')
      },
      {
        path: '/empty',
        name: 'empty',
        meta: {
          title: '刷新'
        },
        component: () => import('../views/empty')
      },
    ],
    component: Home
  },

]
// 前置守卫
// router.beforeEach((to, from, next) => {
 
//   if(to.path=='/'){
//     next()
//   }else{
//     if (to.path != '/' && window.sessionStorage.getItem('one')){
//       next()
//  } else {
//       next('/')
//  }
//   }

const router = new VueRouter({
  // mode: 'history',
  mode:'hash',
  routes
})

// })
// 前置守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const user = window.sessionStorage.getItem('isLogin')
//   if (user == 'true') return next()
//   next('/login')
// })

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
