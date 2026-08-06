import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryCard } from './retry-card';

describe('RetryCard', () => {
  let component: RetryCard;
  let fixture: ComponentFixture<RetryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RetryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
