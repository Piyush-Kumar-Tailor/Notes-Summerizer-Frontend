import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFile } from './selected-file';

describe('SelectedFile', () => {
  let component: SelectedFile;
  let fixture: ComponentFixture<SelectedFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedFile],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
