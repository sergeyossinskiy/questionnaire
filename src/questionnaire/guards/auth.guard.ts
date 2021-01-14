import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { Guard } from './guard';
import { AuthService } from '../services';

export class AuthGuard implements Guard{

    constructor(private auth: AuthService) { }

    canEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
        if (to.name !== 'Login' && !this.auth.check()) next({ name: 'Login' });
        else next();
    }
}