import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerRegisterFormComponent } from './employer-register-form.component';

describe('EmployerRegisterFormComponent', () => {
  let component: EmployerRegisterFormComponent;
  let fixture: ComponentFixture<EmployerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
