import { RouteRecordRaw } from 'vue-router';
import { AppLayout, AuthLayout, ErrorLayout } from '../views/layouts';
import { Login } from '../views/auth';
import { Page404 } from '../views/errors';
import { Home, About, Profile } from '../views';
import { AuthGuard } from '../guards';

//const authGuard = container.get<AuthGuard>();

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirect: 'home'},
      { path: '/home', name: 'Home', component: Home },
      { path: '/profile', name: 'Profile', component: Profile/*, beforeEnter: authGuard.canEnter*/ }, 
      { path: '/about', name: 'About', component: About } 
    ]
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '/login', name: 'Login', component: Login } 
    ]
  },
  {
    path: '',
    component: ErrorLayout,
    children: [
      { path: '/:pathMatch(.*)*', name: '404', component: Page404 },
    ]
  }
]

export default routes
