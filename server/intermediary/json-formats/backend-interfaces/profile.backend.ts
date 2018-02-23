import { IUser } from './user.backend';

export interface IProfile {
    modelYML: string;
    user: IUser;
}

export class Profile implements IProfile {
    modelYML: string;
    user: IUser;
}
