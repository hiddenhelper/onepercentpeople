import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCreateJobStepperComponent } from './employer-create-job-stepper.component';

describe('EmployerCreateJobStepperComponent', () => {
  let component: EmployerCreateJobStepperComponent;
  let fixture: ComponentFixture<EmployerCreateJobStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerCreateJobStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerCreateJobStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
