import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfilePhotoFormComponent } from './talent-profile-photo-form.component';

describe('TalentProfilePhotoFormComponent', () => {
  let component: TalentProfilePhotoFormComponent;
  let fixture: ComponentFixture<TalentProfilePhotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfilePhotoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfilePhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
