
// DEPENDENCIES
import { IUser } from '../interfaces/user';
import { IProfile } from '../interfaces/profile';
import { ISubject } from '../interfaces/subject';


/**
 * base user class that implements base IUser
 */
export class User implements IUser {
    _id: string;
    message?: string;
    profile: IProfile;
    subjects: ISubject[];
    name: string;
}
