import { User } from '../../domain/user';

export default class Model {
  private _allUser: User[];
  private _selectedUser: Map<number, User>;

  constructor() {
    this._allUser = [];
    this._selectedUser = new Map<number, User>();
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
      this._selectedUser.set(userid, user);
    }
  }

  selectAll() {
    this._allUser.forEach((user) => this._selectedUser.set(user.id, user));
  }
  unselectAll() {
    this._selectedUser.clear();
  }

  selectOne(userid: number) {
    const user = this._allUser.find((u) => u.id === userid)!;
    this._selectedUser.set(userid, user);
  }

  unselectOne(userid: number) {
    this._selectedUser.delete(userid);
  }

  get allUser() {
    return this._allUser;
  }

  get selectedUser(): Map<number, User> {
    return this._selectedUser;
  }
}
