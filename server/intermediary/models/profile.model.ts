
// DEPENDENCIES
import * as mongoose from 'mongoose';

// defines the user schema model that will be the base format
// for the user collection
const ProfileSchema = new mongoose.Schema({
    modelYML: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

// adds the schema as a collection
mongoose.model('profile', ProfileSchema);