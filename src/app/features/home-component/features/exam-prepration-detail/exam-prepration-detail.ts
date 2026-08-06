import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-preparation-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './exam-prepration-detail.html',
  styleUrl: './exam-prepration-detail.css'
})
export class ExamPreparationDetail {

  readonly topics = [

    'Important Questions',

    'Previous Year Questions',

    'Key Concepts',

    'Revision Checklist',

    'Expected Questions',

    'Quick Revision Notes'

  ];

}