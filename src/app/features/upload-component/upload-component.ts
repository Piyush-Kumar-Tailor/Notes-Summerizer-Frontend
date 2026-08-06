import {
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  interval,
  switchMap,
  takeWhile
} from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UploadHeroComponent } from './components/upload-hero/upload-hero';
import { DragDropComponent } from './components/drag-drop/drag-drop';
import { SelectedFileComponent } from './components/selected-file/selected-file';
import { UploadProgress } from './components/upload-progress/upload-progress';
import { UploadSuccessComponent } from './components/upload-success/upload-success';

import { UploadService } from './services/upload-service';

import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    UploadHeroComponent,
    DragDropComponent,
    SelectedFileComponent,
    UploadSuccessComponent,
    UploadProgress
  ],
  templateUrl: './upload-component.html',
  styleUrl: './upload-component.css'
})
export class UploadComponent {

  private readonly router = inject(Router);

  private readonly uploadService = inject(UploadService);

  private readonly toast = inject(ToastService);

  private readonly destroyRef = inject(DestroyRef);

  readonly selectedFile = signal<File | null>(null);

  readonly isUploading = signal(false);

  readonly uploadProgress = signal(0);

  readonly uploadCompleted = signal(false);

  readonly error = signal('');

  private summaryId: number | null = null;


  onFileSelected(file: File): void {

    this.selectedFile.set(file);

    this.uploadCompleted.set(false);

    this.uploadProgress.set(0);

    this.error.set('');

    this.summaryId = null;

  }

  removeFile(): void {

    if (this.isUploading()) {
      return;
    }

    this.selectedFile.set(null);

    this.uploadProgress.set(0);

    this.uploadCompleted.set(false);

    this.isUploading.set(false);

    this.error.set('');

    this.summaryId = null;

  }

  uploadFile(): void {

    if (this.isUploading()) {
      return;
    }

    const file = this.selectedFile();

    if (!file) {
      return;
    }

    this.error.set('');

    this.uploadCompleted.set(false);

    this.uploadProgress.set(0);

    this.isUploading.set(true);

    const formData = new FormData();

    formData.append('file', file);

    this.uploadService
      .uploadFile(formData)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: response => {

          this.pollUploadStatus(
            response.data.uploadId
          );

        },

        error: error => {

          console.error(error);

          this.isUploading.set(false);

          this.error.set(
            error?.error?.message ??
            'Upload failed.'
          );

          this.toast.show(
            this.error(),
            'error'
          );

        }

      });

  }

  private pollUploadStatus(uploadId: string): void {

    interval(2000)
      .pipe(

        switchMap(() =>
          this.uploadService.getUpload(uploadId)
        ),

        takeWhile(
          response =>
            response.data.status !== 'COMPLETED' &&
            response.data.status !== 'FAILED',
          true
        ),

        takeUntilDestroyed(this.destroyRef)

      )
      .subscribe({

        next: response => {

          const upload = response.data;

          switch (upload.status) {

            case 'PROCESSING':


              break;

            case 'COMPLETED':

              if (upload.summaryId == null) {

                this.isUploading.set(false);

                this.error.set(
                  'Summary ID was not returned.'
                );

                this.toast.show(
                  this.error(),
                  'error'
                );

                return;

              }

              this.summaryId = upload.summaryId;

              this.uploadProgress.set(100);

              this.isUploading.set(false);

              this.uploadCompleted.set(true);

              this.toast.show(
                'Summary generated successfully.',
                'success'
              );


              break;

            case 'FAILED':

              this.isUploading.set(false);

              this.error.set(
                'Document processing failed.'
              );

              this.toast.show(
                this.error(),
                'error'
              );

              break;

          }

        },

        error: error => {

          console.error(error);

          this.isUploading.set(false);

          this.error.set(
            'Unable to check processing status.'
          );

          this.toast.show(
            this.error(),
            'error'
          );

        }

      });

  }

  goToSummary(): void {

    if (this.summaryId == null) {
      return;
    }

    if (this.uploadCompleted() == true) {
      this.router.navigate([
        '/summary',
        this.summaryId
      ]);

    }



  }

}