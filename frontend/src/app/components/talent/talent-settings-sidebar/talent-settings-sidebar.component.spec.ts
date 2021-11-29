import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSettingsSidebarComponent } from './talent-settings-sidebar.component';

describe('TalentSettingsSidebarComponent', () => {
  let component: TalentSettingsSidebarComponent;
  let fixture: ComponentFixture<TalentSettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSettingsSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
