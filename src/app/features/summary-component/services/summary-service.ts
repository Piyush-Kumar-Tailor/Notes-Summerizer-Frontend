import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import { ApiResponse } from '../../upload-component/models/upload-model';

import {
  Summary,
  QuizQuestion
} from '../models/summary-model';

import { HistoryItem } from '../../history-component/models/history-model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private readonly http = inject(HttpClient);

  // =====================================================
  // API URLs
  // =====================================================

  private readonly historyUrl =
    `${environment.apiUrl}/history`;

  private readonly summaryUrl =
    `${environment.apiUrl}/summaries`;


  // =====================================================
  // History
  // =====================================================

  getHistory():
    Observable<ApiResponse<HistoryItem[]>> {

    return this.http.get<
      ApiResponse<HistoryItem[]>
    >(this.historyUrl);

  }


  deleteHistory(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.historyUrl}/${id}`
    );

  }


  // =====================================================
  // Get Summary
  // =====================================================

  getSummary(
    id: number
  ): Observable<Summary> {

    return this.http

      .get<Summary>(
        `${this.summaryUrl}/${id}`
      )

      .pipe(

        map(summary => ({

          ...summary,

          keyPoints:
            this.parseJson(summary.keyPoints),

          flashcards:
            this.parseJson(summary.flashcards),

          quiz:
            this.parseJson(summary.quiz),

          interviewQuestions:
            this.parseJson(
              summary.interviewQuestions
            )

        }))

      );

  }


  // =====================================================
  // Generate New Quiz
  // =====================================================

  generateQuiz(
    summaryId: number,
    questionCount: number = 10
  ): Observable<QuizQuestion[]> {

    return this.http.post<QuizQuestion[]>(
      `${this.summaryUrl}/${summaryId}/generate-quiz`,
      {
        questionCount
      }
    );

  }


  // =====================================================
  // Export - PDF
  // =====================================================

  downloadPdf(
    id: number
  ): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/pdf`,
      {
        responseType: 'blob'
      }
    );

  }


  // =====================================================
  // Export - Markdown
  // =====================================================

  downloadMarkdown(
    id: number
  ): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/markdown`,
      {
        responseType: 'blob'
      }
    );

  }


  // =====================================================
  // Export - Text
  // =====================================================

  downloadText(
    id: number
  ): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/text`,
      {
        responseType: 'blob'
      }
    );

  }


  // =====================================================
  // JSON Parser
  // =====================================================

  private parseJson<T>(
    value: unknown
  ): T {

    // Null / undefined

    if (value == null) {

      return [] as T;

    }


    // Already an array

    if (Array.isArray(value)) {

      return value as T;

    }


    // JSON string

    if (typeof value === 'string') {

      try {

        return JSON.parse(value) as T;

      } catch {

        console.error(
          'Unable to parse JSON:',
          value
        );

        return [] as T;

      }

    }


    // Already an object

    return value as T;

  }

}