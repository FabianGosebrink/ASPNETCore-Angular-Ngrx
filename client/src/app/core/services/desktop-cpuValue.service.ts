import { EventEmitter, Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { PlatformInformationProvider } from './platform-information.provider';

@Injectable({
  providedIn: 'root',
})
export class CpuValueService {
  onNewCpuValue = new EventEmitter<string>();

  constructor(
    private electronService: ElectronService,
    private platformInformationProvider: PlatformInformationProvider
  ) {
    if (this.platformInformationProvider.isElectron) {
      this.registerCpuEvent();
    }
  }

  private registerCpuEvent() {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.on(
        'newCpuValue',
        (event: any, data: any) => {
          this.onNewCpuValue.emit(data);
        }
      );
    }
  }
}
