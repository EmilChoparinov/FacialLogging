import { ISubject } from './subject';

export interface INote {
    _id: string;
    content: string;
    subject: ISubject;
}
