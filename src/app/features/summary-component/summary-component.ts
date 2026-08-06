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

  private readonly summaryService = inject(SummaryService);

  private readonly route = inject(ActivatedRoute);

  private readonly destroyRef = inject(DestroyRef);

  readonly summary = signal<Summary | null>(null);

  readonly loading = signal(true);

  readonly error = signal('');

  readonly showHero = signal(false);

  readonly showSummary = signal(false);

  readonly showKeyPoints = signal(false);

  readonly showFlashcards = signal(false);

  readonly showQuiz = signal(false);

  readonly showInterview = signal(false);

  readonly showExport = signal(false);

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const summaryId = Number(params.get('id'));

        if (isNaN(summaryId)) {

          this.error.set('Invalid summary id.');

          this.loading.set(false);

          return;

        }

        this.loadSummary(summaryId);

      });

  }

  private loadSummary(summaryId: number): void {

    this.loading.set(true);

    this.summary.set(null);

    this.error.set('');

    this.resetSections();

    this.summaryService
      .getSummary(summaryId)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: summary => {

          this.summary.set(summary);

          this.loading.set(false);

          this.revealSections();

        },

        error: error => {

          console.error(error);

          this.loading.set(false);

          this.error.set(

            error?.error?.message ??

            'Unable to load summary.'

          );

        }

      });

  }

  private resetSections(): void {

    this.showHero.set(false);

    this.showSummary.set(false);

    this.showKeyPoints.set(false);

    this.showFlashcards.set(false);

    this.showQuiz.set(false);

    this.showInterview.set(false);

    this.showExport.set(false);

  }

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