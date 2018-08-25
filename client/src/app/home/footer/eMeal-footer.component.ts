import { Component, NgZone } from '@angular/core';
import { CpuValueService } from '../../core/services/desktop-cpuValue.service';
import { PlatformInformationProvider } from '../../core/services/platform-information.provider';

@Component({
  selector: 'app-emeal-footer',
  templateUrl: 'eMeal-footer.component.html',
})
export class EMealFooterComponent {
  percentage: number;

  constructor(
    private cpuValueService: CpuValueService,
    public platformInformationProvider: PlatformInformationProvider,
    private ngZone: NgZone
  ) {
    this.cpuValueService.onNewCpuValue.subscribe((cpuValue: number) => {
      this.ngZone.run(() => {
        this.percentage = cpuValue;
      });
    });
  }
}
