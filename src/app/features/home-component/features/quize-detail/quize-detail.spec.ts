import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizeDetail } from './quize-detail';

describe('QuizeDetail', () => {
  let component: QuizeDetail;
  let fixture: ComponentFixture<QuizeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
