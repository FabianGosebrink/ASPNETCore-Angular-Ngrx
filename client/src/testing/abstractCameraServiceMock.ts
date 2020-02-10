import { Observable, of } from 'rxjs';

export class AbstractCameraServiceStub {
  getPhoto(): Observable<string> {
    return of('');
  }
}
