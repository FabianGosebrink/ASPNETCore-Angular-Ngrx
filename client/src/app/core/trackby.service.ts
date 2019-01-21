import { Injectable } from '@angular/core';

import { Customer } from '../shared/interfaces';

@Injectable()
export class TrackByService {
  
  customer(index: number, customer: Customer) {
    return customer.id;
  }
  
}