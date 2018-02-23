
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
import { MICROSERVICE } from '../config/init';


// wraps all currently used models in a quick lookup object
const models = {
    User: mongoose.model<IUserModel>('user')
}

/**
 * master login and registration controller
 */
export const LoginRegController = {

    /**
     * checks the database to find if a given key value pair exists in the collection User
     * @param key the key to use to find if exists
     * @param value the value to use to find if use exits in the database
     */
    hasType: (key: string, value: any, callback: (success: boolean) => void) => {

        // initalize an empty object to build a key value pair
        const keyValue = {};
        keyValue[key] = value;
        models.User.findOne(keyValue, (err, res) => {
            if (!res) {
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    findUser: (req: express.Request, res: express.Response) => {
        models.User.findOne({ name: req.params.name }, (err, user) => {
            if (user) {
                res.json(new ServerMessage(true, user));
            } else {
                res.json(new ServerMessage(false, user));
            }
        });
    },

    /**
     * checks session for a given values
     * @param value value to check
     */
    checkSessionFor: (req: express.Request, res: express.Response, value: string) => {
        if (req.session[value]) {
            res.json(new ServerMessage(true, { message: `${value} exists in session` }));
        } else {
            res.json(new ServerMessage(false, { message: `${value} does not exist in session` }));
        }
    },

    /**
     * registers a user. sends the given images to the python backend
     */
    addUser: (req: express.Request, res: express.Response) => {

        // build a simple container that will hold the image array
        const container: IImageContainer = new ImageContainer(req.body.images);

        // sends the post request to the python backend with the given images,
        // requesting that there be made a new model profile
        HttpClient.post(`${MICROSERVICE}api/ml/build`, { form: container }, (err, response, body) => {

            // the python backend may send errors that will trigger the frontend to login,
            // bug to later be fixed!
            try {
                body = JSON.parse(body);
                const newUser = new models.User({ modelYML: body.modelYML, name: req.body.name });
                newUser.save((err, product) => {
                    if (err) {
                        res.json(new ServerMessage(false, err));
                        throw err;
                    } else {
                        req.session._id = product._id;
                        res.json(new ServerMessage(true, product));
                    }
                });
            } catch (e) {
                console.log('error occured', e);
            }
        });
    },

    /**
     * verifies a given users attempt, sends the given images to a python backend
     */
    verifyUser: (req: express.Request, res: express.Response) => {
        const attemptsContainer: IImageContainer = new ImageContainer(req.body.images);

        // finds the user, if the user exists verify,
        // route impossible to be no user due to the api call
        // that happens before calling this in the frontend
        models.User.findOne({ name: req.body.name }, (err, user) => {
            HttpClient.post(`${MICROSERVICE}api/ml/verify`, {
                form: {
                    images: attemptsContainer.images,
                    modelYML: user.modelYML
                }
            }, (err, response, body) => {
                try {
                    body = JSON.parse(body);
                    console.log(body);
                    if (body.success) {
                        req.session._id = user._id;
                    }
                    res.json(new ServerMessage(body.success, null));
                } catch (e) {
                    console.log('error occurred', e);
                    res.json(new ServerMessage(false, null));
                }
            });
        });
    },

    /**
     * clears session for a given value
     * @param value what to clear session for
     */
    clearSessionFor: (req: express.Request, res: express.Response, value: string) => {
        if (req.session[value]) {
            delete req.session[value];
            res.json(new ServerMessage(true, { message: 'session cleared successfully' }));
        } else {
            res.json(new ServerMessage(false, { message: 'value is does not exist in session' }))
        }
    },
};
