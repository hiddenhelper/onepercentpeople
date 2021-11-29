import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSignupComponent } from './talent-signup.component';

describe('TalentSignupComponent', () => {
  let component: TalentSignupComponent;
  let fixture: ComponentFixture<TalentSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentSignupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
