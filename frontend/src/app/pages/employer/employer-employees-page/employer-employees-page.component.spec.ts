import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerEmployeesPageComponent } from './employer-employees-page.component';

describe('EmployerEmployeesPageComponent', () => {
  let component: EmployerEmployeesPageComponent;
  let fixture: ComponentFixture<EmployerEmployeesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerEmployeesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
