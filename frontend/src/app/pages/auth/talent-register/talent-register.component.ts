import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-register.component.html',
  styleUrls: ['./talent-register.component.scss']
})
export class TalentRegisterComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Sign Up | Find full-time remote jobs";

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
