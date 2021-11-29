import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMyJobsComponent } from './talent-my-jobs.component';

describe('TalentMyJobsComponent', () => {
  let component: TalentMyJobsComponent;
  let fixture: ComponentFixture<TalentMyJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentMyJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMyJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
