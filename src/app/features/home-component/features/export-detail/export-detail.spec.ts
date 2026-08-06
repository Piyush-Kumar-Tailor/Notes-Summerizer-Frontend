import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDetail } from './export-detail';

describe('ExportDetail', () => {
  let component: ExportDetail;
  let fixture: ComponentFixture<ExportDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
