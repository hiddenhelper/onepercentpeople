import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTalentComponent } from './view-talent.component';

describe('ViewTalentComponent', () => {
  let component: ViewTalentComponent;
  let fixture: ComponentFixture<ViewTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
