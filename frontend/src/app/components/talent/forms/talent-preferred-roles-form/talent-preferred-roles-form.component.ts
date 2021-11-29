import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@services/user/user.service';
import { WorkHistory } from '@app/interfaces/work_history';
import { Subject, Observable, Subscription } from 'rxjs';
import { TalentProfile } from '@app/interfaces/talent_profile';

@Component({
  selector: 'talent-preferred-roles-form',
  templateUrl: './talent-preferred-roles-form.component.html',
  styleUrls: ['./talent-preferred-roles-form.component.scss']
})
export class TalentPreferredRolesFormComponent implements OnInit {

  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  /**
   * Whether or not the save button should be shown.
   * Setting to false allows you to use another component to control the actions.
   */
  @Input() showButtons: boolean = true;

  /**
   * Event emitter for form events.
   */
  @Output() formEvent = new EventEmitter();

  /**
   *
   */
  @Input() talentProfile: TalentProfile | null;

  /**
   * A preferrered roles list.
   */
  @Input() preferred_roles: any[];

  /**
   * Form error message to show user.
   */
  errorMessage: string = "";

  /**
   * State of form request.
   */
  loading: boolean = false;

  /**
   *
   */
  public rolesForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.rolesForm = this.fb.group({
      roles: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => this.onSubmit());
  }

  onSubmit(): void {
    console.log('submit work history');

    this.errorMessage = "";

    if (!this.rolesForm.dirty || !this.rolesForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }

    this.loading = true;

    this.formEvent.emit({ name: 'finished', source: 'talent-preferred-roles-form' });


  }
}
