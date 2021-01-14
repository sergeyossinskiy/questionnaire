import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export interface Guard {
    canEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void;
}