import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../core/services/authentication.service';
import { CurrentUserService } from '../../core/services/currentUser.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private currentUserService: CurrentUserService,
        private authService: AuthenticationService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.checkUser();
    }

    canLoad(state: Route): boolean {
        return this.checkUser();
    }

    private checkUser() {
        if (this.currentUserService.isAuthenticated) {
            return true;
        }

        // this.authService.redirectUrl = 

        this.router.navigate(['/account/login']);
        return false;
    }
}
