import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcards-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './flash-card-detail.html',
  styleUrl: './flash-card-detail.css'
})
export class FlashcardsDetail {

  readonly flashcards = [

    {
      question: 'What is Artificial Intelligence?',
      answer: 'Simulation of human intelligence by machines.'
    },

    {
      question: 'What is Machine Learning?',
      answer: 'A subset of AI that learns from data.'
    },

    {
      question: 'What is Deep Learning?',
      answer: 'Machine Learning using Neural Networks.'
    }

  ];

}