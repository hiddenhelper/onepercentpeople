import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroIconComponent } from './hero-icon.component';

describe('HeroIconComponent', () => {
  let component: HeroIconComponent;
  let fixture: ComponentFixture<HeroIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
