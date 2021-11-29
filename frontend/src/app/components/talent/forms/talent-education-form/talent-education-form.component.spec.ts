import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEducationFormComponent } from './talent-education-form.component';

describe('TalentEducationFormComponent', () => {
  let component: TalentEducationFormComponent;
  let fixture: ComponentFixture<TalentEducationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentEducationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
