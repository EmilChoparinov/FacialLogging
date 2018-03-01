import { Injectable } from '@angular/core';
import * as uriBuilder from 'build-url';
import { IUser } from '../../interfaces/user';
import { IServerMessage } from '../../interfaces/server-message';
import { ISubject } from '../../interfaces/subject';
import { HttpClient } from '@angular/common/http';
import { INote } from '../../interfaces/note';
import { BehaviorSubject } from 'Rxjs';
import { Subject } from '../../classes/subject';
@Injectable()
export class NoteSubjectService {

  currentSubjectId: BehaviorSubject<string>;
  currentNotes: BehaviorSubject<Array<INote>>;
  constructor(private _http: HttpClient) {
    this.currentSubjectId = new BehaviorSubject('');
    this.currentNotes = new BehaviorSubject([]);
  }

  /**
 * build a uri based on the current classes requests
 * @param query uri query location on local hostname
 * @returns {string} uri location
 */
  private _localAPIBuild(query: string): string {
    return uriBuilder('', {
      path: `api/exp/dash/${query}`
    });
  }

  getSubjects(user: IUser, callback: (response: IServerMessage<Array<ISubject>>) => void): void {
    const uri = this._localAPIBuild(`get-subjects/${user._id}`);
    this._http.get(uri).subscribe((response: IServerMessage<Array<ISubject>>) => {
      console.log(response);
      callback(response);
    });
  }

  addSubject(user: IUser, subject: ISubject, callback: (response: IServerMessage<ISubject>) => void): void {
    const uri = this._localAPIBuild(`post-subject/${user._id}`);
    this._http.post(uri, subject).subscribe((response: IServerMessage<ISubject>) => {
      callback(response);
    });
  }

  getNotes(subjectId: string, callback: (response: IServerMessage<Array<INote>>) => void): void {
    const uri = this._localAPIBuild(`get-notes/${subjectId}`);
    this.currentSubjectId.next(subjectId);
    this._http.get(uri).subscribe((response: IServerMessage<Array<INote>>) => {
      this.currentNotes.next(response.output);
      callback(response);
    });
  }

  addNote(subjectId: string, note: INote, callback: (response: IServerMessage<INote>) => void): void {
    const uri = this._localAPIBuild(`post-note/${subjectId}`);
    this._http.post(uri, note).subscribe((response: IServerMessage<INote>) => {
      callback(response);
    });
  }

  getSubject(subjectId: string, callback: (response: IServerMessage<ISubject>) => void): void {
    const uri = this._localAPIBuild(`get-subject/${subjectId}`);
    this._http.get(uri).subscribe((response: IServerMessage<ISubject>) => {
      callback(response);
    });
  }


}
