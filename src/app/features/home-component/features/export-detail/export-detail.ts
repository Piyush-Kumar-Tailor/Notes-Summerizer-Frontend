import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-export-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './export-detail.html',
  styleUrl: './export-detail.css'
})
export class ExportDetail {

  readonly formats = [

    'PDF',

    'Markdown',

    'Plain Text',

    'DOCX',

    'JSON'

  ];

}