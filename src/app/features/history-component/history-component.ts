import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SummaryService } from '../summary-component/services/summary-service';
import { ToastService } from '../../core/services/toast.service';
import { HistoryItem } from './models/history-model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    FormsModule
  ],
  templateUrl: './history-component.html',
  styleUrl: './history-component.css'
})
export class HistoryComponent implements OnInit {

  private readonly summaryService = inject(SummaryService);

  private readonly toast = inject(ToastService);

  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);

  readonly history = signal<HistoryItem[]>([]);

  readonly error = signal('');

  // ---------------------------------
  // Search
  // ---------------------------------

  readonly searchText = signal('');

  // ---------------------------------
  // Sorting
  // ---------------------------------

  readonly sortBy = signal<'newest' | 'oldest' | 'name'>('newest');

  // ---------------------------------
  // Pagination
  // ---------------------------------

  readonly currentPage = signal(1);

  readonly pageSize = signal(10);

  // ---------------------------------
  // Filter + Sort
  // ---------------------------------

  readonly filteredHistory = computed(() => {

    const search = this.searchText()
      .trim()
      .toLowerCase();

    let items = [...this.history()];

    // Search

    if (search) {

      items = items.filter(item =>
        item.fileName.toLowerCase().includes(search) ||
        item.aiModel.toLowerCase().includes(search) ||
        item.summaryLength.toLowerCase().includes(search)
      );

    }

    // Sort

    switch (this.sortBy()) {

      case 'name':

        items.sort((a, b) =>
          a.fileName.localeCompare(b.fileName)
        );

        break;

      case 'oldest':

        items.sort((a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

        break;

      default:

        items.sort((a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );

    }

    return items;

  });

  // ---------------------------------
  // Total Pages
  // ---------------------------------

  readonly totalPages = computed(() => {

    return Math.max(
      1,
      Math.ceil(
        this.filteredHistory().length /
        this.pageSize()
      )
    );

  });

  // ---------------------------------
  // Current Page Data
  // ---------------------------------

  readonly paginatedHistory = computed(() => {

    const start =
      (this.currentPage() - 1) *
      this.pageSize();

    return this.filteredHistory().slice(
      start,
      start + this.pageSize()
    );

  });

  constructor() {

    // Reset page whenever search changes

    computed(() => {

      this.searchText();

      this.currentPage.set(1);

    });

    // Reset page whenever sort changes

    computed(() => {

      this.sortBy();

      this.currentPage.set(1);

    });

    // Reset page whenever page size changes

    computed(() => {

      this.pageSize();

      this.currentPage.set(1);

    });

  }

  ngOnInit(): void {

    this.loadHistory();

  }

  loadHistory(): void {

    this.loading.set(true);

    this.error.set('');

    this.summaryService
      .getHistory()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: response => {

          this.history.set(response.data);

          this.loading.set(false);

        },

        error: error => {

          console.error(error);

          this.error.set(
            error?.error?.message ??
            'Unable to load history.'
          );

          this.loading.set(false);

          this.toast.show(
            'Unable to load history.',
            'error'
          );

        }

      });

  }

  previousPage(): void {

    if (this.currentPage() > 1) {

      this.currentPage.update(page => page - 1);

    }

  }

  nextPage(): void {

    if (this.currentPage() < this.totalPages()) {

      this.currentPage.update(page => page + 1);

    }

  }

  deleteHistory(id: number): void {

    if (!confirm(
      'Are you sure you want to delete this summary?'
    )) {

      return;

    }

    this.summaryService
      .deleteHistory(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: () => {

          this.history.update(items =>
            items.filter(item => item.id !== id)
          );

          if (
            this.currentPage() > this.totalPages()
          ) {

            this.currentPage.set(
              this.totalPages()
            );

          }

          this.toast.show(
            'Summary deleted successfully.',
            'success'
          );

        },

        error: error => {

          console.error(error);

          this.toast.show(
            error?.error?.message ??
            'Failed to delete summary.',
            'error'
          );

        }

      });

  }

}