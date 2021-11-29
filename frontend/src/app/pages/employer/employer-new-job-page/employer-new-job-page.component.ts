import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-new-job-page.component.html',
  styleUrls: ['./employer-new-job-page.component.scss']
})
export class EmployerNewJobPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "New Job";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }
}
