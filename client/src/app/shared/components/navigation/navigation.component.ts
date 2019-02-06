import { Component } from '@angular/core';
import { CurrentUserService } from '@app/core/services/currentUser.service';
import { CoreStoreFacade } from '@app/core/store/core-store.facade';
import { Configuration } from '@app/shared/configuration/app.configuration';
import { Observable } from 'rxjs';

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
