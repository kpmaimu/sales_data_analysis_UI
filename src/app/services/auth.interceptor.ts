import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor( private router: Router) {
    }
    
    /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('access_token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      });
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }


  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.router.navigate([``]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }

}