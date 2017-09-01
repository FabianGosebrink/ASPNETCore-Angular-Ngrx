import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { CurrentUserService } from '../../../core/services/currentUser.service';
import { Configuration } from './../../configuration/app.configuration';
import * as SharedActions from '../../store/actions/shared.actions';

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {

    constructor(
        public configuration: Configuration,
        public currentUserService: CurrentUserService,
        private store: Store<any>) { }

    logout($event: Event) {
        $event.preventDefault();
        this.store.dispatch(new SharedActions.LogoutAction());
    }

    doNothing($event: Event) {
        $event.preventDefault();
    }
}
