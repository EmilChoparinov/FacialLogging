import { ISubject } from '../interfaces/subject';
import { INote } from '../interfaces/note';
import { IUser } from '../interfaces/user';

export class Subject implements ISubject {
    _id: string;
    name: string;
    notes: INote[];
    user: IUser;
    details: string;
}
