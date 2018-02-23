import { Component, OnInit } from '@angular/core';
import { NoteSubjectService } from '../../../services/dashboard/note-subject.service';
import { ISubject } from '../../../interfaces/subject';
import { Subject } from '../../../classes/subject';
import { INote } from '../../../interfaces/note';
import { Note } from '../../../classes/note';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  subject: ISubject;
  note: INote;
  constructor(private _noteSubService: NoteSubjectService, private _router: Router) {
    this.subject = new Subject();
    this.subject.name = 'Click a subject';
    this.note = new Note();
  }

  ngOnInit() {
    this._noteSubService.currentSubjectId.subscribe((value) => {
      if (value) {
        this._noteSubService.getSubject(value, (response) => {
          if (!response.success) {
            console.log(response);
          }
          this.subject = response.output;
        });
      }
    });
  }

  addNote(event: any) {
    if (event.code === 'Enter') {
      this._noteSubService.addNote(this.subject._id, this.note, (response) => {
        if (!response.success) {
          console.log(response);
        }
        const temp = this._noteSubService.currentNotes.getValue();
        temp.push(response.output);
        this._noteSubService.currentNotes.next(temp);
        this.note.content = '';
      });
    }
  }

}
