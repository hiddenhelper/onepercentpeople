import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSettingsBankingComponent } from './talent-settings-banking.component';

describe('TalentSettingsBankingComponent', () => {
  let component: TalentSettingsBankingComponent;
  let fixture: ComponentFixture<TalentSettingsBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSettingsBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSettingsBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
