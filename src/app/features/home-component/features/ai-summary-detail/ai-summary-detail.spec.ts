import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSummaryDetail } from './ai-summary-detail';

describe('AiSummaryDetail', () => {
  let component: AiSummaryDetail;
  let fixture: ComponentFixture<AiSummaryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSummaryDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AiSummaryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
