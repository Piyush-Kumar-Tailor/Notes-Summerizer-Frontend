import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPoints } from './key-points';

describe('KeyPoints', () => {
  let component: KeyPoints;
  let fixture: ComponentFixture<KeyPoints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyPoints],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyPoints);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
