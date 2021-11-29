import { Component, OnInit } from '@angular/core';
import { JobResponse } from '@app/interfaces/job_response';
import { JobResponseService } from '@services/employer/job-response/job-response.service';


@Component({
  selector: 'employer-all-job-responses',
  templateUrl: './employer-all-job-responses.component.html',
  styleUrls: ['./employer-all-job-responses.component.scss']
})
export class EmployerAllJobResponsesComponent implements OnInit {

  /**
   * @param jobResponseService
   */
  job_responses: JobResponse[] = [];

  /**
   *
   * @param loading
   */
  loading: boolean = false;
  showSortingMenu: boolean = false;

  constructor(
    private jobResponseService: JobResponseService,
  ) { }

  ngOnInit(): void {
    this.loadJobResponses();
  }

  loadJobResponses(): void {
    this.jobResponseService.getAll({}).subscribe(data => {
      this.job_responses = data.job_responses;
    });
  }

}
