import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  ApiResponse,
  UploadResponse,
  UploadDetailsResponse
} from '../models/upload-model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/uploads`;;

  /**
   * Upload a PDF file
   */
  uploadFile(
    formData: FormData
  ): Observable<ApiResponse<UploadResponse>> {

    return this.http.post<ApiResponse<UploadResponse>>(
      this.apiUrl,
      formData
    );

  }

  /**
   * Get upload processing status
   */
  getUpload(
    uploadId: string
  ): Observable<ApiResponse<UploadDetailsResponse>> {

    return this.http.get<ApiResponse<UploadDetailsResponse>>(
      `${this.apiUrl}/${uploadId}`
    );

  }

}