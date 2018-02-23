import { Component, OnInit } from '@angular/core';
import { NoteSubjectService } from '../../../services/dashboard/note-subject.service';
import { INote } from '../../../interfaces/note';
import { ActivatedRoute } from '@angular/router';
import { ISubject } from '../../../interfaces/subject';
import { Subject } from '../../../classes/subject';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css']
})
export class ShowNotesComponent implements OnInit {

  notes: Array<INote>;
  subject: ISubject;
  currentSubjectId: string;
  constructor(private _router: ActivatedRoute, private _noteSubService: NoteSubjectService) {
    this.notes = [];
    this.subject = new Subject();
    this.subject.details = 'no details here! gotta click on the subject icons first!';
    this.currentSubjectId = '';
  }

  ngOnInit() {
    this._noteSubService.currentNotes.subscribe((notes) => {
      this.notes = notes;
    });
    this._router.paramMap.subscribe((params) => {
      this.currentSubjectId = params.get('subjectId');
      this._noteSubService.getSubject(this.currentSubjectId, (response) => {
        this.subject = response.output;
      });
      this._noteSubService.getNotes(this.currentSubjectId, (response) => {
        if (!response.success) {
          console.log(response);
        }
        this.notes = response.output;
        console.log(this.notes);
      });
    });
  }

}
