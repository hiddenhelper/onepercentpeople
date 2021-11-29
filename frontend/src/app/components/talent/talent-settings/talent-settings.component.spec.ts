import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSettingsComponent } from './talent-settings.component';

describe('TalentSettingsComponent', () => {
  let component: TalentSettingsComponent;
  let fixture: ComponentFixture<TalentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
