import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from '@app/interfaces/education';
import { EducationService } from '@services/education/education.service';

@Component({
  selector: 'talent-profile-education',
  templateUrl: './talent-profile-education.component.html',
  styleUrls: ['./talent-profile-education.component.scss']
})
export class TalentProfileEducationComponent implements OnInit {

  /**
   * A list of all of the user's education objects.
   */
  educations: Education[];

  constructor(
    public router: Router,
    private educationService: EducationService,
  ) {

  }

  ngOnInit(): void {
    this.loadEducationHistory();
  }

  /**
   * Load all of the user's education history objects.
   */
  loadEducationHistory(): void {
    this.educationService.getAll({}).subscribe(data => {
      this.educations = data.educations;
    });
  }

}
