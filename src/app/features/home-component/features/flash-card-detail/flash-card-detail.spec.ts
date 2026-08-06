import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashCardDetail } from './flash-card-detail';

describe('FlashCardDetail', () => {
  let component: FlashCardDetail;
  let fixture: ComponentFixture<FlashCardDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashCardDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashCardDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
