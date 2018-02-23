
// DEPENDENCIES
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as HttpClient from 'request';

// BACKEND INTERFACES
import { ServerMessage, IServerMessage } from './../json-formats/backend-interfaces/server-message.backend';
import { IUser, User } from '../json-formats/backend-interfaces/user.backend';
import { IImageContainer, ImageContainer } from '../json-formats/backend-interfaces/image-container.backend';

// MONGO INTERFACES
import { IUserModel } from '../json-formats/mongo-interfaces/user.mongo';
import { INoteModel } from '../json-formats/mongo-interfaces/note.mongo';
import { IProfileModel } from '../json-formats/mongo-interfaces/profile.mongo';
import { ISubjectModel } from '../json-formats/mongo-interfaces/subject.mongo';


// wraps all currently used models in a quick lookup object
const models = {
    User: mongoose.model<IUserModel>('user'),
    Note: mongoose.model<INoteModel>('note'),
    Profile: mongoose.model<IProfileModel>('profile'),
    Subject: mongoose.model<ISubjectModel>('subject')
};


export const DevController = {

    /**
     * FOR DEVELOPMENT USE ONLY. This route will automatically log any
     * requests into an account, or create one occordingly
     */
    login: (req: express.Request, res: express.Response) => {
        models.User.findOne({ name: req.body.name }, (err, user) => {
            if (err) {
                throw err;
            } else {
                if (user) {
                    req.session._id = user._id;
                    res.json(new ServerMessage(true, user));
                } else {
                    const newUser = new models.User(req.body);
                    const newProfile = new models.Profile({ modelYML: 'model will be here' });
                    newProfile.save((err, product) => {
                        newUser.profile = product._id;
                        newUser.save((err, product) => {
                            if (err) {
                                throw err;
                            } else {
                                req.session._id = product._id;
                                res.json(new ServerMessage(true, product));
                            }
                        });
                    });
                }
            }
        });
    },

    getModel: (req: express.Request, res: express.Response) => {
        models.User.findById(req.params.id).populate('profile').exec((err, user) => {
            if (err) {
                res.json(new ServerMessage(false, err));
                throw err;
            } else {
                res.json(new ServerMessage(true, user));
            }
        });
    }
};
