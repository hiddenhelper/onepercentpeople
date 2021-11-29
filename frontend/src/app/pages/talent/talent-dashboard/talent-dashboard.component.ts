import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-dashboard.component.html',
  styleUrls: ['./talent-dashboard.component.scss']
})
export class TalentDashboardComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Dashboard";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
