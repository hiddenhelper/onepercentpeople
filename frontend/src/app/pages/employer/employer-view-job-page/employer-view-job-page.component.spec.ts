import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerViewJobPageComponent } from './employer-view-job-page.component';

describe('EmployerViewJobPageComponent', () => {
  let component: EmployerViewJobPageComponent;
  let fixture: ComponentFixture<EmployerViewJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerViewJobPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerViewJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
