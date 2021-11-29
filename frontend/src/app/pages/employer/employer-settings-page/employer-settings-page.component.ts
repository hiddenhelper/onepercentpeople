import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-settings-page.component.html',
  styleUrls: ['./employer-settings-page.component.scss']
})
export class EmployerSettingsPageComponent implements OnInit {

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
