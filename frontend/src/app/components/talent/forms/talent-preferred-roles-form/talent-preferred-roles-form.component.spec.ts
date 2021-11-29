import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentPreferredRolesFormComponent } from './talent-preferred-roles-form.component';

describe('TalentPreferredRolesFormComponent', () => {
  let component: TalentPreferredRolesFormComponent;
  let fixture: ComponentFixture<TalentPreferredRolesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentPreferredRolesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentPreferredRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
