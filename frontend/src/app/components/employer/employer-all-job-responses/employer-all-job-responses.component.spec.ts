import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAllJobResponsesComponent } from './employer-all-job-responses.component';

describe('EmployerAllJobResponsesComponent', () => {
  let component: EmployerAllJobResponsesComponent;
  let fixture: ComponentFixture<EmployerAllJobResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAllJobResponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerAllJobResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
