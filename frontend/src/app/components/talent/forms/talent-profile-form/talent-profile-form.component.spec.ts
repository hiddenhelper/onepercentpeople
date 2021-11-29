import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileFormComponent } from './talent-profile-form.component';

describe('TalentProfileFormComponent', () => {
  let component: TalentProfileFormComponent;
  let fixture: ComponentFixture<TalentProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
