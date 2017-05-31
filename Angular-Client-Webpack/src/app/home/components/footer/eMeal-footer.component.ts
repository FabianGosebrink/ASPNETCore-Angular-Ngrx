import { CpuValueService } from '../../../core/services/cpuValue.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'eMeal-footer',
    templateUrl: 'eMeal-footer.component.html'
})

export class EMealFooterComponent implements OnInit {
    constructor(
        private cpuValueService: CpuValueService,
        platformInformationProvider: PlatformInformationProvider) { }

    ngOnInit() { }
}
