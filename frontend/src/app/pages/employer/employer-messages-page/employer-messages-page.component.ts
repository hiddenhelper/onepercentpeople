import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './employer-messages-page.component.html',
  styleUrls: ['./employer-messages-page.component.scss']
})
export class EmployerMessagesPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Chat";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
