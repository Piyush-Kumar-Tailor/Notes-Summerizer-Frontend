import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  computed,
  signal
} from '@angular/core';

import { QuizQuestion } from '../../models/summary-model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnChanges {

  @Input({ required: true })
  quiz: QuizQuestion[] = [];

  readonly optionLabels = ['A', 'B', 'C', 'D'];


  /**
   * Stores selected answer for each question.
   * Key = Question Index
   * Value = Selected Option
   */
  readonly selectedAnswers = signal<Record<number, string>>({});

  /**
   * Indicates whether the quiz has been submitted.
   */
  readonly submitted = signal(false);

  /**
   * Number of answered questions.
   */
  readonly answeredCount = computed(() =>
    Object.keys(this.selectedAnswers()).length
  );

  /**
   * Completion percentage.
   */
  readonly completion = computed(() => {

    if (this.quiz.length === 0) {
      return 0;
    }

    return Math.round(
      (this.answeredCount() / this.quiz.length) * 100
    );

  });

  /**
   * Quiz score.
   */
  readonly score = computed(() => {

    const answers = this.selectedAnswers();

    return this.quiz.reduce((score, question, index) => {

      return answers[index] === question.correctAnswer
        ? score + 1
        : score;

    }, 0);

  });

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['quiz']) {

      this.resetQuiz();

    }

  }

  /**
   * Select answer.
   */
  selectAnswer(
    questionIndex: number,
    answer: string
  ): void {

    if (this.submitted()) {
      return;
    }

    if (
      questionIndex < 0 ||
      questionIndex >= this.quiz.length
    ) {
      return;
    }

    this.selectedAnswers.update(current => ({

      ...current,

      [questionIndex]: answer

    }));

  }

  /**
   * Submit quiz.
   */
  submitQuiz(): void {

    if (this.answeredCount() === 0) {
      return;
    }

    this.submitted.set(true);

  }

  /**
   * Reset quiz.
   */
  resetQuiz(): void {

    this.selectedAnswers.set({});

    this.submitted.set(false);

  }

  /**
   * Check whether a question has been answered.
   */
  isAnswered(index: number): boolean {

    return this.selectedAnswers()[index] !== undefined;

  }

  /**
   * Returns selected answer for a question.
   */
  getSelectedAnswer(index: number): string | undefined {

    return this.selectedAnswers()[index];

  }

  /**
   * Returns whether the selected answer is correct.
   */
  isCorrect(index: number): boolean {

    return this.getSelectedAnswer(index) ===
      this.quiz[index].correctAnswer;

  }

}