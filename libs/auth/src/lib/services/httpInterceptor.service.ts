import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('inside Interceptor');
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      req = req.clone({
        headers: req.headers.set('authorization', `Bearer ${jwtToken}`),
      });
      return next.handle(req);
    } else {
      // return EMPTY;
      return next.handle(req);
    }
  }
}
