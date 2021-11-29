import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-onboarding-page.component.html',
  styleUrls: ['./talent-onboarding-page.component.scss']
})
export class TalentOnboardingPageComponent implements OnInit {

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
