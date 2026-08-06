import { Component, Input } from '@angular/core';

import { Summary } from '../../models/summary-model';

import { RouterLink } from '@angular/router';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-summary-hero',
  standalone: true,
  imports: [RouterLink , DatePipe],
  templateUrl: './summary-hero.html',
  styleUrl: './summary-hero.css'
})
export class SummaryHeroComponent {

  @Input({ required: true })
  summary!: Summary;

  
  
convertMsToTime(time: string): string {

  const milliseconds = Number(time.replace("ms", "").trim());

  if (isNaN(milliseconds)) {
    return "00:00";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  if(totalSeconds > 60){
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} Minutes`;

  }




  return `${String(totalSeconds).padStart(2, '0')} Seconds`;

}
}