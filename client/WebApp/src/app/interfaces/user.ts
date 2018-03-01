import { IProfile } from './profile';
import { ISubject } from './subject';


/**
 * base implementation of IUser
 */
export interface IUser {
    _id: string;
    name: string;
    message?: string;
    profile: IProfile;
    subjects: Array<ISubject>;
}
