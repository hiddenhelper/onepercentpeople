import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEmploymentOverviewPageComponent } from './talent-employment-overview-page.component';

describe('TalentEmploymentOverviewPageComponent', () => {
  let component: TalentEmploymentOverviewPageComponent;
  let fixture: ComponentFixture<TalentEmploymentOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentEmploymentOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEmploymentOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
