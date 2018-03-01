import { INote } from './note';
import { IUser } from './user';

export interface ISubject {
    _id: string;
    name: string;
    notes: Array<INote>;
    user: IUser;
    details: string;
}
