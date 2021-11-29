import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNewJobPageComponent } from './employer-new-job-page.component';

describe('EmployerNewJobPageComponent', () => {
  let component: EmployerNewJobPageComponent;
  let fixture: ComponentFixture<EmployerNewJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployerNewJobPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerNewJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
