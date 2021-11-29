import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@services/seo/seo.service';

@Component({
  selector: 'app-employer-edit-job-page',
  templateUrl: './employer-edit-job-page.component.html',
  styleUrls: ['./employer-edit-job-page.component.scss']
})
export class EmployerEditJobPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Edit Job";

  /**
   *
   */
  jobId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
    this.getJobIdFromUrl();
  }

  getJobIdFromUrl() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.jobId = Number.parseInt(id);
  }

}
