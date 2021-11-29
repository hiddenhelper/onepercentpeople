import { Component, OnInit, Input } from '@angular/core';
import { JobResponse } from '@app/interfaces/job_response';
import { JobResponseService } from '@services/employer/job-response/job-response.service';

@Component({
  selector: 'employer-job-response-list-item',
  templateUrl: './employer-job-response-list-item.component.html',
  styleUrls: ['./employer-job-response-list-item.component.scss']
})
export class EmployerJobResponseListItemComponent implements OnInit {

  /**
   *
   */
  @Input() job_response: JobResponse;

  /**
   * Link to view the applicant.
   */
  view_applicant_link: string = "";

  /**
   * A helper that holds the text title of the user's english proficiency.
   */
  english_proficiency: string = "";

  /**
   * A helper that holds the text title of the user's employment type preference.
   */
  employment_type_preference: string = "";

  constructor(
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {
    this.view_applicant_link = `/employer/jobs/${this.job_response.job_id}/applicants/${this.job_response.id}`;

    if (this.job_response?.user?.talent_profiles && this.job_response?.user?.talent_profiles.length > 0) {
      const talent_profile = this.job_response?.user?.talent_profiles[0];
      this.english_proficiency = talent_profile?.english_proficiency?.title ?? '';
      this.employment_type_preference = talent_profile?.employment_type_preference?.title ?? '';
    }
  }

  /**
   *
   */
  markInterested(): void {
    this.jobResponseService.markInterested(this.job_response.job_id ?? 0, this.job_response.id ?? 0).subscribe(data => {
      this.job_response = data.job_response;
    });
  }

  /**
   *
   */
  markRejected(): void {
    this.jobResponseService.markRejected(this.job_response.job_id ?? 0, this.job_response.id ?? 0).subscribe(data => {
      this.job_response = data.job_response;
    });
  }

}
