import { StorageService } from './../../core/services/storage.service';
import { CanActivate, Router, CanLoad, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../core/services/currentUser.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private currentUserService: CurrentUserService,
        private authService: AuthenticationService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkUser(state, route);
    }

    canLoad(state: RouterStateSnapshot) {
        return this.checkUser(state);
    }

    private checkUser(state: RouterStateSnapshot, route?: ActivatedRouteSnapshot, ) {
        if (this.currentUserService.isAuthenticated) {
            return true;
        }

        // this.authService.redirectUrl = 

        this.router.navigate(['/account/login']);
        return false;
    }
}
