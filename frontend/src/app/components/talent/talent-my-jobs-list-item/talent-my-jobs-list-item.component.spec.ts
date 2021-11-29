import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMyJobsListItemComponent } from './talent-my-jobs-list-item.component';

describe('TalentMyJobsListItemComponent', () => {
  let component: TalentMyJobsListItemComponent;
  let fixture: ComponentFixture<TalentMyJobsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentMyJobsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMyJobsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
