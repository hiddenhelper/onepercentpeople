import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout-onboarding',
  templateUrl: './layout-onboarding.component.html',
  styleUrls: ['./layout-onboarding.component.scss']
})
export class LayoutOnboardingComponent implements OnInit {

  @Input() sideAreaPosition: string = 'left';
  @Input() isForTalentUser: boolean = true;

  public quote: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.isForTalentUser)
      this.quote = "I found my dream job and company using OnePercentPeople. If anyone else is looking for work then I would recommend OnePercentPeople.";
    else
      this.quote = "The in-person interview process is not available for use right now due to the COVID-19 crisis. This tool has helped us be more efficient during this time and get our jobs filled. Thank you!";
  }

}
