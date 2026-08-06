import { Component, computed, inject, Input, signal } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-summary-content',
  standalone: true,
  imports: [],
  templateUrl: './summary-content.html',
  styleUrl: './summary-content.css'
})
export class SummaryContentComponent {

  @Input({ required: true })
  summary!: string | undefined;

  readonly expanded = signal(false);

  readonly maxCharacters = 700;

  private readonly toastService = inject(ToastService);

  

  readonly displaySummary = computed(() => {

    if (this.expanded()) {
      return this.summary;
    }

    if (this.summary!.length <= this.maxCharacters) {
      return this.summary;
    }

    return this.summary!.substring(0, this.maxCharacters) + '...';

  });

  readonly readingTime = computed(() => {

    const words = this.summary!.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));

  });

  toggleSummary(): void {

    this.expanded.update(value => !value);

  }

  async copySummary(): Promise<void> {

    try {

      await navigator.clipboard.writeText(this.summary!);

      this.toastService.show("Summary copied successfully.","success");

    } catch {

      alert('Unable to copy summary.');
      this.toastService.show("Unable to copy summary.","error");

    }

  }

}