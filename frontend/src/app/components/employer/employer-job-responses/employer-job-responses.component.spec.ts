import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobResponsesComponent } from './employer-job-responses.component';

describe('EmployerJobResponsesComponent', () => {
  let component: EmployerJobResponsesComponent;
  let fixture: ComponentFixture<EmployerJobResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobResponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
