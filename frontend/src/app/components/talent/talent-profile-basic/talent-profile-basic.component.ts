import { Component, OnInit } from '@angular/core';
import { TalentProfile } from '@app/interfaces/talent_profile';
import { User } from '@app/interfaces/user';
import { UserService } from '@app/services/user/user.service';
import { TalentProfileService } from '@services/talent-profile/talent-profile.service';

@Component({
  selector: 'talent-profile-basic',
  templateUrl: './talent-profile-basic.component.html',
  styleUrls: ['./talent-profile-basic.component.scss']
})
export class TalentProfileBasicComponent implements OnInit {

  talent_profile: TalentProfile;

  user: User;


  constructor(
    private talentProfileService: TalentProfileService,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.get({}).subscribe(
      (response) => {
        if (response.user) {
          this.user = response.user;
        }
      },
      (error) => {

      }
    );
    // this.talentProfileService.getAll({}).subscribe(
    //   (response) => {
    //     if (response.talent_profiles && response.talent_profiles.length > 0) {
    //       this.talent_profile = response.talent_profiles[0];
    //     }
    //   },
    //   (error) => {

    //   }
    // );
  }
}
