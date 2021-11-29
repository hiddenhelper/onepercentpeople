import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@interfaces/job';
import { JobService } from '@services/job/job.service';
import { JobResponse } from '@interfaces/job_response';
import { JobResponseService } from '@services/job-response/job-response.service';

@Component({
  selector: 'app-talent-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {

  /**
   * The current Job id.
   * Must be passed into this component.
   */
  @Input() jobId: number;

  /**
   * The current Job object.
   */
  job: Job | null = null;

  /**
   *
   */
  job_response: JobResponse | null = null;
  // apply_url: string = "";

  /**
   * Keeps the state of whether the current Job has attempted to load.
   * It will be true whether or not a job was returned from the API.
   */
  loaded: boolean = false;

  /**
   * Keeps the state of whether the submit application request is running.
   */
  applying: boolean = false;


  constructor(
    private jobService: JobService,
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {
    // Job ID must be provided.
    if (!this.jobId) {
      return;
    }
    this.getJob();
    this.getJobResponse();
    // this.apply_url = `/jobs/${this.jobId}/apply`;
  }

  /**
   * Loads the current job.
   */
  getJob(): void {
    this.jobService.getOne(this.jobId).subscribe(
      data => {
        this.job = data.job;
        this.loaded = true;
      },
      (error) => {
        this.loaded = true;
      }
    );
  }

  /**
   * Loads the current user's job response.
   * If it returns an object, then the user has applied to this job.
   */
  getJobResponse(): void {
    this.jobResponseService.getOneForJob(this.jobId).subscribe(
      data => {
        this.job_response = data.job_response;
      },
      (error) => {
      }
    );
  }

  /**
   * Let's the user apply to the job.
   * It creates a new job response object.
   */
  submitApplication(): void {
    this.applying = true;
    const job_response: JobResponse = { job_id: this.job?.id };

    this.jobResponseService.create(job_response).subscribe(
      data => {
        this.job_response = data.job_response;
        this.applying = false;
      },
      (error) => {
        this.applying = false;
      }
    );
  }

}
