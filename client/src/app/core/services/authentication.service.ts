import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Configuration } from '../../shared/configuration/app.configuration';
import { Token } from '../../shared/models/token';
import { CurrentUserService } from './currentUser.service';

@Injectable()
export class AuthenticationService {

    public redirectUrl: string;

    constructor(private http: HttpClient,
        private currentUserService: CurrentUserService,
        private router: Router,
        private configuration: Configuration) {

    }

    loginUser(username: string, password: string): Observable<Token> {
        const clientId = 'client_id=' + this.configuration.authConfig.CLIENT_ID;
        const grantType = 'grant_type=' + this.configuration.authConfig.GRANT_TYPE;
        const usernameForBody = 'username=' + username;
        const passwordForBody = 'password=' + password;
        const scope = 'scope=' + this.configuration.authConfig.SCOPE;

        const body = clientId.concat('&', grantType, '&', usernameForBody, '&', passwordForBody, '&', scope);

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return Observable.create((observer: Observer<Token>) => {
            this.http.post<Token>(this.configuration.server + 'connect/token', body, options)
                .subscribe((tokenData: Token) => {
                    this.currentUserService.token = tokenData.access_token;
                    this.currentUserService.username = username;
                    observer.next(tokenData);
                }, (error) => observer.error(error),
                () => observer.complete());
        });
    }

    logoutUser() {
        this.currentUserService.token = null;
        this.currentUserService.username = null;
        this.router.navigate(['/home']);
    }
}
