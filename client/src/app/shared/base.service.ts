import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class BaseService {
  apiUrl = environment.apiUrl;

  constructor() { }

}
