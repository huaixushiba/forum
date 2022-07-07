import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'
import axios from 'axios'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect:'/home',
    component: Index,
    children:[
      {
        path:'/home',
        component:()=>import('@/views/Home/index.vue')
      },
      {
        path:'/singlecontent/:id',
        component:()=>import('@/views/singleContent/singleContent.vue')
      },
      {
        path:'/singleperson/:username',
        component:()=>import('@/views/singlePerson/index.vue')
      },
      {
        path:'/personarea',
        component:()=>import('@/views/personArea/index.vue'),
        children:[
          {
            name:'myspace',
            path:'/personarea/',
            component:()=>import('@/views/personArea/components/mySpace.vue')
          },
          {
            name:'mysetting',
            path:'/personarea/mysetting',
            component:()=>import('@/views/personArea/components/mySetting.vue')
          },
          {
            name:'myfollows',
            path:'/personarea/myfollows',
            component:()=>import('@/views/personArea/components/myFollows.vue')
          },
          {
            name:'mycollections',
            path:'/personarea/mycollections',
            component:()=>import('@/views/personArea/components/myCollections.vue')
          }
      ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/views/Register/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  axios.post('/validate',{}).then(res=>{
    if(res.data.token){
      store.commit('ISLOGIN', res.data)
      if (to.path === '/login') {
        router.push({
          path: '/'
        })
      }
    }else{
      if (to.path === '/home'||to.path === '/login') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  }).catch(error=>{
    console.log(error)
  })
  next()
})
export default router
