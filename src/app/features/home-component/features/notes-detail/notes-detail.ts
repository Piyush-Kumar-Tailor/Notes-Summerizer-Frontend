import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notes-detail.html',
  styleUrl: './notes-detail.css'
})
export class NotesDetail {

  readonly noteTypes = [

    'Chapter-wise Notes',

    'Important Concepts',

    'Definitions',

    'Formulas',

    'Revision Points'

  ];

  readonly features = [

    'AI automatically extracts key concepts',

    'Organized in easy-to-read bullet points',

    'Highlights important definitions',

    'Ideal for quick revision before exams'

  ];

}