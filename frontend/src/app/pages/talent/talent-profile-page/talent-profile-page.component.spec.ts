import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfilePageComponent } from './talent-profile-page.component';

describe('TalentProfilePageComponent', () => {
  let component: TalentProfilePageComponent;
  let fixture: ComponentFixture<TalentProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
