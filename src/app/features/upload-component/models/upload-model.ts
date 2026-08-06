export type ProcessingStatus =
  | 'UPLOADED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data: T;

}

export interface UploadResponse {

  uploadId: string;

  fileName: string;

  status: ProcessingStatus;

}

export interface UploadDetailsResponse {

  id: string;

  originalFileName: string;

  fileSize: number;

  status: ProcessingStatus;

  summaryId: number | null;

  createdAt: string;

}