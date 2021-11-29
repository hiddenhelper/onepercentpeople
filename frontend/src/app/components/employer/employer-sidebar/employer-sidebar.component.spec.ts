import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSidebarComponent } from './employer-sidebar.component';

describe('EmployerSidebarComponent', () => {
  let component: EmployerSidebarComponent;
  let fixture: ComponentFixture<EmployerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
