import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingsProfileComponent } from './employer-settings-profile.component';

describe('EmployerSettingsProfileComponent', () => {
  let component: EmployerSettingsProfileComponent;
  let fixture: ComponentFixture<EmployerSettingsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSettingsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSettingsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
