import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './talent-messages-page.component.html',
  styleUrls: ['./talent-messages-page.component.scss']
})
export class TalentMessagesPageComponent implements OnInit {

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
