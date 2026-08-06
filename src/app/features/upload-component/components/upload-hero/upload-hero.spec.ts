import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHero } from './upload-hero';

describe('UploadHero', () => {
  let component: UploadHero;
  let fixture: ComponentFixture<UploadHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadHero],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
