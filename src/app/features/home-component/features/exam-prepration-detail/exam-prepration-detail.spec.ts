import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPreprationDetail } from './exam-prepration-detail';

describe('ExamPreprationDetail', () => {
  let component: ExamPreprationDetail;
  let fixture: ComponentFixture<ExamPreprationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamPreprationDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamPreprationDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
