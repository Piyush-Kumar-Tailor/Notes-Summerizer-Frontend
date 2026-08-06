import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal
} from '@angular/core';

import { InterviewQuestion } from '../../models/summary-model';

@Component({
  selector: 'app-interview-questions',
  standalone: true,
  imports: [],
  templateUrl: './interview-questions.html',
  styleUrl: './interview-questions.css'
})
export class InterviewQuestionsComponent
implements OnChanges {

  @Input({ required: true })
  interviewQuestions: InterviewQuestion[] = [];

  readonly expandedQuestion =
    signal<number | null>(null);

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['interviewQuestions']) {

      this.expandedQuestion.set(null);

    }

  }

  toggleQuestion(index: number): void {

    this.expandedQuestion.update(current =>

      current === index ? null : index

    );

  }

  isExpanded(index: number): boolean {

    return this.expandedQuestion() === index;

  }

}