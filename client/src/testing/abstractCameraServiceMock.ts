import { Observable } from 'rxjs/Observable';

export class AbstractCameraServiceStub {
  getPhoto(): Observable<string> {
    return Observable.of('');
  }
}
