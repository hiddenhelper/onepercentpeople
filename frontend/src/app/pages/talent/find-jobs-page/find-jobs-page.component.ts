import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './find-jobs-page.component.html',
  styleUrls: ['./find-jobs-page.component.scss']
})
export class FindJobsPageComponent implements OnInit {

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
