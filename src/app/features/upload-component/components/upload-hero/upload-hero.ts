import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UploadFeature {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-upload-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-hero.html',
  styleUrl: './upload-hero.css'
})
export class UploadHeroComponent {

  readonly features: UploadFeature[] = [
    {
      icon: '📄',
      text: 'PDF Files Only'
    },
    {
      icon: '⚡',
      text: 'AI Summary in Seconds'
    },
    {
      icon: '🔒',
      text: 'Secure Upload'
    }
  ];

}