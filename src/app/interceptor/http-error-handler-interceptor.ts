import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorDialogService } from '../service/error-dialog.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(@Inject(ErrorDialogService) private errorDialogService: ErrorDialogService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(
        catchError(error => {
          if ((error as HttpErrorResponse).status !== 0) {
            this.errorDialogService.showErrorDialog(error);
          } else {
            console.log('You are offline');
          }
          return throwError(error);
        })
      );
  }

}
