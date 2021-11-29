import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMessagesPageComponent } from './employer-messages-page.component';

describe('EmployerMessagesPageComponent', () => {
  let component: EmployerMessagesPageComponent;
  let fixture: ComponentFixture<EmployerMessagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerMessagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
