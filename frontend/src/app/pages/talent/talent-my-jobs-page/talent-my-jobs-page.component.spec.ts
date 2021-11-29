import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMyJobsPageComponent } from './talent-my-jobs-page.component';

describe('TalentMyJobsPageComponent', () => {
  let component: TalentMyJobsPageComponent;
  let fixture: ComponentFixture<TalentMyJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentMyJobsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMyJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
