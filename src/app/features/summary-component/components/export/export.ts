import { Component, Input, inject } from '@angular/core';

import { Summary } from '../../models/summary-model';

import { ExportService } from '../../../../shared/services/export.service';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [],
  templateUrl: './export.html',
  styleUrl: './export.css'
})
export class ExportComponent {

  private readonly exportService = inject(ExportService);

  @Input({ required: true })
  summary!: Summary;

  downloadPdf(): void {

    this.exportService.exportPdf(this.summary);

  }

  downloadDocx(): void {

    this.exportService.exportDocx(this.summary);

  }

  downloadTxt(): void {

    this.exportService.exportTxt(this.summary);

  }

  copySummary(): void {

    this.exportService.copySummary(this.summary);

  }

  async shareSummary(): Promise<void> {

    await this.exportService.shareSummary(this.summary);

  }

}