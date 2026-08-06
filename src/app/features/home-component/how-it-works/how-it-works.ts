import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  step: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css'
})
export class HowItWorks {

  readonly steps: Step[] = [
    {
      step: '01',
      icon: '📄',
      title: 'Upload Your PDF',
      description: 'Upload lecture notes, research papers, books, or any PDF document securely.'
    },
    {
      step: '02',
      icon: '🤖',
      title: 'AI Analyzes Content',
      description: 'Our AI reads and understands your document, identifying the most important information.'
    },
    {
      step: '03',
      icon: '✨',
      title: 'Generate Smart Notes',
      description: 'Receive concise summaries, key points, flashcards, and interview questions instantly.'
    },
    {
      step: '04',
      icon: '⬇️',
      title: 'Download & Study',
      description: 'Save your generated notes and use them anytime for revision or exam preparation.'
    }
  ];

}