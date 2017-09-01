import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AccountActions from '../../store/actions/account.actions';
import { AccountState } from '../../store/reducers/accounts.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    username: string;
    password: string;

    state$: Observable<AccountState>;

    constructor(private store: Store<any>,
        private router: Router) { }

    ngOnInit() {
        this.state$ = this.store.select<AccountState>(state => state.account.accountStore);
        this.store.select<AccountState>(state => state.account.accountStore)
            .filter((state: AccountState) => state.authenticated)
            .subscribe(value => {
                this.router.navigate(['/home'])
            });
    }

    public doLoginUser() {
        this.store.dispatch(new AccountActions.LoginAction(this.username, this.password))
    }
}
