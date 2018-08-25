import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sorter {
  private direction: number;
  private key: string;

  constructor() {
    this.direction = -1;
  }

  sort(key: string, data: any[]) {
    if (this.key === key) {
      this.direction = this.direction * -1;
    } else {
      this.direction = 1;
    }

    this.key = key;

    data.sort((a: any, b: any) => {
      if (a[key] === b[key]) {
        return 0;
      } else if (a[key] > b[key]) {
        return 1 * this.direction;
      } else {
        return -1 * this.direction;
      }
    });
  }
}
