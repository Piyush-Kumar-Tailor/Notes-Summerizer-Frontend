import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewQuestions } from './interview-questions';

describe('InterviewQuestions', () => {
  let component: InterviewQuestions;
  let fixture: ComponentFixture<InterviewQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
