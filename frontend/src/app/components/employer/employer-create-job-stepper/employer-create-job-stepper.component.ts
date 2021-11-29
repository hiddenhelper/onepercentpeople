import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'employer-create-job-stepper',
  templateUrl: './employer-create-job-stepper.component.html',
  styleUrls: ['./employer-create-job-stepper.component.scss']
})
export class EmployerCreateJobStepperComponent implements OnInit {

  /**
   * If job id is set, user is editing the job.
   */
  @Input() jobId: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Step definitions to be used with the employer-job-form.
   */
  public steps = {
    1: { title: "Basics", heading: "Basic Details", completed: false },
    2: { title: "Role", heading: "What role would you like to hire?", completed: false },
    3: { title: "Time Commitment", heading: "What level of time commitment?", completed: false },
    4: { title: "Salary Range", heading: "What salary are you offering?", completed: false },
    5: { title: "Review", heading: "Review and Post", completed: false },
  };

  currentStep: number = 1;

  get stepsKeys() {
    return Object.keys(this.steps);
  }

  setCurrentStep(step) {
    this.currentStep = step;
  }

}
