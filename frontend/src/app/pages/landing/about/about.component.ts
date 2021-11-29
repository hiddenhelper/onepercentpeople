import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "About";

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
