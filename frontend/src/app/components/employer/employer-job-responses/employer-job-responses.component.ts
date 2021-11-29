import { Component, OnInit, Input } from '@angular/core';
import { JobResponse } from '@app/interfaces/job_response';
import { JobResponseService } from '@services/employer/job-response/job-response.service';

@Component({
  selector: 'employer-job-responses',
  templateUrl: './employer-job-responses.component.html',
  styleUrls: ['./employer-job-responses.component.scss']
})
export class EmployerJobResponsesComponent implements OnInit {

  /**
   *
   */
  @Input() jobId: number;

  /**
   *
   */
  responses: JobResponse[] = [];

  constructor(
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {
    this.loadJobResponses();
  }

  /**
   *
   * @returns void
   */
  loadJobResponses(): void {
    // this.responses = [{}, {}, {}, {}, {}, {}, {}, {}];

    if (!this.jobId) return;

    this.jobResponseService.getAllForJob(this.jobId, {}).subscribe(data => {
      this.responses = data.job_responses;
    });

  }
}
