import { IUser } from './user';

export interface IProfile {
    _id: string;
    modelYML: string;
    user: IUser;
}
