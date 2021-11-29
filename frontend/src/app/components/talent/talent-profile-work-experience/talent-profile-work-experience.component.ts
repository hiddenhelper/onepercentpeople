import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { WorkHistoryService } from '@services/work-history/work-history.service';
import { WorkHistory } from '@app/interfaces/work_history';


@Component({
  selector: 'talent-profile-work-experience',
  templateUrl: './talent-profile-work-experience.component.html',
  styleUrls: ['./talent-profile-work-experience.component.scss']
})
export class TalentProfileWorkExperienceComponent implements OnInit {

  /**
   * The users list of WorkHistory objects.
   */
  work_histories: WorkHistory[] = [];

  constructor(
    public router: Router,
    private workHistoryService: WorkHistoryService,
  ) { }

  ngOnInit(): void {
    this.loadWorkHistory();
  }

  loadWorkHistory(): void {
    this.workHistoryService.getAll({}).subscribe(data => {
      this.work_histories = data.work_history;
    });
  }
}
