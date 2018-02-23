import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { ISubject } from '../../../interfaces/subject';
import { Subject } from '../../../classes/subject';
import { NoteSubjectService } from '../../../services/dashboard/note-subject.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subject-nav',
  templateUrl: './subject-nav.component.html',
  styleUrls: ['./subject-nav.component.css']
})
export class SubjectNavComponent implements OnInit {

  subject: ISubject;
  subjects: Array<ISubject>;
  constructor(public dialog: MatDialog, private _noteSubService: NoteSubjectService, private _userService: UserService,
    private _router: Router) {
    this.subject = new Subject();
    this.subjects = [];
  }

  ngOnInit() {
    this._userService.loggedUser.subscribe((value) => {
      if (value) {
        this._noteSubService.getSubjects(
          value, (response) => {
            if (!response.success) {
              console.log(response);
            }
            this.subjects = response.output;
          }
        );
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '500px',
      data: this.subject
    });

    dialogRef.afterClosed().subscribe(() => this._noteSubService.addSubject(
      this._userService.loggedUser.getValue(), this.subject, (response) => {
        if (!response.success) {
          console.log(response);
        }
        this.subjects.push(response.output);
      }
    ));
  }

  navSubject(subjectId: number): void {
    this._router.navigateByUrl(`/dashboard/subject/${subjectId}`);
  }
}
