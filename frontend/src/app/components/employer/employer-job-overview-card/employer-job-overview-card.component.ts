import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@app/interfaces/job';
import { EmployerJobService } from '@services/employer/job/job.service';

@Component({
  selector: 'employer-job-overview-card',
  templateUrl: './employer-job-overview-card.component.html',
  styleUrls: ['./employer-job-overview-card.component.scss']
})
export class EmployerJobOverviewCardComponent implements OnInit {

  /**
   * The id of the job to load.
   */
  @Input() jobId: number;

  /**
   * The employers job object.
   */
  job: Job;

  /**
   * Url to view the job details.
   */
  view_job_url: string = "";

  /**
   * Whether the job has been loaded or not.
   */
  loaded: boolean = false;

  constructor(
    private employerJobService: EmployerJobService
  ) { }

  ngOnInit(): void {
    this.loadJob();
  }

  /**
   * Load the job resource.
   */
  loadJob(): void {
    this.employerJobService.getOne(this.jobId).subscribe(
      data => {
        this.job = data.job;
        this.loaded = true;
        this.view_job_url = `/employer/jobs/${this.job.id}`;
      },
      (error) => {
        this.loaded = true;
      }
    );
  }

}
