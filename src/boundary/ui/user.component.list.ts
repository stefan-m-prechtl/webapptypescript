import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../domain/user';

@customElement('user-list')
export default class UserComponentList extends LitElement {
  @property()
  users: User[] = [];

  @state()
  allSelected = false;

  constructor(users: User[] = []) {
    super();
    this.users = users;
  }

  createRenderRoot() {
    return this;
  }

  handleClickTable(event: Event) {
    console.log(event.target);
  }

  handleSelectAllClick(event: Event) {
    const checkboxAll = event.target as HTMLInputElement;
    this.allSelected = checkboxAll.checked;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes?.forEach((checkbox) => {
      checkbox.checked = this.allSelected;
    });
  }

  render() {
    return html`
      <div class="w3-panel w3-bar" id="actions" hidden>
        <a href="#" class="w3-bar-item w3-button w3-grey" id="actionEdit">Bearbeiten</a>
        <a href="#" class="w3-bar-item w3-button w3-grey" id="actionDelete">Löschen</a>
      </div>
      <div class="w3-panel">
        <table class="w3-table w3-bordered" id="tblUser">
          <thead>
            <tr class="w3-light-gray" @click=${this.handleSelectAllClick}>
              <th><input type="checkbox" id="selectAll" /></th>
              <th>Kennung</th>
              <th>Vorname</th>
              <th>Nachname</th>
            </tr>
          </thead>
          <tbody id="tblBody" @click="${this.handleClickTable}">
            ${this.users.map(
              (user) => html` <tr data-id="${user.id}">
                <td><input type="checkbox" class="row-checkbox" /></td>
                <td>${user.name}</td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
              </tr>`,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
