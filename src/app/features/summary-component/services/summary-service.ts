import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { ApiResponse } from '../../upload-component/models/upload-model';
import { Summary } from '../models/summary-model';
import { HistoryItem } from '../../history-component/models/history-model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private readonly http = inject(HttpClient);

  private readonly historyUrl =
    `${environment.apiUrl}/history`;
    

  private readonly summaryUrl =
    `${environment.apiUrl}/summaries`;

  // ===========================
  // History
  // ===========================

  getHistory(): Observable<ApiResponse<HistoryItem[]>> {

    return this.http.get<ApiResponse<HistoryItem[]>>(
      this.historyUrl
    );

  }

  deleteHistory(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.historyUrl}/${id}`
    );

  }

  // ===========================
  // Summary
  // ===========================

  getSummary(id: number): Observable<Summary> {

    return this.http
      .get<Summary>(`${this.summaryUrl}/${id}`)
      .pipe(

        map(summary => ({

          ...summary,

          keyPoints: this.parseJson(summary.keyPoints),

          flashcards: this.parseJson(summary.flashcards),

          quiz: this.parseJson(summary.quiz),

          interviewQuestions: this.parseJson(summary.interviewQuestions)

        }))

      );

  }

  // ===========================
  // Export
  // ===========================

  downloadPdf(id: number): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/pdf`,
      {
        responseType: 'blob'
      }
    );

  }

  downloadMarkdown(id: number): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/markdown`,
      {
        responseType: 'blob'
      }
    );

  }

  downloadText(id: number): Observable<Blob> {

    return this.http.get(
      `${this.summaryUrl}/${id}/text`,
      {
        responseType: 'blob'
      }
    );

  }

  // ===========================
  // Helper
  // ===========================

  private parseJson<T>(value: unknown): T {

    if (value == null) {
      return [] as T;
    }

    if (Array.isArray(value)) {
      return value as T;
    }

    if (typeof value === 'string') {

      try {

        return JSON.parse(value) as T;

      } catch {

        console.error('Unable to parse JSON:', value);

        return [] as T;

      }

    }

    return value as T;

  }

}