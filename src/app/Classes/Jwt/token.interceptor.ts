import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../Services/session/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(SessionService.isLoggedIn()){
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${SessionService.getToken()}`
        }
        });
    }

    return next.handle(request);
  }
}