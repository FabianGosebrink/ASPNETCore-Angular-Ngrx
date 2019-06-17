import { Component } from '@angular/core';
import { CurrentUserService } from '@app/core/services/currentUser.service';
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
    public currentUserService: CurrentUserService
  ) {}

  doNothing($event: Event) {
    $event.preventDefault();
  }
}
