import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDetail } from './notes-detail';

describe('NotesDetail', () => {
  let component: NotesDetail;
  let fixture: ComponentFixture<NotesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
