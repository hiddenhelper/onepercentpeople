import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsFormComponent } from './company-details-form.component';

describe('CompanyDetailsFormComponent', () => {
  let component: CompanyDetailsFormComponent;
  let fixture: ComponentFixture<CompanyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
