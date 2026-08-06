import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCards } from './flash-cards';

describe('FlashCards', () => {
  let component: FlashCards;
  let fixture: ComponentFixture<FlashCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashCards],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
