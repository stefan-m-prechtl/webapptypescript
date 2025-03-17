import { User } from "../../domain/user";

export default class Model {
  private _allUser: User[];
  private _selectedUser: User | null;

  constructor() {
    this._allUser = [];
    this._selectedUser = null;
  }

  reset() {
    this._allUser = [];
  }

  addUser(user: User): void {
    this._allUser.push(user);
  }

  removeUser(user: User): void {
    const index = this._allUser.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this._allUser.splice(index, 1);
    }
  }

  selectUser(userid: number) {
    const user = this._allUser.find((u) => u.id === userid);
    if (user) {
      this._selectedUser = user;
    }
  }

  get allUser() {
    return this._allUser;
  }

  get selectedUser(): User | null {
    return this._selectedUser;
  }

  set selectedUser(currentUser: User) {
    this._selectedUser = currentUser;
  }
}
