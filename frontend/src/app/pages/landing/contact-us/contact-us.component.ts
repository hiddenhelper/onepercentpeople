import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {


  /**
   * Meta title for the page.
   */
  title: string = "Contact Us";

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
