import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal
} from '@angular/core';

import { Flashcard } from '../../models/summary-model';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [],
  templateUrl: './flash-cards.html',
  styleUrl: './flash-cards.css'
})
export class FlashcardsComponent implements OnChanges {

  @Input({ required: true })
  flashcards: Flashcard[] = [];

  readonly flippedCards =
    signal<Set<number>>(new Set());

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['flashcards']) {

      this.flippedCards.set(new Set());

    }

  }

  toggleCard(index: number): void {

    this.flippedCards.update(cards => {

      const updated = new Set(cards);

      if (updated.has(index)) {

        updated.delete(index);

      } else {

        updated.add(index);

      }

      return updated;

    });

  }

  isFlipped(index: number): boolean {

    return this.flippedCards().has(index);

  }

}