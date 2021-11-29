import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-settings-page.component.html',
  styleUrls: ['./talent-settings-page.component.scss']
})
export class TalentSettingsPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Settings";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }
}
