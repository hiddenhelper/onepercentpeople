import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Hire Full-Time Global Talent";

  /**
   * Meta description for the page.
   */
  description: string = "OnePercentPeople sources the best employees in Latin America that will help grow your company.";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
    this.seoService.setDescription(this.description)
  }

}
