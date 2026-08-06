import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

interface Technology {

  name: string;

  icon: string;

}

interface Timeline {

  title: string;

  description: string;

}

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css'
})
export class AboutComponent {

  readonly technologies: Technology[] = [

    {
      name: 'Angular',
      icon: '🅰️'
    },

    {
      name: 'Spring Boot',
      icon: '☕'
    },

    {
      name: 'Java',
      icon: '💻'
    },

    {
      name: 'Gemini AI',
      icon: '✨'
    },

    {
      name: 'PostgreSQL',
      icon: '🗄️'
    },

    {
      name: 'Docker',
      icon: '🐳'
    }

  ];

  readonly timeline: Timeline[] = [

    {

      title: 'Upload PDF',

      description:
        'Upload any textbook, documentation, research paper or notes.'

    },

    {

      title: 'AI Processing',

      description:
        'Gemini AI analyzes the document and understands the complete context.'

    },

    {

      title: 'Generate Learning Material',

      description:
        'Summaries, notes, quizzes, flashcards and exam preparation are created automatically.'

    },

    {

      title: 'Study Anywhere',

      description:
        'Read online or export your generated notes for offline learning.'

    }

  ];

}