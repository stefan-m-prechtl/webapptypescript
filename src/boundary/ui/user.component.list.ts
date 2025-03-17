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

    //event.preventDefault();
    const target = event.target as HTMLInputElement;

    // Ensure it's a checkbox inside a table row
    if (target && target.type === 'checkbox' && target.classList.contains('row-checkbox')) {
        const row = target.closest('tr'); 

        if (row) {
            const rowId = row.getAttribute('data-id'); 
            console.log(`Row ID: ${rowId}, Checked: ${target.checked}`);

            const options = {
              bubbles: true,
              composed: true,
              detail: rowId
            }
          
            if (target.checked)
            {
              console.log("dispatchEvent 'selected'")
              this.dispatchEvent(new CustomEvent('user.list.row.selected', options));
            }
            else
            {
              console.log("dispatchEvent 'unselected'")
              this.dispatchEvent(new CustomEvent('user.list.row.unselected', options));
            }

        }
    }

    
    

    // const target = event.target as HTMLElement;
    // let isChecked = false;

    // Kein Klick auf Checkbox?
    // if (!(target instanceof HTMLInputElement && target.type === 'checkbox')) {
    //   const row = target.closest('tr');
    //   const checkbox = row?.querySelector('.row-checkbox') as HTMLInputElement;
    //   checkbox.checked = !checkbox.checked;
    //   isChecked = checkbox.checked;
    // } else {
    //   const checkbox = target as HTMLInputElement;
    //   isChecked = checkbox.checked;
    // }

    //console.log(`isChecked: ${isChecked}`);
    //this.updateActionMenu();
  }

  handleSelectAllClick(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.id !== 'selectAll') return;

    const checkboxAll = event.target as HTMLInputElement;
    this.allSelected = checkboxAll.checked;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes?.forEach((checkbox) => {
      checkbox.checked = this.allSelected;
    });

    this.updateActionMenu();
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
