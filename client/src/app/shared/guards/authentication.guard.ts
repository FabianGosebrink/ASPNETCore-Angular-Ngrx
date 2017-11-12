import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { CoreState } from '../../core/store/reducer/core.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private store: Store<any>) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.checkUser();
    }

    canLoad(state: Route): Observable<boolean> {
        return this.checkUser();
    }

    private checkUser(): Observable<boolean> {

        return this.store.select<CoreState>(state => state.core.coreReducer)
            .pipe(
                map((state: CoreState) => {
                    if (state.isAuthenticated) {
                        return true;
                    }
                    this.router.navigate(['/account/login']);
                    return false;
                }),
                take(1))
    }
}
