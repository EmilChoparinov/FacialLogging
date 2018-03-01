import { TestBed, inject } from '@angular/core/testing';

import { NoteSubjectService } from './note-subject.service';

describe('NoteSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteSubjectService]
    });
  });

  it('should be created', inject([NoteSubjectService], (service: NoteSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
