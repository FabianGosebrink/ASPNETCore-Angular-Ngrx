import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Customer,  State } from '../../shared/interfaces';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable({ providedIn: 'root' })
export class CustomerDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.apiUrl + '/customers/';
  }

  getCustomers() : Observable<Customer[]> {
    return this.http
    .get<Customer[]>(this.actionUrl)
    .pipe(catchError(this.handleError));
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http
      .get<Customer>(this.actionUrl + id)
      .pipe(catchError(this.handleError));
  }

  getStates(): Observable<State[]> {
    return this.http
    .get<State[]>(environment.apiUrl+'/state')
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(error || 'Server error');
  }
}
