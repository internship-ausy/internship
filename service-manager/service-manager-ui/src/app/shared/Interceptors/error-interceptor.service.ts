import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
  import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from './error-service';
  
  @Injectable()
  export class ErrorInterceptorService implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar, private errorService : ErrorService) {
        
    }
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      console.log('Request is comming !');
      return next.handle(req).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {   // erroare in scripts sau File
              console.log('Error Event');
            } else {
              switch (error.status) {
                case 401:
                  console.log(`${error.statusText + ' ' + error.status} si inca ceva`);
                  this.errorService.get401
                  break;  
              }
            }
  
          } else {
            console.log('An error ocured');
            
          }
          return throwError(() => new Error(error.statusText));
        })
      );
    }
  }