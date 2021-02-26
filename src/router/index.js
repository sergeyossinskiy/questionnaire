import { createRouter, createWebHistory } from 'vue-router';
import { GuardsService } from '../services';

const guardsService = new GuardsService();

const routes = [
  { 
    path: '', 
    redirect: 'home',
    meta: {
      title: "Quiz"
    }
  },
  { 
    path: '/home', 
    name: 'Home', 
    meta: { title: "Quiz", layout: 'app' }, 
    component: () => import('../views/Home.vue') 
  },
  { 
    path: '/login', 
    name: 'Login', 
    meta: { title: "Quiz", layout: 'auth', guards: ['noauth'] }, 
    component: () => import('../views/auth/Login.vue') 
  },
  { 
    path: '/section/:name_section',
    name: 'Section',
    meta: { title: "Quiz", layout: 'app' }, 
    component: () => import('../views/Section.vue') 
  },
  { 
    path: '/worksheet/:id_worksheet',
    name: 'Worksheet',
    meta: { title: "Quiz", layout: 'worksheet' }, 
    component: () => import('../views/Worksheet.vue')
  },
  { 
    path: '/manage', 
    name: 'Manage', 
    meta: { title: "Quiz", layout: 'dashboard', guards: ['auth', 'available'] },
    component: () => import('../views/Manage.vue'),
  },
  { 
    path: '/statistic', 
    name: 'Statistic', 
    meta: { title: "Quiz", layout: 'statistic', guards: ['auth', 'available'] },
    component: () => import('../views/Statistic.vue'),
  },
  { 
    path: '/statistic/:id', 
    name: 'Statistic:File', 
    meta: { title: "Quiz", layout: 'statistic', guards: ['auth', 'available'] },
    component: () => import('../views/StatisticFile.vue'),
  },
  { 
    path: '/history', 
    name: 'History', 
    meta: { title: "Quiz", layout: 'app', guards: ['auth'] }, 
    component: () => import('../views/History.vue')
  },
  { 
    path: '/profile', 
    name: 'Profile', 
    meta: { title: "Quiz", layout: 'app', guards: ['auth', 'ava'] }, 
    component: () => import('../views/Profile.vue') 
  }, 
  { 
    path: '/about', 
    name: 'About', 
    meta: { title: "Quiz", layout: 'app' }, 
    component: () => import('../views/About.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: '404',
    meta: { title: "Quiz", layout: 'error' }, 
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

    if (to.meta.title) document.title = to.meta.title;
})

router.afterEach((to, from) => {
    const spinner = document.querySelector('.p-progress-spinner-container');
    if (to.name) {
        spinner.style.display = 'none';
    }
})

export default router
