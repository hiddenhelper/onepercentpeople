import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingsComponent } from './employer-settings.component';

describe('EmployerSettingsComponent', () => {
  let component: EmployerSettingsComponent;
  let fixture: ComponentFixture<EmployerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
