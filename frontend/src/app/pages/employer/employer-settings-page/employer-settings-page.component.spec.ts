import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingsPageComponent } from './employer-settings-page.component';

describe('EmployerSettingsPageComponent', () => {
  let component: EmployerSettingsPageComponent;
  let fixture: ComponentFixture<EmployerSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
