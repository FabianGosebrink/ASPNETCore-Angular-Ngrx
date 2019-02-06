import { Component, NgZone } from '@angular/core';
import { CpuValueService } from '@app/core/services/desktop-cpuValue.service';
import { PlatformInformationProvider } from '@app/core/services/platform-information.provider';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-emeal-footer',
  templateUrl: 'eMeal-footer.component.html',
})
export class EMealFooterComponent {
  percentage: string;

  get currentEnvironment() {
    return environment;
  }

  get platformName() {
    return this.platformInformationProvider.platformName;
  }

  get userAgent() {
    return this.platformInformationProvider.userAgent;
  }

  constructor(
    private platformInformationProvider: PlatformInformationProvider,
    private cpuValueService: CpuValueService,
    private ngZone: NgZone
  ) {
    this.cpuValueService.onNewCpuValue.subscribe((cpuValue: string) => {
      this.ngZone.run(() => {
        this.percentage = cpuValue;
      });
    });
  }
}
