import { createRouter, createWebHistory } from 'vue-router';
import { GuardsService } from '../services';

const routes = [
  { 
    path: '', 
    redirect: 'home'
  },
  { 
    path: '/home', 
    name: 'Home', 
    meta: { layout: 'app' }, 
    component: () => import('../views/Home.vue') 
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    meta: { layout: 'app', guards: ['auth', 'ava'] }, 
    component: () => import('../views/Profile.vue') 
  }, 
  { 
    path: '/about', 
    name: 'About', 
    meta: { layout: 'app' }, 
    component: () => import('../views/About.vue')
  },
  { 
    path: '/login', 
    name: 'Login', 
    meta: { layout: 'auth' }, 
    component: () => import('../views/auth/Login.vue') 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: '404',
    meta: { layout: 'error' }, 
    component: () => import('../views/errors/Page404.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.guards) {
    GuardsService.init(to, from, next);
  }
  else{
    next();
  }  
})

export default router
