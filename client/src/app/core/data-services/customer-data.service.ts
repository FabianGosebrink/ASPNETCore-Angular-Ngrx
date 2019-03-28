import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICustomer,  IState } from '../../shared/interfaces';
import { HttpWrapperService } from './httpWrapper.service';

@Injectable({ providedIn: 'root' })
export class CustomerDataService {
  private actionUrl: string;

  constructor(private http: HttpWrapperService) {
    this.actionUrl = environment.apiUrl + '/customers/';
  }

  getCustomers() : Observable<ICustomer[]> {
    return this.http
    .get<ICustomer[]>(this.actionUrl)
    .pipe(catchError(this.handleError));
  }

  getCustomer(id: string): Observable<ICustomer> {
    return this.http
      .get<ICustomer>(this.actionUrl + id)
      .pipe(catchError(this.handleError));
  }

  insertCustomer(customer: ICustomer) : Observable<ICustomer> {
    return this.http
    .post<ICustomer>(this.actionUrl, customer)
    .pipe(catchError(this.handleError));
  }

  updateCustomer(id: string, customer: ICustomer): Observable<ICustomer> {
      return this.http
      .put<ICustomer>(this.actionUrl + id, JSON.stringify(customer))
      .pipe(catchError(this.handleError));
  }

  deleteCustomer(id: string) {
    return this.http
      .delete(this.actionUrl + id)
      .pipe(catchError(this.handleError));
  }
 
  // getStates(): Observable<State[]> {
  //   return this.http
  //   .get<State[]>(environment.apiUrl+'/states')
  //   .pipe(catchError(this.handleError));
  // }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(environment.apiUrl+'/states')
  }
  private handleError(error: any): Observable<never> {
    return throwError(error || 'Server error');
  }
}
