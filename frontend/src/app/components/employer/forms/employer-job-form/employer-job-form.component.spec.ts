import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobFormComponent } from './employer-job-form.component';

describe('EmployerJobFormComponent', () => {
  let component: EmployerJobFormComponent;
  let fixture: ComponentFixture<EmployerJobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployerJobFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
