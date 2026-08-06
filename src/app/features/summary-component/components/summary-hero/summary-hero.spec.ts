import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryHero } from './summary-hero';

describe('SummaryHero', () => {
  let component: SummaryHero;
  let fixture: ComponentFixture<SummaryHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryHero],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
