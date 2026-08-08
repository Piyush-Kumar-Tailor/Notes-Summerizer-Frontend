import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SummaryHeroComponent } from './components/summary-hero/summary-hero';
import { SummaryContentComponent } from './components/summary-content/summary-content';
import { KeyPointsComponent } from './components/key-points/key-points';
import { FlashcardsComponent } from './components/flash-cards/flash-cards';
import { QuizComponent } from './components/quiz/quiz';
import { InterviewQuestionsComponent } from './components/interview-questions/interview-questions';
import { ExportComponent } from './components/export/export';
import { Loading } from './components/loading/loading';

import { SummaryService } from './services/summary-service';
import { Summary } from './models/summary-model';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    SummaryHeroComponent,
    SummaryContentComponent,
    KeyPointsComponent,
    FlashcardsComponent,
    QuizComponent,
    InterviewQuestionsComponent,
    ExportComponent,
    Loading
  ],
  templateUrl: './summary-component.html',
  styleUrl: './summary-component.css'
})
export class SummaryComponent implements OnInit {

  // =====================================================
  // Services
  // =====================================================

  private readonly summaryService =
    inject(SummaryService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly destroyRef =
    inject(DestroyRef);


  // =====================================================
  // Summary State
  // =====================================================

  readonly summary =
    signal<Summary | null>(null);

  readonly loading =
    signal(true);

  readonly error =
    signal('');


  // =====================================================
  // Section Visibility
  // =====================================================

  readonly showHero =
    signal(false);

  readonly showSummary =
    signal(false);

  readonly showKeyPoints =
    signal(false);

  readonly showFlashcards =
    signal(false);

  readonly showQuiz =
    signal(false);

  readonly showInterview =
    signal(false);

  readonly showExport =
    signal(false);


  // =====================================================
  // Quiz State
  // =====================================================

  /**
   * True while Gemini is generating a new quiz.
   *
   * This value is passed to QuizComponent so that
   * the Generate New Quiz button can show a spinner.
   */
  readonly quizLoading =
    signal(false);


  // =====================================================
  // Initialization
  // =====================================================

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const summaryId =
          Number(params.get('id'));

        if (
          !summaryId ||
          isNaN(summaryId)
        ) {

          this.error.set(
            'Invalid summary id.'
          );

          this.loading.set(false);

          return;

        }

        this.loadSummary(summaryId);

      });

  }


  // =====================================================
  // Load Summary
  // =====================================================

  private loadSummary(
    summaryId: number
  ): void {

    this.loading.set(true);

    this.summary.set(null);

    this.error.set('');

    this.quizLoading.set(false);

    this.resetSections();


    this.summaryService
      .getSummary(summaryId)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        // -----------------------------------------------
        // Success
        // -----------------------------------------------

        next: summary => {

          console.log(
            'Summary loaded:',
            summary
          );

          this.summary.set(summary);

          this.loading.set(false);

          this.revealSections();

        },


        // -----------------------------------------------
        // Error
        // -----------------------------------------------

        error: error => {

          console.error(
            'Failed to load summary:',
            error
          );

          this.loading.set(false);

          this.error.set(

            error?.error?.message ??

            'Unable to load summary.'

          );

        }

      });

  }


  // =====================================================
  // Generate New Quiz
  // =====================================================

  generateNewQuiz(): void {

    const currentSummary =
      this.summary();


    // -----------------------------------------------
    // Make sure summary exists
    // -----------------------------------------------

    if (!currentSummary) {

      console.error(
        'Cannot generate quiz: summary not available.'
      );

      return;

    }


    // -----------------------------------------------
    // Prevent duplicate requests
    // -----------------------------------------------

    if (this.quizLoading()) {

      return;

    }


    // -----------------------------------------------
    // Start loading
    // -----------------------------------------------

    this.quizLoading.set(true);


    // -----------------------------------------------
    // Generate quiz
    // -----------------------------------------------

    this.summaryService
      .generateQuiz(
        currentSummary.id,
        10
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        // =============================================
        // Success
        // =============================================

        next: newQuiz => {

          console.log(
            'New quiz generated:',
            newQuiz
          );


          // -------------------------------------------
          // Validate response
          // -------------------------------------------

          if (
            !newQuiz ||
            newQuiz.length === 0
          ) {

            console.warn(
              'Backend returned an empty quiz.'
            );

            this.quizLoading.set(false);

            return;

          }


          // -------------------------------------------
          // Update only quiz
          // -------------------------------------------

          this.summary.update(
            current => {

              if (!current) {
                return current;
              }

              return {
                ...current,
                quiz: newQuiz
              };

            }
          );


          // -------------------------------------------
          // Stop loading
          // -------------------------------------------

          this.quizLoading.set(false);

        },


        // =============================================
        // Error
        // =============================================

        error: error => {

          console.error(
            'Failed to generate new quiz:',
            error
          );

          this.quizLoading.set(false);

          /*
           * You can later replace this with a
           * proper toast/notification.
           */

          this.error.set(
            error?.error?.message ??
            'Unable to generate a new quiz. Please try again.'
          );

        }

      });

  }


  // =====================================================
  // Reset Sections
  // =====================================================

  private resetSections(): void {

    this.showHero.set(false);

    this.showSummary.set(false);

    this.showKeyPoints.set(false);

    this.showFlashcards.set(false);

    this.showQuiz.set(false);

    this.showInterview.set(false);

    this.showExport.set(false);

  }


  // =====================================================
  // Reveal Sections
  // =====================================================

  private revealSections(): void {

    this.showHero.set(true);


    setTimeout(() => {

      this.showSummary.set(true);

    }, 100);


    setTimeout(() => {

      this.showKeyPoints.set(true);

    }, 200);


    setTimeout(() => {

      this.showFlashcards.set(true);

    }, 300);


    setTimeout(() => {

      this.showQuiz.set(true);

    }, 400);


    setTimeout(() => {

      this.showInterview.set(true);

    }, 500);


    setTimeout(() => {

      this.showExport.set(true);

    }, 600);

  }

}