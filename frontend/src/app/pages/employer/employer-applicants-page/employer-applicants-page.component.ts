import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-applicants-page.component.html',
  styleUrls: ['./employer-applicants-page.component.scss']
})
export class EmployerApplicantsPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Applicants";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
