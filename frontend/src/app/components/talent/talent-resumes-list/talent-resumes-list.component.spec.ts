import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentResumesListComponent } from './talent-resumes-list.component';

describe('TalentResumesListComponent', () => {
  let component: TalentResumesListComponent;
  let fixture: ComponentFixture<TalentResumesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentResumesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentResumesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
