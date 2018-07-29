import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../../core/services/currentUser.service';
import * as fromCore from '../../../core/store';
import { Configuration } from '../../configuration/app.configuration';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    public configuration: Configuration,
    public currentUserService: CurrentUserService,
    private store: Store<fromCore.CoreState>
  ) {
    this.isAuthenticated$ = this.store.select(fromCore.getIsAuthenticated);
  }

  logout($event: Event) {
    $event.preventDefault();
    this.store.dispatch(new fromCore.LogoutAction());
  }

  doNothing($event: Event) {
    $event.preventDefault();
  }
}
