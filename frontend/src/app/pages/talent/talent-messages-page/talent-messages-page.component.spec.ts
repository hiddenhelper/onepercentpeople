import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentMessagesPageComponent } from './talent-messages-page.component';

describe('TalentMessagesPageComponent', () => {
  let component: TalentMessagesPageComponent;
  let fixture: ComponentFixture<TalentMessagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentMessagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
