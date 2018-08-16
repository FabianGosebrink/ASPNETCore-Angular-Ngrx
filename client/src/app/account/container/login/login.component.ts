import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreStoreFacade } from '../../../core/store/core-store.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  pending$: Observable<boolean>;

  constructor(private facade: CoreStoreFacade) {}

  ngOnInit() {
    this.pending$ = this.facade.loginPending$;
  }

  doLoginUser() {
    this.facade.login(this.username, this.password);
  }
}
