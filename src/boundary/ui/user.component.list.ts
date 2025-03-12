import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "../../domain/user";

@customElement("user-list")
export default class UserComponentList extends LitElement {
  @property()
  users: User[] = [];

  render() {
    return html`
      <table class="w3-table w3-bordered" id="tblUser">
        <thead>
          <tr class="w3-light-gray">
            <th><input type="checkbox" id="selectAll" /></th>
            <th>Kennung</th>
            <th>Vorname</th>
            <th>Nachname</th>
          </tr>
        </thead>
        <tbody id="tblBody"></tbody>
        ${this.users.map(
          (user) => html` <tr data-id="${user.id}">
            <td><input type="checkbox" class="row-checkbox" /></td>
            <td>${user.name}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
          </tr>`
        )}
      </table>
    `;
  }
}
