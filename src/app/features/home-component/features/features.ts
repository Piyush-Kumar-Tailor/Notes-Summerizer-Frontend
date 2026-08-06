import {
  Component,
  OnDestroy,
  Renderer2,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FeatureDetail } from './feature-detail/feature-detail';

interface Feature {

  icon: string;

  title: string;

  description: string;

  badge: string;

  highlights: string[];

  type:
    | 'summary'
    | 'notes'
    | 'flashcards'
    | 'quiz'
    | 'exam'
    | 'export';

}

@Component({

  selector: 'app-features',

  standalone: true,

  imports: [

    CommonModule,

    FeatureDetail

  ],

  templateUrl: './features.html',

  styleUrl: './features.css'

})
export class Features implements OnDestroy {

  private readonly renderer = inject(Renderer2);

  readonly selectedFeature = signal<Feature | null>(null);

  readonly features: Feature[] = [

    {
      icon: '🤖',
      title: 'AI Summary',
      description: 'Generate concise summaries from lengthy PDF documents in seconds.',
      badge: 'Most Popular',
      highlights: ['AI Generated', 'Fast', 'Accurate'],
      type: 'summary'
    },

    {
      icon: '📝',
      title: 'Smart Notes',
      description: 'Extract important concepts, formulas and bullet points automatically.',
      badge: 'Study',
      highlights: ['Notes', 'Revision', 'Highlights'],
      type: 'notes'
    },

    {
      icon: '🧠',
      title: 'Flashcards',
      description: 'Create interactive flashcards for quick and effective revision.',
      badge: 'Memory',
      highlights: ['Revision', 'Learning', 'Cards'],
      type: 'flashcards'
    },

    {
      icon: '❓',
      title: 'Quiz Generator',
      description: 'Automatically generate practice quizzes from your PDFs.',
      badge: 'Practice',
      highlights: ['MCQ', 'Assessment', 'Exam'],
      type: 'quiz'
    },

    {
      icon: '🎯',
      title: 'Exam Preparation',
      description: 'Generate important questions and AI study plans for exams.',
      badge: 'Exam Ready',
      highlights: ['Questions', 'Revision', 'Preparation'],
      type: 'exam'
    },

    {
      icon: '📤',
      title: 'Export Notes',
      description: 'Download AI-generated summaries and notes in multiple formats.',
      badge: 'Export',
      highlights: ['PDF', 'DOCX', 'Markdown'],
      type: 'export'
    }

  ];

  private scrollPosition = 0;

openFeature(feature: Feature): void {

  this.selectedFeature.set(feature);

  this.scrollPosition = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${this.scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';

}

closeFeature(): void {

  this.selectedFeature.set(null);

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';

  window.scrollTo(0, this.scrollPosition);

}

ngOnDestroy(): void {

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';

}

  

}