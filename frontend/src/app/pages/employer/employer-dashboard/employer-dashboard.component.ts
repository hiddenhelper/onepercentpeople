import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.scss']
})
export class EmployerDashboardComponent implements OnInit {

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
