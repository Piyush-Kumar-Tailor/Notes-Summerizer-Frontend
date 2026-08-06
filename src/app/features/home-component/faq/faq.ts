import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {

  readonly faqs: FAQ[] = [
    {
      question: 'What types of PDF files are supported?',
      answer: 'You can upload lecture notes, research papers, books, documentation, resumes, and most text-based PDF files.'
    },
    {
      question: 'How accurate are the AI-generated summaries?',
      answer: 'Our AI produces highly accurate summaries while preserving the key concepts from your original document.'
    },
    {
      question: 'Can I generate interview questions from my notes?',
      answer: 'Yes. The application can generate interview questions based on the uploaded document to help with exam and interview preparation.'
    },
    {
      question: 'Is my uploaded PDF secure?',
      answer: 'Yes. Your files are processed securely and are not shared with anyone.'
    },
    {
      question: 'Can I download the generated summary?',
      answer: 'Yes. You can download your generated notes and summaries for offline use.'
    }
  ];

  selectedIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.selectedIndex.update(current =>
      current === index ? null : index
    );
  }

}