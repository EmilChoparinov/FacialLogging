import * as mongoose from 'mongoose';
import { IProfile } from '../backend-interfaces/profile.backend';

export interface IProfileModel extends IProfile, mongoose.Document {

}
