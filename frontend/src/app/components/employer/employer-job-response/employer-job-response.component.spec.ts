import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobResponseComponent } from './employer-job-response.component';

describe('EmployerJobResponseComponent', () => {
  let component: EmployerJobResponseComponent;
  let fixture: ComponentFixture<EmployerJobResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
