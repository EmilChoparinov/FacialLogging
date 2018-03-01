import * as mongoose from 'mongoose';
import { INote } from '../backend-interfaces/note.backend';

export interface INoteModel extends INote, mongoose.Document {

}