import {
  Component,
  Input,
  Type
} from '@angular/core';

import {
  CommonModule,
  NgComponentOutlet
} from '@angular/common';

import { AiSummaryDetail } from '../ai-summary-detail/ai-summary-detail';
import { NotesDetail } from '../notes-detail/notes-detail';
import { FlashcardsDetail } from '../flash-card-detail/flash-card-detail';
import { QuizDetail } from '../quize-detail/quize-detail';
import { ExamPreparationDetail } from '../exam-prepration-detail/exam-prepration-detail';
import { ExportDetail } from '../export-detail/export-detail';

@Component({
  selector: 'app-feature-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet
  ],
  templateUrl: './feature-detail.html',
  styleUrl: './feature-detail.css'
})
export class FeatureDetail {

  @Input({ required: true })
  featureType!:
    | 'summary'
    | 'notes'
    | 'flashcards'
    | 'quiz'
    | 'exam'
    | 'export';

  readonly featureComponents: Record<string, Type<unknown>> = {

    summary: AiSummaryDetail,

    notes: NotesDetail,

    flashcards: FlashcardsDetail,

    quiz: QuizDetail,

    exam: ExamPreparationDetail,

    export: ExportDetail

  };

  get selectedComponent(): Type<unknown> | null {

    return this.featureComponents[this.featureType] ?? null;

  }

}