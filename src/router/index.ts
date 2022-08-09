import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'
import {refreshToken} from "@/utils/api/system"
import {setJwtToken} from "@/utils/common-utils"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Index,
    redirect:'/home',
    children:[{
      path:'/home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/dashboard/Home.vue'),
      name:'Home',
      meta:{
        title:'首页'
      }
    }]
  },
  {
    path:'/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/dashboard/Login.vue'),
    name:'Login',
    meta:{
      title:'登录界面'
    }
  },
  {
    path: '/personal',
    component: Index,
    children:[{
      path:'/personal',
      component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/system/PersonalCenter.vue'),
      name:'PersonalCenter',
      meta:{
        title:'个人中心'
      }
    }]
  },
  {
    path: '/system',
    component: Index,
    name:'system',
    meta:{
      title:'系统管理'
    },
    children:[{
      path:'/department',
      component: () => import(/* webpackChunkName: "department" */ '@/views/system/department.vue'),
      name:'department',
      meta:{
        title:'机构管理'
      }
    },
    {
      path:'/menuList',
      component: () => import(/* webpackChunkName: "menuList" */ '@/views/system/menuList.vue'),
      name:'menuList',
      meta:{
        title:'权限管理'
      }
    },
    {
      path:'/userList',
      component: () => import(/* webpackChunkName: "userList" */ '@/views/system/userList.vue'),
      name:'userList',
      meta:{
        title:'用户管理'
      }
    },
    {
      path:'/metadataList',
      component: () => import(/* webpackChunkName: "metadataList" */ '@/views/system/metadataList.vue'),
      name:'metadataList',
      meta:{
        title:'元数据管理'
      }
    }
  ]},
  {
    path: '/attachments',
    component: Index,
    name:'Attachments',
    children:[{
      path:'/attachmentCategory',
      component: () => import(/* webpackChunkName: "attachmentCategory" */ '@/views/attachments/AttachmentCategory.vue'),
      name:'AttachmentCategory',
      meta:{
        title:'附件管理'
      }
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

 router.beforeEach((to,from,next) => {
  refreshToken().then(res => {
  
      //没有获得新的token==null，
      // 表示旧的token已经失效，需要重新登录
      if(res.data == null && to.name !== 'Login'){
          next({name: 'Login'}) //去登录界面
          setJwtToken('') //清空token
      }else{//否则去你想去的界面，并把新的token保存起来
          setJwtToken(res.data)
          next()
      }
  })
})
export default router
