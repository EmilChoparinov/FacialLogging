import { ISubject } from './subject.backend';

export interface INote {
    content: string;
    subject: ISubject;
}

export class Note implements INote {
    content: string;
    subject: ISubject;
}
