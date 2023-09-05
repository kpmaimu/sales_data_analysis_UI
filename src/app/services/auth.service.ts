import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Global } from "../shared/global";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  auth(param: any): Observable<any> {
    try {
      //console.log(param); 
     
      return this.http.post(Global.API_BASE_URI + "/o/token/", param, {
        headers: this.getHeaders()
      }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      console.error(error);
    }
  }
  getUserByUsername(username: string):Observable<any>{
    try {
      //console.log(param); 
     
      return this.http.get(Global.API_BASE_URI + "/users/loggedin/?username="+username, {
        headers: this.getHeaders1()
      }).pipe(
        catchError(this.handleError)
      );
    } catch (error) {
      console.error(error);
    }
  }

  getHeaders(iContentType?: string): HttpHeaders {
    return new HttpHeaders({
      'Content-type': "application/x-www-form-urlencoded"      
    }); 

  }
  getHeaders1(iContentType?: string): HttpHeaders {
    return new HttpHeaders({
      'Content-type': "application/json"      
    });
  }

  handleError(error: Error) {
    try {
      return throwError(error.message || "Something went wrong");
    } catch (error) {
      console.error(error);
    }
  }
}
