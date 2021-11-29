import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileWorkExperienceComponent } from './talent-profile-work-experience.component';

describe('TalentProfileWorkExperienceComponent', () => {
  let component: TalentProfileWorkExperienceComponent;
  let fixture: ComponentFixture<TalentProfileWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileWorkExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
