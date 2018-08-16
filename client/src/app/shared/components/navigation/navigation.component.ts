import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../../core/services/currentUser.service';
import { CoreStoreFacade } from '../../../core/store/core-store.facade';
import { Configuration } from '../../configuration/app.configuration';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
})
export class NavigationComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    public configuration: Configuration,
    public currentUserService: CurrentUserService,
    private facade: CoreStoreFacade
  ) {
    this.isAuthenticated$ = this.facade.isAuthenticated$;
  }

  logout($event: Event) {
    $event.preventDefault();
    this.facade.logout();
  }

  doNothing($event: Event) {
    $event.preventDefault();
  }
}
