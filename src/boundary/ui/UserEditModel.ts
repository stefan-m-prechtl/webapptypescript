import { User } from '../../domain/User';

export default class UserEditModel {
    private _currentUser: User;

    constructor() {
        this._currentUser = User.create("","","");
      }

    get currentUser() {
        return this._currentUser;
    }

    set currentUser(user: User) {
        this._currentUser = JSON.parse(JSON.stringify(user));
    }

}