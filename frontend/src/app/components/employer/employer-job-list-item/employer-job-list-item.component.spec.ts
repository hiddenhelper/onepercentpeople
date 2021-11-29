import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobListItemComponent } from './employer-job-list-item.component';

describe('EmployerJobListItemComponent', () => {
  let component: EmployerJobListItemComponent;
  let fixture: ComponentFixture<EmployerJobListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
