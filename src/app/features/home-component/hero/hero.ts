import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  readonly heroStats = [
    {
      value: '10K+',
      label: 'PDFs Summarized'
    },
    {
      value: '98%',
      label: 'Accuracy'
    },
    {
      value: '<5 sec',
      label: 'Average Time'
    }
  ];

}