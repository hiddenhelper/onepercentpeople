import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRegisterFormComponent } from './talent-register-form.component';

describe('TalentRegisterFormComponent', () => {
  let component: TalentRegisterFormComponent;
  let fixture: ComponentFixture<TalentRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
