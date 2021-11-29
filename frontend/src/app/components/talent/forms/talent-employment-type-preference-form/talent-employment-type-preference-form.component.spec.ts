import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEmploymentTypePreferenceFormComponent } from './talent-employment-type-preference-form.component';

describe('TalentEmploymentTypePreferenceFormComponent', () => {
  let component: TalentEmploymentTypePreferenceFormComponent;
  let fixture: ComponentFixture<TalentEmploymentTypePreferenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentEmploymentTypePreferenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEmploymentTypePreferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
