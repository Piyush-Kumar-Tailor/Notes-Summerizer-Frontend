import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './upload-success.html',
  styleUrl: './upload-success.css'
})
export class UploadSuccessComponent {

  @Output()
  viewSummary = new EventEmitter<void>();

}