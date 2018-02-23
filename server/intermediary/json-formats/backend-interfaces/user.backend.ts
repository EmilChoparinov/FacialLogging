import { ISubject } from './subject.backend';
import { IProfile } from './profile.backend';


/**
 * base user class that implements base IUser
 */
export class User implements IUser {
    profile: IProfile;
    subjects: ISubject[];
    name: string;
}

/**
 * base implementation of IUser
 */
export interface IUser {
    name: string;
    profile: IProfile;
    subjects: Array<ISubject>;
}
