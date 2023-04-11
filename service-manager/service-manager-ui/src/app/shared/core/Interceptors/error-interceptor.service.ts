import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorPopoverService } from '../services/error-popover.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private errorPopoverService: ErrorPopoverService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            // erroare in scripts sau File
            console.log('Error Event');
          } else {
            switch (error.status) {
              case 401:
                this.errorPopoverService.openSnackBar(
                  error.error.Message,
                  'Ok'
                );
                break;
              case 409:
                this.errorPopoverService.openSnackBar(
                  error.error.Message,
                  'Ok'
                );
                break;
              default:
                this.errorPopoverService.openSnackBar(
                  'Internal server error',
                  'Ok'
                );
            }
          }
        } else {
          console.log('An error ocured');
        }
        return throwError(() => new Error(error.error.Message));
      })
    );
  }
}
