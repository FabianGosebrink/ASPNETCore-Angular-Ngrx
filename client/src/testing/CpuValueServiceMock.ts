import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class CpuValueServiceMock {
  onNewCpuValue = new EventEmitter<string>();

  private registerCpuEvent() {
    console.log();
  }
}
