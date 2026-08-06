import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  templateUrl: './upload-progress.html',
  styleUrl: './upload-progress.css'
})
export class UploadProgress {

  readonly messages = [

    'Reading every page of your PDF',

    'Understanding the important concepts',

    'Generating an easy-to-read summary',

    'Creating revision-ready notes',

    'Preparing flashcards, quizzes and interview questions'

  ];

}