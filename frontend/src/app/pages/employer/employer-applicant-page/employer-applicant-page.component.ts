import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-applicant-page.component.html',
  styleUrls: ['./employer-applicant-page.component.scss']
})
export class EmployerApplicantPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Applicant";

  /**
   *
   */
  jobResponseId: number;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.getJobResponseIdFromUrl();
    this.seoService.setTitle(this.title);
  }

  getJobResponseIdFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.jobResponseId = Number.parseInt(id);
  }


}
