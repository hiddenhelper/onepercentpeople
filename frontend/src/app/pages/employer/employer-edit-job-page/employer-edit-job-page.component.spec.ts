import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerEditJobPageComponent } from './employer-edit-job-page.component';

describe('EmployerEditJobPageComponent', () => {
  let component: EmployerEditJobPageComponent;
  let fixture: ComponentFixture<EmployerEditJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerEditJobPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEditJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
