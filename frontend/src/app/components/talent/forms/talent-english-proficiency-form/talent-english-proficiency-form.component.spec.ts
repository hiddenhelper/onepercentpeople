import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEnglishProficiencyFormComponent } from './talent-english-proficiency-form.component';

describe('TalentEnglishProficiencyFormComponent', () => {
  let component: TalentEnglishProficiencyFormComponent;
  let fixture: ComponentFixture<TalentEnglishProficiencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentEnglishProficiencyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEnglishProficiencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
