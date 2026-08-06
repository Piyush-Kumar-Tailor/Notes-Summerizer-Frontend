import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SummaryService } from '../../services/summary-service';

import { Summary } from '../../models/summary-model';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class Loading implements OnInit {

  private readonly route = inject(ActivatedRoute);

  private readonly summaryService = inject(SummaryService);

  private readonly destroyRef = inject(DestroyRef);

  readonly summary = signal<Summary | null>(null);

  readonly loading = signal(true);

  readonly error = signal('');

  readonly showContent = signal(false);

  readonly hasSummary = computed(() =>

    this.summary() !== null

  );

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {

        const id = Number(params.get('id'));

        if (isNaN(id)) {

          this.loading.set(false);

          this.error.set('Invalid summary.');

          return;

        }

        this.loadSummary(id);

      });

  }

  private loadSummary(id: number): void {

    this.loading.set(true);

    this.showContent.set(false);

    this.summaryService

      .getSummary(id)

      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )

      .subscribe({

        next: summary => {

          this.summary.set(summary);

          this.loading.set(false);

          requestAnimationFrame(() => {

            this.showContent.set(true);

          });

        },

        error: error => {

          this.loading.set(false);

          this.error.set(

            error?.error?.message ??

            'Unable to load summary.'

          );

        }

      });

  }

}