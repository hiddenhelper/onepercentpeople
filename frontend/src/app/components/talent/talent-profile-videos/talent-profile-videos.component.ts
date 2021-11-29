import { Component, OnInit } from '@angular/core';
import { Video } from '@app/interfaces/video';
import { VideoService } from '@services/video/video.service';

@Component({
  selector: 'talent-profile-videos',
  templateUrl: './talent-profile-videos.component.html',
  styleUrls: ['./talent-profile-videos.component.scss']
})
export class TalentProfileVideosComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getAll({}).subscribe(data => {
      this.videos = data.videos;
    });
  }

  deleteVideo(video): void {
    var confirmation = confirm("Delete the video?");

    if (confirmation) {
      this.videoService.destroy(video.id).subscribe(
        (data) => {
          this.loadVideos();
        });
    }
  }
}
