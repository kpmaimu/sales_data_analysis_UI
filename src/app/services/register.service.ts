import { Injectable } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { throwError,Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Global } from '../shared/global';
import { HttpHeaders } from '@angular/common/http';
// import {HttpClient
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
 register(param: any): Observable<any>{
   try{
     console.log(param);
     return this.http.post(Global.API_BASE_URI + "/users/register/",param,{
       headers: this.getHeaders()
     }).pipe(
       catchError(this.handleError)
     );
   }catch(error){
     console.error(error)
   };
   
 }
 getHeaders(iContentType?: string): HttpHeaders {
  return new HttpHeaders({
    'Content-type': "application/json"      
  });

}

 handleError(error:Error){
   try{
     return throwError(error.message || "something went wrong" );
   } catch(error){
     console.error(error);
   }
 }
}
