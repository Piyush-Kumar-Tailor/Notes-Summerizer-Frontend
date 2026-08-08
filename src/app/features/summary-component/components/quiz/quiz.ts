import {
  Component,
  Input,
  Output,
  EventEmitter,
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

  // =====================================================
  // Input
  // =====================================================

  @Input({ required: true })
  quiz: QuizQuestion[] | undefined = [];


  // =====================================================
  // Generate New Quiz Event
  // =====================================================

  @Output()
  generateNewQuiz = new EventEmitter<void>();


  // =====================================================
  // Loading State
  // =====================================================

  @Input()
  generatingNewQuiz = false;


  // =====================================================
  // Constants
  // =====================================================

  readonly optionLabels = [
    'A',
    'B',
    'C',
    'D'
  ];


  // =====================================================
  // Quiz State
  // =====================================================

  readonly selectedAnswers =
    signal<Record<number, string>>({});

  readonly submitted =
    signal(false);


  // =====================================================
  // Answered Count
  // =====================================================

  readonly answeredCount = computed(() => {

    return Object.keys(
      this.selectedAnswers()
    ).length;

  });


  // =====================================================
  // Completion
  // =====================================================

  readonly completion = computed(() => {

    const totalQuestions =
      this.quiz?.length ?? 0;

    if (totalQuestions === 0) {
      return 0;
    }

    return Math.round(
      (this.answeredCount() / totalQuestions) * 100
    );

  });


  // =====================================================
  // Score
  // =====================================================

  readonly score = computed(() => {

    const answers =
      this.selectedAnswers();

    const questions =
      this.quiz ?? [];

    return questions.reduce(
      (score, question, index) => {

        return answers[index] ===
          question.correctAnswer
          ? score + 1
          : score;

      },
      0
    );

  });


  // =====================================================
  // Input Changes
  // =====================================================

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['quiz']) {

      this.resetQuiz();

    }

  }


  // =====================================================
  // Select Answer
  // =====================================================

  selectAnswer(
    questionIndex: number,
    answer: string
  ): void {

    if (
      this.submitted() ||
      this.generatingNewQuiz
    ) {
      return;
    }

    const questions =
      this.quiz ?? [];

    if (
      questionIndex < 0 ||
      questionIndex >= questions.length
    ) {
      return;
    }

    this.selectedAnswers.update(
      current => ({
        ...current,
        [questionIndex]: answer
      })
    );

  }


  // =====================================================
  // Submit Quiz
  // =====================================================

  submitQuiz(): void {

    const totalQuestions =
      this.quiz?.length ?? 0;

    if (totalQuestions === 0) {
      return;
    }

    if (
      this.answeredCount() !==
      totalQuestions
    ) {
      return;
    }

    this.submitted.set(true);

  }


  // =====================================================
  // Reset Quiz
  // =====================================================

  resetQuiz(): void {

    this.selectedAnswers.set({});

    this.submitted.set(false);

  }


  // =====================================================
  // Generate New Quiz
  // =====================================================

  requestNewQuiz(): void {

    if (this.generatingNewQuiz) {
      return;
    }

    this.generateNewQuiz.emit();

  }


  // =====================================================
  // Answer Helpers
  // =====================================================

  isAnswered(
    index: number
  ): boolean {

    return this.selectedAnswers()[index]
      !== undefined;

  }


  getSelectedAnswer(
    index: number
  ): string | undefined {

    return this.selectedAnswers()[index];

  }


  isCorrect(
    index: number
  ): boolean {

    const question =
      this.quiz?.[index];

    if (!question) {
      return false;
    }

    return this.getSelectedAnswer(index) ===
      question.correctAnswer;

  }

}