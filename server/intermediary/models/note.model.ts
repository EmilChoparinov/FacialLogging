
// DEPENDENCIES
import * as mongoose from 'mongoose';

// defines the note schema model that will be the base format
// for the note collection
const NoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'content is required']
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: [true, 'must have a subject']
    }
}, { timestamps: true });

// adds the schema as a collection
mongoose.model('note', NoteSchema);