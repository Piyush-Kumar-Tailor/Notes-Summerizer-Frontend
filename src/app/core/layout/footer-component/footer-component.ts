import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterLink {
  title: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {

  readonly quickLinks: FooterLink[] = [
    { title: 'Home', route: '/home' },
    { title: 'About', route: '/about' },
    { title: 'Upload PDF', route: '/upload' },
    { title: 'History', route: '/history' }
  ];

  readonly features = [
    { title: 'AI Summary'},
    { title: 'Flashcards'},
    { title: 'Quiz Generator'},
    { title: 'Interview Questions'}
  ];

}