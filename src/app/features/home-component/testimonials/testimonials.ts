import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {

  readonly testimonials: Testimonial[] = [
    {
      name: 'Aarav Sharma',
      role: 'Computer Science Student',
      review: 'This AI PDF Notes Summarizer helped me revise an entire semester in just a few hours. The summaries are accurate and easy to understand.',
      rating: 5
    },
    {
      name: 'Priya Mehta',
      role: 'Software Engineer',
      review: 'I use it to summarize technical documentation and research papers. It saves me a lot of reading time.',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Competitive Exam Aspirant',
      review: 'The flashcards and interview questions generated from my notes have made revision much more effective.',
      rating: 5
    }
  ];

}