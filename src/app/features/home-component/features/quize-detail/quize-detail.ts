import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './quize-detail.html',
  styleUrl: './quize-detail.css'
})
export class QuizDetail {

  readonly quizzes = [

    {
      question: 'What is Machine Learning?',
      options: [
        'A programming language',
        'A subset of Artificial Intelligence',
        'A database',
        'A browser'
      ],
      answer: 'A subset of Artificial Intelligence'
    },

    {
      question: 'Which algorithm learns from data?',
      options: [
        'Sorting',
        'Searching',
        'Machine Learning',
        'Compiler'
      ],
      answer: 'Machine Learning'
    },

    {
      question: 'Deep Learning mainly uses?',
      options: [
        'Arrays',
        'Stacks',
        'Neural Networks',
        'Graphs'
      ],
      answer: 'Neural Networks'
    }

  ];

}