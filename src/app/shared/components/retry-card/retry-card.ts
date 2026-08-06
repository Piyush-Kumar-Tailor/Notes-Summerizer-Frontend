import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-retry-card',
  standalone: true,
  templateUrl: './retry-card.html',
  styleUrl: './retry-card.css'
})
export class RetryCard {

  // Error message received from parent
  error = input<string>('Something went wrong.');

  // Event emitted when Retry button is clicked
  retry = output<void>();

  loadSummary(): void {
    this.retry.emit();
  }
}