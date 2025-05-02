import { User } from '../../domain/User';

export default class UserListModel {
  private _allUser: User[];
  private _selectedUsers: Map<number, User>;

  constructor() {
    this._allUser = [];
    this._selectedUsers = new Map<number, User>();
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
      this._selectedUsers.set(userid, user);
    }
  }

  selectAll() {
    this._allUser.forEach((user) => this._selectedUsers.set(user.id, user));
  }
  unselectAll() {
    this._selectedUsers.clear();
  }

  selectOne(userid: number) {
    const user = this._allUser.find((u) => u.id === userid)!;
    this._selectedUsers.set(userid, user);
  }

  unselectOne(userid: number) {
    this._selectedUsers.delete(userid);
  }

  selectedUser(userid: number): User | undefined {
    const result = this._selectedUsers.get(userid);
    return result;
  }

  get allUser() {
    return this._allUser;
  }

  get selectedUsers(): Map<number, User> {
    return this._selectedUsers;
  }

  
}
