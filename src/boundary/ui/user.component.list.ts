import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { User } from '../../domain/user';

@customElement('user-list')
export default class UserComponentList extends LitElement {
    @property()
    users: User[]  = [];

    render() {
        console.log("render user-list")
        console.log(`count users: ${this.users.length}`);
        return html`
        <div class="w3-panel w3-bar" id="actions" hidden>
            <a href="#" class="w3-bar-item w3-button w3-grey" id="actionEdit">Bearbeiten</a>
            <a href="#" class="w3-bar-item w3-button w3-grey" id="actionDelete">Löschen</a>
        </div>
        <div class="w3-panel">
            <table class="w3-table w3-bordered" id="tblUser">
                <thead>
                    <tr class="w3-light-gray">
                        <th><input type="checkbox" id="selectAll"></th>
                        <th>Kennung</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                    </tr>
                </thead>
                <tbody id="tblBody">
                ${this.users.map(
                    (user) => html`<tr data-id="${user.id}">
                      <td><input type="checkbox" class="row-checkbox" /></td>
                      <td>${user.name}</td>
                      <td>${user.firstname}</td>
                      <td>${user.lastname}</td>
                    </tr>)`)}
                </tbody>
            </table>
        </div>
        `;
    }
}