import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOnboardingComponent } from './layout-onboarding.component';

describe('LayoutOnboardingComponent', () => {
  let component: LayoutOnboardingComponent;
  let fixture: ComponentFixture<LayoutOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
