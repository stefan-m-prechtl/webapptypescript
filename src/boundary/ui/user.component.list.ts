import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../domain/user';
import { EVENTS } from './user.constants';

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
    const target = event.target as HTMLInputElement;
    if (target && target.type === 'checkbox' && target.classList.contains('row-checkbox')) {
      const row = target.closest('tr');
      if (row) {
        // Checkbox "Alle" anpassen
        const checkboxAll = document.querySelector<HTMLInputElement>('#selectAll')!;
        const checkboxesRow = document.querySelectorAll<HTMLInputElement>('.row-checkbox');
        const allChecked = Array.from(checkboxesRow).every((checkbox) => checkbox.checked);
        if (allChecked) {
          checkboxAll.checked = true;
          checkboxAll.indeterminate = false;
        } else {
          const noneChecked = Array.from(checkboxesRow).every((checkbox) => !checkbox.checked);
          if (noneChecked) {
            checkboxAll.checked = false;
            checkboxAll.indeterminate = false;
          } else {
            checkboxAll.checked = false;
            checkboxAll.indeterminate = true;
          }
        }

        const rowId = row.getAttribute('data-id');
        const options = {
          bubbles: true,
          composed: true,
          detail: rowId,
        };

        if (target.checked) {
          this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ONE_SELECTED, options));
        } else {
          this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ONE_UNSELECTED, options));
        }
        this.updateActionMenu();
      }
    }
  }

  handleSelectAllClick(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.id == 'selectAll') {
      this.allSelected = target.checked;

      const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      checkboxes?.forEach((checkbox) => {
        checkbox.checked = this.allSelected;
      });
      this.updateActionMenu();

      const options = {
        bubbles: true,
        composed: true,
      };

      if (target.checked) {
        this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ALL_SELECTED, options));
      } else {
        this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ALL_UNSELECTED, options));
      }
    }
  }

  updateActionMenu() {
    const actionsMenu = document.querySelector('#actions')!;
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const anyChecked = Array.from(checkboxes).some((checkbox) => (checkbox as HTMLInputElement).checked);
    if (anyChecked) {
      actionsMenu.removeAttribute('hidden');
    } else {
      actionsMenu.setAttribute('hidden', 'true');
    }
  }

  render() {
    return html`
      <div class="w3-panel w3-bar" id="actions" hidden>
        <a href="#" class="w3-bar-item w3-button w3-grey" id="actionEdit">Bearbeiten</a>
        <a href="#" class="w3-bar-item w3-button w3-grey" id="actionDelete">Löschen</a>
      </div>
      <div class="w3-panel">
        <table class="w3-table w3-bordered" id="tblUser">
          <thead id="tblHead" @click=${this.handleSelectAllClick}>
            <tr class="w3-light-gray">
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
