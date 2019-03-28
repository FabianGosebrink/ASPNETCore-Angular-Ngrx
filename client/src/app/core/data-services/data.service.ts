import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import { BaseService } from '../../shared/base.service';
import { ICustomer,  IState } from '../../shared/interfaces';

@Injectable()
export class DataService extends BaseService {
      constructor(private http: HttpClient) {
        super();
    }
 
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(`${this.apiUrl}/customers`);
               
    }

    // getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<Customer[]>> {
    //     return this.http.get<IPagedResults<[]>>(`${this.apiUrl}/customers`}/page/${page}/${pageSize}`);
                    
    // }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get<ICustomer>(`${this.apiUrl}/customers` + '/' + id);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post<ICustomer>(`${this.apiUrl}/customers`, customer);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put<ICustomer>(`${this.apiUrl}/customers` + '/' + customer.id, customer);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/customers` + '/' + id);
                   
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(`${this.apiUrl}/states`);
    }

    // calculateCustomersOrderTotal(customers: ICustomer[]) {
    //     for (let customer of customers) {
    //         if (customer && customer.orders) {
    //             let total = 0;
    //             for (let order of customer.orders) {
    //                 total += (order.price * order.quantity);
    //             }
    //             customer.orderTotal = total;
    //         }
    //     }
    // }
    
    // private handleError(error: any) {
    //     console.error('server error:', error); 
    //     if (error instanceof Response) {
    //       let errMessage = '';
    //       try {
    //         errMessage = error.json().error;
    //       } catch(err) {
    //         errMessage = error.statusText;
    //       }
    //       return Observable.throw(errMessage);
    //       // Use the following instead if using lite-server
    //       //return Observable.throw(err.text() || 'backend server error');
    //     }
    //     return Observable.throw(error || 'ASP.NET Core server error');
    // }

}
