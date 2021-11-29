import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobResponseListItemComponent } from './employer-job-response-list-item.component';

describe('EmployerJobResponseListItemComponent', () => {
  let component: EmployerJobResponseListItemComponent;
  let fixture: ComponentFixture<EmployerJobResponseListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobResponseListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobResponseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
