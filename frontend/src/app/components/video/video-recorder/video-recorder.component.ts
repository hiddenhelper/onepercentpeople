import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';
import { VideoService } from '@services/video/video.service';
import { Video } from '@app/interfaces/video';

@Component({
  selector: 'video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showSubmitButton: boolean = true;


  @Output() formEvent = new EventEmitter();

  @Input() video_prompt: string = "None — freeform video";

  @Input() video: Video | null;

  /**
   * Error message to show to user.
   */
  public errorMessage: string = "";

  public prompts = ["None — freeform video", "Where did you work and what were your responsibilities?", "What are your career goals?", "What are you looking for in your next Company?"]

  // index to create unique ID for component
  public idx: string = `clip${Math.floor(Math.random() * 1000)}`;

  private config: any;
  private player: any;
  private plugin: any;

  /**
   * The state of the video player.
   */
  public videoState: string = "ready";

  /**
   * Keeps track of whether user has recorded a video that is available for playback and upload.
   */
  public hasRecording: boolean = false;

  /**
   * The state of whether the video is uploading or not.
   */
  public loading: boolean = false;


  // constructor initializes our declared vars
  constructor(
    private videoService: VideoService
  ) {
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 600,
      height: 400,
      bigPlayButton: false,
      controlBar: {
        volumePanel: false
      },
      plugins: {
        record: {
          audio: true,
          // video: true,
          debug: true,
          maxLength: 120,
          video: {
            // video media constraints: set resolution of camera
            width: { min: 640, ideal: 1280, max: 2560 },
            height: { min: 480, ideal: 920, max: 1840 }
          },
        }
      }
    };
  }

  ngOnInit() {
    if (this.events)
      this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  };

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    let el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el) as HTMLElement, this.config, () => {
      // console.log('player ready! id:', el);

      // print version information at startup
      var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      // videojs.log(msg);
    });

    this.player.on('ready', () => {
      this.player.record().getDevice();
    });

    // device is ready
    this.player.on('deviceReady', () => {
      // console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      this.videoState = "recording";
      this.hasRecording = false;
      this.errorMessage = "";
      this.video = null;
    });

    this.player.on('pauseRecord', () => {
      this.videoState = "paused";
    });
    this.player.on('play', () => {
      this.videoState = "playback-playing";
    });
    this.player.on('pause', () => {
      this.videoState = "playback-paused";
    });

    // this.player.on('progressRecord', (e) => {
    // console.log('progress record!');
    // console.log(e);
    // });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      this.videoState = "finished";
      this.hasRecording = true;
      // console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);

    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);

    });
  }
  startPlayback(): void {
    this.player.play();
  }

  pausePlayback(): void {
    this.player.pause();
    this.videoState = "playback-paused";
  }


  record(): void {
    this.player.record().start();
  }

  pause(): void {
    this.player.record().pause();
  }

  stop(): void {
    this.player.record().stop();
  }

  reset(): void {
    this.player.record().reset();
    this.hasRecording = false;
    this.video = null;
  }

  resume(): void {
    this.player.record().resume();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
    this.formEvent.emit({ name: 'set-loading', loading: loading, source: 'video-recorder' });
  }

  onSubmit(): void {
    if (this.video) {
      this.formEvent.emit({ name: 'finished', source: 'video-recorder' });
    }

    if (!this.hasRecording) {
      this.errorMessage = "Please record a video before proceeding."
      return;
    }

    if (this.videoState === 'recording')
      this.player.record().stop();
    // Send data to server
    this.uploadFile(this.player.recordedData);
  }

  uploadFile(recordedData) {
    this.setLoading(true);
    const video = { url: '', title: this.video_prompt };
    this.videoService.create(video, recordedData).subscribe(response => {
      this.video = response.video;
      this.formEvent.emit({ name: 'finished', video: this.video, source: 'video-recorder' });
      this.setLoading(false);
    }, error => {
      console.log(error);
      this.errorMessage = "There was an error uploading the video."
      this.setLoading(false);
    });
  }

  promptChangeHandler(event: any) {
    this.video_prompt = event.target.value;
  }

  /**
   * Detach event handlers and remove the player
   */
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
    if (this.eventsSubscription)
      this.eventsSubscription.unsubscribe();
  }

}
