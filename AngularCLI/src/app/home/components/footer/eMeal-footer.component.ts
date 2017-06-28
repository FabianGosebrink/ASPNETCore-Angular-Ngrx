import { Component, NgZone, OnInit } from '@angular/core';

import { CpuValueService } from '../../../core/services/cpuValue.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';

@Component({
    selector: 'eMeal-footer',
    templateUrl: 'eMeal-footer.component.html'
})

export class EMealFooterComponent implements OnInit {

    percentage: number;

    constructor(
        private cpuValueService: CpuValueService,
        public platformInformationProvider: PlatformInformationProvider,
        private ngZone: NgZone) {

        cpuValueService.onNewCpuValue.subscribe((cpuValue: number) => {
            ngZone.run(() => {
                this.percentage = cpuValue;
            });
        });
    }

    ngOnInit() { }
}
