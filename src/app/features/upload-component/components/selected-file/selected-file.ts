import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-file.html',
  styleUrl: './selected-file.css'
})
export class SelectedFileComponent {

  @Input({ required: true })
  file!: File;

  @Input()
  uploading = false;

  @Output()
  remove = new EventEmitter<void>();

  @Output()
  upload = new EventEmitter<void>();

  get fileSize(): string {

    const size = this.file.size;

    if (size < 1024) {
      return `${size} Bytes`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;

  }

}