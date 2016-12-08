import { Component } from '@angular/core';
import { Configuration } from '../../shared/app.configuration';

@Component({
    moduleId: module.id,
    selector: 'navigation',
    templateUrl: './navigation.component.html'
})

export class NavigationComponent {

    constructor(public _configuration: Configuration) {

    }
}
