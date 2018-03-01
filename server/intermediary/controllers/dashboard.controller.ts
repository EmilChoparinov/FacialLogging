
// DEPENDENCIES
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as HttpClient from 'request';
import { MICROSERVICE } from '../config/init';

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
    Subject: mongoose.model<ISubjectModel>('subject')
};

/**
 * master login and registration controller
 */
export const DashboardController = {
    postNote: (req: express.Request, res: express.Response) => {
        const newNote = new models.Note(req.body);
        models.Subject.findById(req.params.subjectId, (err, subject) => {
            if (subject) {
                newNote.subject = subject._id;
                newNote.save((err, product) => {
                    if (err) {
                        console.log(err);
                        res.json(new ServerMessage(false, err));
                    } else {
                        subject.notes.push(product._id);
                        subject.save();
                        res.json(new ServerMessage(true, product));
                    }
                });
            } else {
                res.json(new ServerMessage(false, subject));
            }
        });
    },

    postSubject: (req: express.Request, res: express.Response) => {
        const newSubject = new models.Subject(req.body);
        console.log(req.body);
        models.User.findById({ _id: req.params.userId }, (err, user) => {
            console.log(err, user);
            if (user) {
                newSubject.user = user._id;
                user.subjects.push(newSubject._id);
                newSubject.save((err, product) => {
                    if (err) {
                        console.log(err);
                        res.json(new ServerMessage(false, err));
                    } else {
                        user.save();
                        res.json(new ServerMessage(true, product));
                    }
                });
            } else {
                console.log('no user');
                res.json(new ServerMessage(false, null));
            }
        });
    },

    getSubjects: (req: express.Request, res: express.Response) => {
        models.User.findById(req.params.userId).populate('subjects').exec((err, user) => {
            if (err) {
                console.log(err);
                res.json(new ServerMessage(false, err));
            } else {
                res.json(new ServerMessage(true, user.subjects));
            }
        });
    },

    getSubject: (req: express.Request, res: express.Response) => {
        models.Subject.findById(req.params.subjectId, (err, subject) => {
            if (err) {
                console.log(err);
                res.json(new ServerMessage(false, err));
            } else {
                res.json(new ServerMessage(true, subject));
            }
        });
    },

    getNotes: (req: express.Request, res: express.Response) => {
        models.Subject.findById(req.params.subjectId).populate('notes').exec((err, subject) => {
            if (err) {
                console.log(err);
                res.json(new ServerMessage(false, err));
            } else {
                res.json(new ServerMessage(true, subject.notes));
            }
        });
    }
};
