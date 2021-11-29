import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-my-jobs-page.component.html',
  styleUrls: ['./talent-my-jobs-page.component.scss']
})
export class TalentMyJobsPageComponent implements OnInit {


  /**
   * Meta title for the page.
   */
  title: string = "My Jobs";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
