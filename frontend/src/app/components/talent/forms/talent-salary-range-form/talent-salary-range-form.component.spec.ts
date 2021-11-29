import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentSalaryRangeFormComponent } from './talent-salary-range-form.component';

describe('TalentSalaryRangeFormComponent', () => {
  let component: TalentSalaryRangeFormComponent;
  let fixture: ComponentFixture<TalentSalaryRangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentSalaryRangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentSalaryRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
