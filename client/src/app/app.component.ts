import { Component } from '@angular/core';
import { Configuration } from './shared/configuration/app.configuration';

@Component({
  selector: 'app-foodchooser',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title: string;

  constructor(public configuration: Configuration) {
    this.title = configuration.title;
  }
}
