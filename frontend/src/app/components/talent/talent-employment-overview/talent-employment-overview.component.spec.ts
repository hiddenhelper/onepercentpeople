import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentEmploymentOverviewComponent } from './talent-employment-overview.component';

describe('TalentEmploymentOverviewComponent', () => {
  let component: TalentEmploymentOverviewComponent;
  let fixture: ComponentFixture<TalentEmploymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentEmploymentOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentEmploymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
