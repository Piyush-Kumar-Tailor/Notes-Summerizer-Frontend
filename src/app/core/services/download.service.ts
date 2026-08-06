import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  download(blob: Blob, fileName: string): void {

    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');

    anchor.href = url;

    anchor.download = fileName;

    anchor.click();

    anchor.remove();

    window.URL.revokeObjectURL(url);

  }

}