import { Component } from '@angular/core';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { CurrentUserService } from '../../../core/services/currentUser.service';
import { Configuration } from './../../configuration/app.configuration';

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {

    constructor(
        public configuration: Configuration,
        public currentUserService: CurrentUserService,
        private authenticationService: AuthenticationService) { }

    logout($event: Event) {
        $event.preventDefault();
        this.authenticationService.logoutUser();
    }

    doNothing($event: Event) {
        $event.preventDefault();
    }
}
