import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentProfileBasicComponent } from './talent-profile-basic.component';

describe('TalentProfileBasicComponent', () => {
  let component: TalentProfileBasicComponent;
  let fixture: ComponentFixture<TalentProfileBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentProfileBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentProfileBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
