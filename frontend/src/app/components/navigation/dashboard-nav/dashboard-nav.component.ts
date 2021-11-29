import { Component, OnInit } from '@angular/core';
import configs from '@app/configs';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  nav: any[] = [];
  sideNavigationItems: any[] = [];
  user: User | null = null;

  initials: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.setNavigationMenuItems();
    this.initials = this.getInitials();
  }

  getInitials(): string {
    let initials = "";

    if (this.user?.first_name)
      initials = this.user?.first_name[0];

    if (this.user?.last_name)
      initials += this.user?.last_name[0];

    return initials;
  }

  setNavigationMenuItems() {
    if (this.authService.isTalent()) {
      this.nav = configs.navigation.dashboard.talent.nav;
      this.sideNavigationItems = configs.navigation.dashboard.talent.sidenav;
    } else if (this.authService.isEmployer()) {
      this.nav = configs.navigation.dashboard.employer.nav;
      this.sideNavigationItems = configs.navigation.dashboard.employer.sidenav;
    }
  }

}
