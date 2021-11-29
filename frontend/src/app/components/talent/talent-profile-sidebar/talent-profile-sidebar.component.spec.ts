import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileSidebarComponent } from './talent-profile-sidebar.component';

describe('TalentProfileSidebarComponent', () => {
  let component: TalentProfileSidebarComponent;
  let fixture: ComponentFixture<TalentProfileSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
