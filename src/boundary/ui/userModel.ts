import { User } from "../../domain/user";

export default class Model {

    private data: User[];
    
    constructor() {
        this.data = [];
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
            this.data.splice(index,1);
        }
    }
}