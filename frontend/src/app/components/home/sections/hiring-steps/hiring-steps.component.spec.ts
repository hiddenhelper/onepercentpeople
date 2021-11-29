import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringStepsComponent } from './hiring-steps.component';

describe('HiringStepsComponent', () => {
  let component: HiringStepsComponent;
  let fixture: ComponentFixture<HiringStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
