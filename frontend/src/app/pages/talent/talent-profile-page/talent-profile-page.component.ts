import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-profile-page.component.html',
  styleUrls: ['./talent-profile-page.component.scss']
})
export class TalentProfilePageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Profile";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
