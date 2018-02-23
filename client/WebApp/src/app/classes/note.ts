import { INote } from '../interfaces/note';
import { ISubject } from '../interfaces/subject';

export class Note implements INote {
    _id: string;
    content: string;
    subject: ISubject;
}
