import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpWrapperService } from './httpWrapper.service';
import { Router } from '@angular/router';
import { CurrentUserService } from './currentUser.service';
import { Configuration } from '../../shared/configuration/app.configuration';
import { Token } from '../../shared/models/token';

@Injectable()
export class AuthenticationService {

    public redirectUrl: string;

    constructor(private http: Http,
        private currentUserService: CurrentUserService,
        private router: Router,
        private configuration: Configuration) {

    }

    loginUser(username: string, password: string): Observable<Token> {
        let clientId = 'client_id=' + this.configuration.authConfig.CLIENT_ID;
        let grantType = 'grant_type=' + this.configuration.authConfig.GRANT_TYPE;
        let usernameForBody = 'username=' + username;
        let passwordForBody = 'password=' + password;
        let scope = 'scope=' + this.configuration.authConfig.SCOPE;

        let body = clientId.concat('&', grantType, '&', usernameForBody, '&', passwordForBody, '&', scope);

        let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer: Observer<Response>) => {
            this.http.post(this.configuration.server + 'connect/token', body, options)
                .map((response: any) => <Token>response.json())
                .subscribe((tokenData: any) => {
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
