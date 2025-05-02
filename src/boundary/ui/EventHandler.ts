import { User } from '../../domain/User';

export class EventHandler extends EventTarget {

    emitEventEditUser(user: User) {
        
        const event = new CustomEvent('editUser', { detail: user });
        console.log("emitEventEditUser:" + user.name)
        this.dispatchEvent(event);
    }
}