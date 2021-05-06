import { createRouter, createWebHistory } from 'vue-router'
import store from './store';
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import ColumnDetail from "./views/ColumnDetail.vue";
import Create from './views/CreatePost.vue'
import Signup from './views/Signup.vue'


const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  }else if(to.meta.redirectAlreadyLogin && store.state.user.isLogin){
    next({ name: 'home' })
  }
  else {
    next()
  }
})

export default router