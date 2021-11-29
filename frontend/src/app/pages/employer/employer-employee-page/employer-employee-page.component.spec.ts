import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerEmployeePageComponent } from './employer-employee-page.component';

describe('EmployerEmployeePageComponent', () => {
  let component: EmployerEmployeePageComponent;
  let fixture: ComponentFixture<EmployerEmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerEmployeePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
