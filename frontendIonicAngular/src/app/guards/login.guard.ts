import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard {
    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        let isAuthenticated = false;

        const id = await this.storage.get('id');
        if (id != null) {
            isAuthenticated = true;
        }

        if (isAuthenticated) {
            return this.router.parseUrl('/home');
        }
        return true;
    }
}
