import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBannerComponent } from './join-banner.component';

describe('JoinBannerComponent', () => {
  let component: JoinBannerComponent;
  let fixture: ComponentFixture<JoinBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinBannerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
