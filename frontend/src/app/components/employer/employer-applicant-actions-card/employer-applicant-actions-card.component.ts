import { Component, OnInit, Input } from '@angular/core';
import { JobResponse } from '@app/interfaces/job_response';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { JobResponseService } from '@services/employer/job-response/job-response.service';

@Component({
  selector: 'employer-applicant-actions-card',
  templateUrl: './employer-applicant-actions-card.component.html',
  styleUrls: ['./employer-applicant-actions-card.component.scss']
})
export class EmployerApplicantActionsCardComponent implements OnInit {

  /**
   *
   */
  @Input() jobResponseId: number;

  /**
   * The job response object being referenced.
   */
  jobResponse: JobResponse;

  /**
   * The anchor link for the "Send Message" button to send the user when it is clicked.
   */
  chat_anchor_link: string = "";

  constructor(
    private jobResponseService: JobResponseService,
  ) { }

  ngOnInit(): void {
    this.loadJobResponse();
    this.chat_anchor_link = `${window.location.pathname}#chat`;
  }

  /**
   * Loads the job response object.
   * @returns void
   */
  loadJobResponse(): void {
    if (!this.jobResponseId) return;

    this.jobResponseService.getOne(this.jobResponseId).subscribe(data => {
      this.jobResponse = data.job_response;
    });
  }

  /**
   * Marks the employer_review_status as 'interested'.
   */
  markInterested(): void {
    this.jobResponseService.markInterested(this.jobResponse.job_id ?? 0, this.jobResponseId).subscribe(data => {
      this.jobResponse = data.job_response;
    });
  }


  /**
   * Marks the employer_review_status as 'rejected'.
   */
  markRejected(): void {
    this.jobResponseService.markRejected(this.jobResponse.job_id ?? 0, this.jobResponseId).subscribe(data => {
      this.jobResponse = data.job_response;
    });
  }

  /**
   * Creates a new employment.
   */
  hire(): void {
    this.jobResponseService.hire(this.jobResponse.job_id ?? 0, this.jobResponseId).subscribe(data => {
      this.jobResponse = data.job_response;
    });
  }

}
