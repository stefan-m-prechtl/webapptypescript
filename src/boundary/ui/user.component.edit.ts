import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { User } from '../../domain/user';



@customElement('user-edit')
export default class UserComponentEdit extends LitElement {
    @property()
    user: User | null = null;


    render() {
        return html`
    <p>Aktueller Nutzer</p>
    <ul>
        <li>Kennung : ${this.user?.name}</li>
        <li>Vorname : ${this.user?.firstname}</li>
        <li>Nachname : ${this.user?.lastname}</li>
    </u>
    `;
    }
}


