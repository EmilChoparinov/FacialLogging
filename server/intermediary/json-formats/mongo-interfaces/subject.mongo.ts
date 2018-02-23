import * as mongoose from 'mongoose';
import { ISubject } from '../backend-interfaces/subject.backend';

export interface ISubjectModel extends ISubject, mongoose.Document {

}
