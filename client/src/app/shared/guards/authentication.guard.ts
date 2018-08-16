import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CoreStoreFacade } from '../../core/store/core-store.facade';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private facade: CoreStoreFacade) {}

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
    return this.facade.isAuthenticated$.pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(['/account/login']);
        return false;
      }),
      take(1)
    );
  }
}
