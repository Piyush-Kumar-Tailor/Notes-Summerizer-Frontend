import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './states.html',
  styleUrl: './states.css'
})
export class Stats {

  readonly stats: Stat[] = [
    {
      value: '10K+',
      title: 'PDFs Processed',
      description: 'Thousands of PDFs summarized with AI.',
      icon: '📄'
    },
    {
      value: '98%',
      title: 'Accuracy',
      description: 'High-quality summaries powered by AI.',
      icon: '🎯'
    },
    {
      value: '<5 sec',
      title: 'Processing Time',
      description: 'Generate summaries in just a few seconds.',
      icon: '⚡'
    },
    {
      value: '24/7',
      title: 'Availability',
      description: 'Use the platform anytime, anywhere.',
      icon: '🌍'
    }
  ];

}