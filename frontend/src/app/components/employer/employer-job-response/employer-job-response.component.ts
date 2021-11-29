import { Component, OnInit, Input } from '@angular/core';
import { Education } from '@app/interfaces/education';
import { JobResponse } from '@app/interfaces/job_response';
import { Resume } from '@app/interfaces/resume';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { Video } from '@app/interfaces/video';
import { WorkHistory } from '@app/interfaces/work_history';
import { JobResponseService } from '@services/employer/job-response/job-response.service';

@Component({
  selector: 'employer-job-response',
  templateUrl: './employer-job-response.component.html',
  styleUrls: ['./employer-job-response.component.scss']
})
export class EmployerJobResponseComponent implements OnInit {

  /**
   *
   */
  @Input() jobResponseId: number;

  /**
   *
   *
   */
  jobResponse: JobResponse;

  talent_profile: TalentProfile | null;

  videos: Video[] = [];

  educations: Education[] = [];

  work_histories: WorkHistory[] = [];

  resumes: Resume[] = [];

  english_proficiency: string = "";

  employment_type_preference: string = "";

  constructor(
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {
    this.loadJobResponse();
  }

  loadJobResponse(): void {
    if (!this.jobResponseId) return;

    this.jobResponseService.getOne(this.jobResponseId).subscribe(data => {
      this.jobResponse = data.job_response;
      const profiles = this.jobResponse?.user?.talent_profiles;
      if (profiles) {
        this.talent_profile = profiles[0];
      }
      if (this.jobResponse?.user?.videos)
        this.videos = this.jobResponse.user.videos;

      if (this.jobResponse?.user?.education)
        this.educations = this.jobResponse.user.education;

      if (this.jobResponse?.user?.work_history)
        this.work_histories = this.jobResponse.user.work_history;

      if (this.jobResponse?.user?.resumes)
        this.resumes = this.jobResponse.user.resumes;

      if (this.talent_profile) {
        this.english_proficiency = this.talent_profile?.english_proficiency?.title ?? '';
        this.employment_type_preference = this.talent_profile?.employment_type_preference?.title ?? '';
      }
    });

  }

}
