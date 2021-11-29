import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-view-jobs.component.html',
  styleUrls: ['./employer-view-jobs.component.scss']
})
export class EmployerViewJobsComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Jobs";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
