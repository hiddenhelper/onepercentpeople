import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Terms";

  /**
   * Meta description for the page.
   */
  description: string = "";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
    this.seoService.setDescription(this.description)
  }

}
