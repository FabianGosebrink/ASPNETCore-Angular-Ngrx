import { AuthenticationService } from '../../core/services/authentication.service';
import { Token } from '../../shared/models/token';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    username: string;
    password: string;
    errorMessage: string;

    constructor(private authService: AuthenticationService, private router: Router) { }

    public doLoginUser() {
        this.authService
            .loginUser(this.username, this.password)
            .subscribe(
            (response: Token) => {
                this.router.navigate([this.authService.redirectUrl || '/home'])
            },
            (error) => {
                console.log(error);
                this.errorMessage = JSON.parse(error._body).error_description;
                this.password = '';
            });
    }

    redirectTo(target: string, $event: any) {
        $event.preventDefault();
        this.router.navigate([target]);
    }
}
