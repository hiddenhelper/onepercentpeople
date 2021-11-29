import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSettingsPageComponent } from './talent-settings-page.component';

describe('TalentSettingsPageComponent', () => {
  let component: TalentSettingsPageComponent;
  let fixture: ComponentFixture<TalentSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSettingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
