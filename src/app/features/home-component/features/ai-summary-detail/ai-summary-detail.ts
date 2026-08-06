import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-summary-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ai-summary-detail.html',
  styleUrl: './ai-summary-detail.css'
})
export class AiSummaryDetail {

  readonly workflow = [

    'Upload PDF',

    'AI analyzes every page',

    'Important concepts identified',

    'Summary generated',

    'Download or revise instantly'

  ];

  readonly benefits = [

    'Reduce reading time by up to 90%',

    'Understand lengthy PDFs quickly',

    'AI highlights only important concepts',

    'Supports technical and academic PDFs'

  ];

  readonly technologies = [

    'Gemini AI',

    'Spring Boot',

    'Angular',

    'REST API'

  ];

}