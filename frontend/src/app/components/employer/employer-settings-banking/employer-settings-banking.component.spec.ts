import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingsBankingComponent } from './employer-settings-banking.component';

describe('EmployerSettingsBankingComponent', () => {
  let component: EmployerSettingsBankingComponent;
  let fixture: ComponentFixture<EmployerSettingsBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSettingsBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSettingsBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
