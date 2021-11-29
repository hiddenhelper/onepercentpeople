import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentWorkHistoryFormComponent } from './talent-work-history-form.component';

describe('TalentWorkHistoryFormComponent', () => {
  let component: TalentWorkHistoryFormComponent;
  let fixture: ComponentFixture<TalentWorkHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentWorkHistoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentWorkHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
