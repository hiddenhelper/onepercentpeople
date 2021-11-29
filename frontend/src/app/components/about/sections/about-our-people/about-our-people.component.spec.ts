import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOurPeopleComponent } from './about-our-people.component';

describe('AboutOurPeopleComponent', () => {
  let component: AboutOurPeopleComponent;
  let fixture: ComponentFixture<AboutOurPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutOurPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOurPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
