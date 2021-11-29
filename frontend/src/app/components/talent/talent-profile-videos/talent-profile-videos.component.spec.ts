import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileVideosComponent } from './talent-profile-videos.component';

describe('TalentProfileVideosComponent', () => {
  let component: TalentProfileVideosComponent;
  let fixture: ComponentFixture<TalentProfileVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
