import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  pending$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromStore.CoreState>) {}

  ngOnInit() {
    this.pending$ = this.store.select(fromStore.getPending);
    this.errorMessage$ = this.store.select(fromStore.getErrorMessage);
  }

  doLoginUser() {
    this.store.dispatch(
      new fromStore.LoginAction(this.username, this.password)
    );
  }
}
