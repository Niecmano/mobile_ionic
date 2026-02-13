import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectDetailsPage } from './subject-details.page';

describe('SubjectDetailsPage', () => {
  let component: SubjectDetailsPage;
  let fixture: ComponentFixture<SubjectDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
