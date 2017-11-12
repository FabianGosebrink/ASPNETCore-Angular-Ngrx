import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as CoreActions from '../../../core/store/actions/core.actions';
import { CoreState } from '../../../core/store/reducer/core.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;

  state$: Observable<CoreState>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.state$ = this.store.select<CoreState>(state => state.core.coreReducer);
  }

  public doLoginUser() {
    this.store.dispatch(new CoreActions.LoginAction(this.username, this.password))
  }
}
