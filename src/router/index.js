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
          title: '黑样本应用-反制'
        },
        component: () => import('../views/domain')
      },
      {
        path: '/getWarning',
        name: 'getWarning',
        meta: {
          title: '黑样本应用-预警'
        },
        component: () => import('../views/getWarning')
      },
      {
        path: '/getUploadDomain',
        // name:'search_bak',
        name: 'getUploadDomain',
        meta: {
          title: '黑样本展示'
        },
        component: () => import("../views/getUploadDomain")
      },
      {
        path: '/finished',
        // name:'search_bak',
        name: 'finished',
        meta: {
          title: '黑样本处理'
        },
        component: () => import("../views/finished")
      },
      {
        path: '/boce',
        // name:'search_bak',
        name: 'boce',
        meta: {
          title: '黑样本拨测'
        },
        component: () => import("../views/boce")
      },
      {
        path: '/getDiscover',
        // name:'search_bak',
        name: 'getDiscover',
        meta: {
          title: '黑样本整合-展示'
        },
        component: () => import("../views/getDiscover")
      },
       
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404'
        },
        component: () => import('../views/404')
      },
    
     
      // {
      //   path: '/findUser',
      //   name: 'findUser',
      //   meta: {
      //     title: '用户管理'
      //   },
      //   component: () => import('../views/findUser')
      // },
     
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



// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') return next()
  const user = window.sessionStorage.getItem('isLogin')
  if (user == 'true') return next()
alert('请登录')
next("/")
})

export default router
