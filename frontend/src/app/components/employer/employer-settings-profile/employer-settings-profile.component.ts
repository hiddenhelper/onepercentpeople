import { Component, OnInit } from '@angular/core';
import { Company } from '@app/interfaces/company';
import { CompanyService } from '@services/employer/company/company.service';

@Component({
  selector: 'employer-settings-profile',
  templateUrl: './employer-settings-profile.component.html',
  styleUrls: ['./employer-settings-profile.component.scss']
})
export class EmployerSettingsProfileComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getAll({}).subscribe((data) => {
      if (data.companies && data.companies.length > 0)
        this.companies = data.companies;
      console.log('companies laoded', this.companies);
    });
  }

}
