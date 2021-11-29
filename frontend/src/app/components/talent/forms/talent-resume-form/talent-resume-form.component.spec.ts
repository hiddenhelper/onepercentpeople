import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentResumeFormComponent } from './talent-resume-form.component';

describe('TalentResumeFormComponent', () => {
  let component: TalentResumeFormComponent;
  let fixture: ComponentFixture<TalentResumeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentResumeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentResumeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
