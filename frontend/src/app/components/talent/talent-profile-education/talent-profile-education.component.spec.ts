import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileEducationComponent } from './talent-profile-education.component';

describe('TalentProfileEducationComponent', () => {
  let component: TalentProfileEducationComponent;
  let fixture: ComponentFixture<TalentProfileEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
