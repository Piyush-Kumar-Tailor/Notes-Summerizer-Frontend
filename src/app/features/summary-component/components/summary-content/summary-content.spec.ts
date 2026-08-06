import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryContent } from './summary-content';

describe('SummaryContent', () => {
  let component: SummaryContent;
  let fixture: ComponentFixture<SummaryContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryContent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
