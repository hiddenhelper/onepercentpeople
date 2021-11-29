import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.scss']
})
export class EmployerRegisterComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Sign Up | Start posting jobs";

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
