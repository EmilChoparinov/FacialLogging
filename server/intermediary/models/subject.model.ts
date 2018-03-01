
// DEPENDENCIES
import * as mongoose from 'mongoose';

// defines the user schema model that will be the base format 
// for the user collection
const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name of subject is required'],
        maxlength: [40, 'subject name cannot be longer than 40 characters']
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'note'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    details: {
        type: String,
        required: [true, 'details are required'],
        minlength: [5, 'details must be at least 5 characters long']
    }
}, { timestamps: true, usePushEach: true });

// adds the schema as a collection
mongoose.model('subject', SubjectSchema);