import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class CoreStoreFacade {
  loginPending$ = this.store.pipe(select(fromSelectors.getPending));
  isAuthenticated$ = this.store.pipe(select(fromSelectors.getIsAuthenticated));

  constructor(private store: Store<fromReducers.CoreState>) {}

  login(username: string, password: string) {
    this.store.dispatch(new fromActions.LoginAction(username, password));
  }

  logout() {
    this.store.dispatch(new fromActions.LogoutAction());
  }

  establishSignalRConnection() {
    this.store.dispatch(new fromActions.SignalREstablishConnectionAction());
  }
}
