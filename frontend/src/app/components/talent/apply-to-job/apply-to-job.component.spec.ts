import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyToJobComponent } from './apply-to-job.component';

describe('ApplyToJobComponent', () => {
  let component: ApplyToJobComponent;
  let fixture: ComponentFixture<ApplyToJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyToJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyToJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
