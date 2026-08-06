import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-drop.html',
  styleUrl: './drag-drop.css'
})
export class DragDropComponent {

  @Output() fileSelected = new EventEmitter<File>();

  readonly isDragging = signal(false);

  readonly errorMessage = signal('');

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {

    event.preventDefault();

    this.isDragging.set(false);

    const file = event.dataTransfer?.files[0];

    if (file) {
      this.validateFile(file);
    }

  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.validateFile(input.files[0]);
    }

  }

  private validateFile(file: File): void {

    this.errorMessage.set('');

    if (file.type !== 'application/pdf') {

      this.errorMessage.set('Only PDF files are allowed.');

      return;

    }

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {

      this.errorMessage.set('Maximum file size is 20 MB.');

      return;

    }

    this.fileSelected.emit(file);

  }

}