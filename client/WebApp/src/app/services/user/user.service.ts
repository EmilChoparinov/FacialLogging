// INJECTIONS
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// JSON CLASSES & INTERFACES
import { ServerMessage } from './../../classes/server-message';
import { IServerMessage } from './../../interfaces/server-message';
import { IUser } from './../../interfaces/user';
import { User } from '../../classes/user';

// SERVICE DEPENDENCIES
import * as uriBuilder from 'build-url';
import { ILoginContainer } from '../../interfaces/login-container';

/**
 * User Service class is used to do api classes to the backend
 * Contains User data and other information
 */
@Injectable()
export class UserService {

  /**
   * base constructor
   * @param _http injectable
   */
  constructor(private _http: HttpClient) { }


  /**
   * build a uri based on the current classes requests
   * @param query uri query location on local hostname
   * @returns {string} uri location
   */
  private _localAPIBuild(query: string): string {
    return uriBuilder('', {
      path: `api/exp/${query}`
    });
  }

  /**
   * queries the backend if the user is currently logged in or not
   * @param {callback: (res: IServerMessage)} callback callback to run after backend response
   */
  ensureUserIsLoggedIn(callback: (res: IServerMessage<{ message: string }>) => void): void {
    const uri = this._localAPIBuild('is-logged');
    this._http.get(uri).subscribe((response: IServerMessage<{ message: string }>) => callback(response));
  }

  logoutUser(callback: (res: IServerMessage<{ message: string }>) => void): void {
    const uri = this._localAPIBuild('logout');
    this._http.get(uri).subscribe((response: IServerMessage<{ message: string }>) => callback(response));
  }

  submitName(user: IUser, callback: (res: IServerMessage<IUser>) => void): void {
    const uri = this._localAPIBuild(`find-user/${user.name}`);
    this._http.get(uri).subscribe((response: IServerMessage<IUser>) => {
      callback(response);
    });
  }

  verifyUser(container: ILoginContainer, callback: (res: IServerMessage<IUser>) => void): void {
    const uri = this._localAPIBuild(`verify`);
    this._http.post(uri, container).subscribe((response: IServerMessage<IUser>) => {

    });
  }

  newUser(container: ILoginContainer, callback: (res: IServerMessage<IUser>) => void): void {
    const uri = this._localAPIBuild(`add-user`);
    this._http.post(uri, container).subscribe((response: IServerMessage<IUser>) => {

    });
  }








  // submitUser(user: IUser, formData, callback: (res: IServerMessage<IUser>) => void): void {
  //   const uri = this._localAPIBuild('submit-user');
  //   // this._http.post(uri, user, formData).subscribe((response: IServerMessage<{ message: string }>) => callback(response));
  // }

  // /**
  //  * register a user to the database
  //  * @param {IUser} user user data to attempt to add to the database
  //  */
  // registerUser(user: IUser, callback: (res: IServerMessage<IUser>) => void): void {
  //   const uri = this._localAPIBuild('register');
  //   this._http.post(uri, user).subscribe((response: IServerMessage<IUser>) => callback(response));
  // }

  // /**
  //  * login a user to the database
  //  * @param user user data to attempt login
  //  * @param callback processing to be done after backend response
  //  */
  // loginUser(user: IUser, callback: (res: IServerMessage<IUser>) => void): void {
  //   const uri = this._localAPIBuild('login');
  //   this._http.post(uri, user).subscribe((response: IServerMessage<IUser>) => callback(response));
  // }

  // sendJson(json: any) {
  //   console.log('in send json');
  //   const uri = this._localAPIBuild('testing');
  //   this._http.post(uri, json).subscribe((response) => {
  //     console.log(response);
  //     console.log(uri);
  //   });
  // }

}