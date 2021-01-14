import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import App from './App.vue';
import QuestionnaireRoutes from './questionnaire/router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: App,
    children: QuestionnaireRoutes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
