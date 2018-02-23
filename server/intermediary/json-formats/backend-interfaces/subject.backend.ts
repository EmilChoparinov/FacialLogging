import { INote } from './note.backend';
import { IUser } from './user.backend';

export interface ISubject {
    name: string;
    notes: Array<INote>;
    user: IUser;
    details: string;
}

export class Subject implements ISubject {
    name: string;
    notes: INote[];
    user: IUser;
    details: string;
}
