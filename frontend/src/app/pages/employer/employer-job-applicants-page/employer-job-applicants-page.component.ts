import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-job-applicants-page.component.html',
  styleUrls: ['./employer-job-applicants-page.component.scss']
})
export class EmployerJobApplicantsPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Applicants";

  /**
   *
   */
  jobId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.getJobIdFromUrl();
    this.seoService.setTitle(this.title);
  }

  getJobIdFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.jobId = Number.parseInt(id);
  }

}
