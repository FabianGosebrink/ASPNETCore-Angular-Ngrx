import { Component } from '@angular/core';
import { Configuration } from '../../shared/app.configuration';

@Component({
    selector: 'navigation',
    templateUrl: 'app/components/navigation/navigation.component.html'
})


export class NavigationComponent {

    constructor(public _configuration: Configuration) {

    }
}