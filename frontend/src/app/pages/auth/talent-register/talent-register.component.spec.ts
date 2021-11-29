import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRegisterComponent } from './talent-register.component';

describe('TalentRegisterComponent', () => {
  let component: TalentRegisterComponent;
  let fixture: ComponentFixture<TalentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
