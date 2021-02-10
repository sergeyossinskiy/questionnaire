import { createRouter, createWebHistory } from 'vue-router';
import { GuardsService } from '../services';

const guardsService = new GuardsService();

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
    path: '/login', 
    name: 'Login', 
    meta: { layout: 'auth', guards: ['noauth'] }, 
    component: () => import('../views/auth/Login.vue') 
  },
  { 
    path: '/section/:name_section',
    name: 'Section',
    meta: { layout: 'app' }, 
    component: () => import('../views/Section.vue') 
  },
  { 
    path: '/worksheet/:id_worksheet',
    name: 'Worksheet',
    meta: { layout: 'worksheet' }, 
    component: () => import('../views/Worksheet.vue')
  },
  { 
    path: '/manage', 
    name: 'Manage', 
    meta: { layout: 'dashboard', guards: ['auth', 'available'] },
    component: () => import('../views/Manage.vue') 
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
    const spinner = document.querySelector('.p-progress-spinner-container');
    if (to.name) {
        spinner.style.display = 'block';
    }

    guardsService.init(to, from, next);
})

router.afterEach((to, from) => {
    const spinner = document.querySelector('.p-progress-spinner-container');
    if (to.name) {
        spinner.style.display = 'none';
    }
})

export default router
