import { PlatformInformationProvider } from './platformInformation.provider';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class CpuValueService {

    public onNewCpuValue = new EventEmitter<string>();

    constructor(
        private electronService: ElectronService,
        private ngZone: NgZone,
        private platformInformationProvider: PlatformInformationProvider) {

        if (platformInformationProvider.isElectron) {
            this.registerCpuEvent();
        }
    }

    private registerCpuEvent() {
        if (this.electronService.ipcRenderer) {
            this.electronService.ipcRenderer.on('newCpuValue', (event: any, data: any) => {
                // console.log(data);
                this.onNewCpuValue.emit(data);
            });
        }
    }
}
