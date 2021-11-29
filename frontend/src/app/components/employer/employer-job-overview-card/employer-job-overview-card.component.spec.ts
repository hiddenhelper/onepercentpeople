import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobOverviewCardComponent } from './employer-job-overview-card.component';

describe('EmployerJobOverviewCardComponent', () => {
  let component: EmployerJobOverviewCardComponent;
  let fixture: ComponentFixture<EmployerJobOverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobOverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobOverviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
