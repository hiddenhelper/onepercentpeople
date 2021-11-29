import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AddAPIHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let headers = {
      Accept: 'application/json',
    };

    // OPP-CONTAINS-FILE is being used here to allow the request to be sent as form data
    // because it includes a file and must be sent as multipart/form-data.
    if (!req.headers.has('Content-Type') && !req.headers.has('OPP-CONTAINS-FILE')) {
      headers['Content-Type'] = 'application/json';
    }


    const clonedRequest = req.clone({
      setHeaders: headers,
      withCredentials: true
    });

    return next.handle(clonedRequest);
  }
}
