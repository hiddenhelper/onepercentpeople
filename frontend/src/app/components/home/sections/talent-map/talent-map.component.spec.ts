import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMapComponent } from './talent-map.component';

describe('TalentMapComponent', () => {
  let component: TalentMapComponent;
  let fixture: ComponentFixture<TalentMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
