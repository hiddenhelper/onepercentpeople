import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-view-job-page.component.html',
  styleUrls: ['./employer-view-job-page.component.scss']
})
export class EmployerViewJobPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Job";

  /**
   * The current job id. Grabbed from the url.
   */
  jobId: number;

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
