import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = environment.api_url;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  getBlob<T>(path: string): Observable<T> {
    return this.handleResponse(this.httpClient.get(this.endpoint + path, { responseType: 'blob' }));
  }

  get<T>(path: string, params?: any): Observable<T> {
    return this.handleResponse(this.httpClient.get<T>(this.endpoint + path, { params }));
  }

  post<T>(path: string, data: T): Observable<T> {
    return this.handleResponse(this.httpClient.post<T>(this.endpoint + path, data));
  }

  postForm<T>(path: any, data: T): Observable<T> {
    // This is a special header to tell the interceptor not to set the content type for this request.
    const headers = {
      headers: new HttpHeaders({
        'OPP-CONTAINS-FILE': 'true',
      }),
    };

    return this.handleResponse(this.httpClient.post<T>(this.endpoint + path, data, headers));
  }

  put<T>(path: any, data: T): Observable<T> {
    return this.handleResponse(this.httpClient.put<T>(this.endpoint + path, data));
  }

  putForm<T>(path: any, data: T): Observable<T> {
    // This is a special header to tell the interceptor not to set the content type for this request.
    const headers = {
      headers: new HttpHeaders({
        'OPP-CONTAINS-FILE': 'true',
      }),
    };

    return this.handleResponse(this.httpClient.put<T>(this.endpoint + path, data, headers));
  }

  delete<T>(path: any, data = null): Observable<T> {
    return this.handleResponse(this.httpClient.request<T>('DELETE', this.endpoint + path, { body: data }));
  }

  saveFile(fileToUpload: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.postForm('/api/interview/upload', formData);
  }

  handleResponse(call: any) {
    return <any>call.pipe(
      tap(
        (data) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('api service:data', data)
          }
        },
        (data) => {
          if (data.error.action === 'logout') {
            this.toastr.error('', 'Please login again.');
            this.router.navigateByUrl('/logout');
          }
          if (data.error.code === 'auth/id-token-expired') {
            this.toastr.error('', 'Token expired, please login again.');
            // localStorage.removeItem('onepercentpeople_token');
            this.router.navigateByUrl('/login');
          }
        },
      ),
      catchError(this.processError)
    );
  }

  processError(err) {
    // console.log('Caucht error');
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    // console.log(message);
    return throwError(err);
  }

}
