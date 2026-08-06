import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-points',
  standalone: true,
  imports: [],
  templateUrl: './key-points.html',
  styleUrl: './key-points.css'
})
export class KeyPointsComponent {

  @Input({ required: true })
  keyPoints: string[]= [];

  

  

}