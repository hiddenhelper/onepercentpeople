import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobsPageComponent } from './find-jobs-page.component';

describe('FindJobsPageComponent', () => {
  let component: FindJobsPageComponent;
  let fixture: ComponentFixture<FindJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
