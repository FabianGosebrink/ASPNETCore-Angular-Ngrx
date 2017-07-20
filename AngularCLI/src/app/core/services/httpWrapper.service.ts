import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CurrentUserService } from '../services/currentUser.service';

@Injectable()
export class HttpWrapperService {
    constructor(private http: HttpClient, private currentUserService: CurrentUserService) { }

    get<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.get<T>(url, expandedHeaders);
    }

    post<T>(url: string, body: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.post<T>(url, body, expandedHeaders);
    }

    put<T>(url: string, body: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.put<T>(url, body, expandedHeaders);
    }

    delete<T>(url: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.delete<T>(url, expandedHeaders);
    }

    patch<T>(url: string, body: string, headers?: HttpHeaders | null): Observable<T> {
        const expandedHeaders = this.prepareHeader(headers);
        return this.http.patch<T>(url, body, expandedHeaders);
    }

    private prepareHeader(headers: HttpHeaders | null): object {
        const token: string = this.currentUserService.token;

        headers = headers || new HttpHeaders();

        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return {
            headers
        }
    }
}
