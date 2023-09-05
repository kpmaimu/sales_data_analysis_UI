import { HttpClient } from '@angular/common/http';
import { Global } from '../shared/global';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) {

    }


    categoryReport(filter: string): Observable<any> {
        try {
            // console.log(param);
            return this.http.get(Global.API_BASE_URI + "/reports/filter?filter=" + filter, {
                headers: this.getHeaders()
            }).pipe(
                catchError(this.handleError)
            );
        } catch (error) {
            console.error(error)
        };

    }
    reports(filter: string): Observable<any> {
        try {
            // console.log(param);
            return this.http.get(Global.API_BASE_URI + "/reports/", {
                headers: this.getHeaders()
            }).pipe(
                catchError(this.handleError)
            );
        } catch (error) {
            console.error(error)
        };
    }

    getHeaders(iContentType?: string): HttpHeaders {        
        return new HttpHeaders({
            'Authorization': "Bearer " + localStorage.getItem('access_token')
            // 'Content-type': "application/json"
        });

    }
    // getHeaders(iContentType?: string): HttpHeaders {
    //     console.log(localStorage.getItem('access_token'));
    //     return new HttpHeaders({
    //         'Authorization': "Bearer " + localStorage.getItem('access_token'),
    //         'Content-type': "application/json"
    //     });

    // }

    handleError(error: Error) {
        try {
            return throwError(error.message || "something went wrong");
        } catch (error) {
            console.error(error);
        }

    }
}