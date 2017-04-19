import { StorageService } from './../../core/services/storage.service';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrentUserService } from '../../core/services/currentUser.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private currentUserService: CurrentUserService, private router: Router) { }

    canActivate() {
        return this.checkUser();
    }

    canLoad() {
        return this.checkUser();
    }

    private checkUser() {
        if (this.currentUserService.isAuthenticated) {
            return true;
        }

        this.router.navigate(['/account/login']);
        return false;
    }
}
