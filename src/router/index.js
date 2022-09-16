import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import login1 from '@/components/login1.vue'
import countryPage from '@/components/countryPage.vue'
import provincePage from '@/components/provincePage.vue'
import cityPage from '@/components/cityPage.vue'
import areaPage from '@/components/areaPage.vue'
import num from '@/components/num.vue'
import shejidanwei from '@/components/shejidanwei.vue'
import xiangqing from '@/components/xiangqing.vue'
import xiangqing2 from '@/components/xiangqing2.vue'
import xiangqing3 from '@/components/xiangqing3.vue'
import xiangqing4 from '@/components/xiangqing4.vue'
import num2 from '@/components/num2.vue'
import num3 from '@/components/num3.vue'
import shejidanwei2 from '@/components/shejidanwei2.vue'
import shejidanwei3 from '@/components/shejidanwei3.vue'
Vue.use(Router)
 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login1
    },
    {
        path: '/countryPage',
        name: 'countryPage',
        component: countryPage
    },
    {
        path: '/provincePage',
        name: 'provincePage',
        component: provincePage,
        children:[{
          path: '/xiangqing2',
          name: 'xiangqing2',
          component: xiangqing2,
        }]
    },
    {
      path: '/cityPage',
      name: 'cityPage',
      component: cityPage,
      meta: {
        keepAlive: true
      },
      children:[{
        path: '/xiangqing3',
        name: 'xiangqing3',
        component: xiangqing3,
      }]
  },
    {
      path: '/num',
      name: 'num',
      component: num
    },
    {
    path: '/shejidanwei',
    name: 'shejidanwei',
    component: shejidanwei
    },
    {
      path: '/xiangqing',
      name: 'xiangqing',
      component: xiangqing
    },{
      path: '/num2',
      name: 'num2',
      component: num2
    },
    {
      path: '/num3',
      name: 'num3',
      component: num3
    },
    {
    path: '/shejidanwei2',
    name: 'shejidanwei2',
    component: shejidanwei2
    },
    {
      path: '/shejidanwei3',
      name: 'shejidanwei3',
      component: shejidanwei3
      },
    {
      path: '/areaPage',
      name: 'areaPage',
      component: areaPage,
      children:[{
        path: '/xiangqing4',
        name: 'xiangqing4',
        component: xiangqing4,
      }]
    }


  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userLevel = sessionStorage.getItem('userLevel')
  if (to.name!=='login'&&!token) next({name:'login'})
  else if(to.name=='countryPage'&&userLevel!='1') next({name:'login'})
  else if(to.name=='provincePage'&&userLevel!='1'&&userLevel!='2') next({name:'login'})
  else if(to.name=='cityPage'&&userLevel!='1'&&userLevel!='2'&&userLevel!='3') next({name:'login'})
  else next()
})
export default router