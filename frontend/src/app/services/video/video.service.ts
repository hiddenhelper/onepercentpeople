import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Video } from '@app/interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/videos', params).pipe(
      tap((response: any) => {

      })
    );
  }

  getOne(id: number): Observable<any> {
    return this.apiService.get<any>(`/user/videos/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }

  create(video: Video, file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('videoFile', file, file.name);
    formData.append('title', video.title ?? "Default");
    return this.apiService.postForm<any>('/user/videos', formData).pipe(
      tap((response: any) => {

      })
    );
  }

  update(video: Video): Observable<any> {
    return this.apiService.put<any>(`/user/videos/${video.id}`, { video: video }).pipe(
      tap((response: any) => {

      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.apiService.delete<any>(`/user/videos/${id}`).pipe(
      tap((response: any) => {

      })
    );
  }
}
