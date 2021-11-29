import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-onboarding-page.component.html',
  styleUrls: ['./employer-onboarding-page.component.scss']
})
export class EmployerOnboardingPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Get Started";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
