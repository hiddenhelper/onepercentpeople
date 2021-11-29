import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingsSidebarComponent } from './employer-settings-sidebar.component';

describe('EmployerSettingsSidebarComponent', () => {
  let component: EmployerSettingsSidebarComponent;
  let fixture: ComponentFixture<EmployerSettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSettingsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
