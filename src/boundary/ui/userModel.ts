import { User } from "../../domain/user";

export default class Model {

    data: User[];
    _selectedUser: User | null;

    constructor() {
        this.data = [];
        this._selectedUser = null;
    }

    reset() {
        this.data = [];
    }

    addUser(user: User): void {
        this.data.push(user);
    }

    removeUser(user: User): void {
        const index = this.data.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.data.splice(index, 1);
        }
    }

    selectUser(userid: number) {
        const user = this.data.find(u => u.id === userid);
        if (user) {
            this._selectedUser = user;
        }
    }



    get selectedUser(): User | null {
        return this._selectedUser;
    }

    set selectedUser(currentUser: User) {
        this._selectedUser = currentUser;
    }


}