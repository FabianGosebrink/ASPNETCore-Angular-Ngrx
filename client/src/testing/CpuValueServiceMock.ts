import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class CpuValueServiceMock {

    public onNewCpuValue = new EventEmitter<string>();

    private registerCpuEvent() {
        console.log();
    }
}
