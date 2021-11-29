import { Component, OnInit } from '@angular/core';
import configs from '@app/configs';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  public pricing = configs.pricing;

  /**
  * Meta title for the page.
  */
  title: string = "Pricing";

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
