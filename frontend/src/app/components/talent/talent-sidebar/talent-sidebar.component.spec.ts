import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSidebarComponent } from './talent-sidebar.component';

describe('TalentSidebarComponent', () => {
  let component: TalentSidebarComponent;
  let fixture: ComponentFixture<TalentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentSidebarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
