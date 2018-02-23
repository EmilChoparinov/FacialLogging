import { IProfile } from '../interfaces/profile';
import { IUser } from '../interfaces/user';

export class Profile implements IProfile {
    _id: string;
    modelYML: string;
    user: IUser;
}
