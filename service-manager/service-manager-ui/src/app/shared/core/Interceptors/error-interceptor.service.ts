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
  constructor(
    private errorPopoverService: ErrorPopoverService
  ) {}

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
                console.log(error.status);

                this.errorPopoverService.openSnackBar(error.statusText, 'OK');
                break;
              case 409:
                // console.log(error);
                this.ShowErrorPopover(error.error.Message);
                break;
              default:
                this.ShowErrorPopover('Internal server error');
                
            }
          }
        } else {
          console.log('An error ocured');
        }
        return throwError(() => new Error(error.error.Message));
      })
    );
  }

  private ShowErrorPopover(errorMessage: string): void {
    this.errorPopoverService.openSnackBar(errorMessage, 'Ok');
  }
}
