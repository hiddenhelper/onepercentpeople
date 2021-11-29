import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@interfaces/job';
import { EmployerJobService } from '@services/employer/job/job.service';

@Component({
  selector: 'app-employer-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobId: number;

  job: Job | null = null;
  applicants_url: string = "";
  loaded: boolean = false;
  edit_url: string = "";

  posting: boolean = false;
  pausing: boolean = false;
  deleting: boolean = false;
  resuming: boolean = false;

  constructor(
    private employerJobService: EmployerJobService
  ) { }

  ngOnInit(): void {
    this.getJob();
  }

  getJob(): void {
    // Job ID must be provided.
    if (!this.jobId) {
      return;
    }

    this.applicants_url = `/employer/jobs/${this.jobId}/applicants`;
    this.edit_url = `/employer/jobs/${this.jobId}/edit`;

    this.employerJobService.getOne(this.jobId).subscribe(
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
   * Gets the job's current status and returns it as an object.
   *
   * @returns {text:string, color:string}
   */
  getJobStatus(): any {
    let status = { text: "", color: "" };

    if (!this.job) return status;

    if (this.job.deleted_at !== null) {
      status.text = "Deleted";
      status.color = "text-error-500";
    } else if (this.job.posted_at === null) {
      status.text = "Draft";
      status.color = "text-error-500";
    } else if (this.job.paused_at !== null && this.job.posted_at !== null) {
      status.text = "Paused";
      status.color = "text-blue-500";
    } else {
      status.text = "Open";
      status.color = "text-success-500";
    }

    return status;
  }

  /**
   * Sends request to post the job listing. Changing it from draft to posted.
   */
  postJob(): void {
    if (this.job) {
      this.posting = true;

      this.employerJobService.postJob(this.job).subscribe(
        (data) => {
          this.job = data.job;
          this.posting = false;
        },
        (error) => {
          this.posting = false;
        });
    }
  }

  /**
   * Sends request to pause the job listing.
   */
  pauseListing(): void {
    if (this.job) {
      this.pausing = true;

      this.employerJobService.pause(this.job).subscribe(
        (data) => {
          this.job = data.job;
          this.pausing = false;
        },
        (error) => {
          this.pausing = false;
        });
    }
  }

  /**
   * Sends request to resume the job listing, if it had been paused.
   */
  resumeListing(): void {
    if (this.job) {
      this.resuming = true;

      this.employerJobService.resume(this.job).subscribe(
        (data) => {
          this.job = data.job;
          this.resuming = false;
        },
        (error) => {
          this.resuming = false;
        });
    }
  }

  /**
   * Sends request to delete the job listing.
   */
  deleteListing(): void {
    if (this.job) {
      this.deleting = true;

      this.employerJobService.destroy(this.jobId).subscribe(
        data => {
          this.job = data.job;
          this.deleting = false;
        },
        (error) => {
          this.deleting = false;
        }
      );
    }
  }

}
