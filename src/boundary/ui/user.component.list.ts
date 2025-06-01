import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../domain/User';
import { EVENTS } from './user.constants';

@customElement('user-list')
export default class UserComponentList extends LitElement {

  constructor(users: User[] = []) {
    super();
    this.users = users;
  }

  @property()
  users: User[] = [];

  //@state()
  //allSelected = false;
  @state()
  menuVisible = false;

  // Ausführung vor render()
  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('users')) {
      this.menuVisible = false;
    }
  }

  // Ausführung nach render()
  updated(changedProperties: Map<string, unknown>) {
    super.updated?.(changedProperties);

    if (this.users.length === 0)
    {
      const checkboxAll = document.querySelector<HTMLInputElement>('#selectAll')!;
      checkboxAll.checked=false;
      checkboxAll.indeterminate = false;
    }

 }

  

  createRenderRoot() {
    return this;
  }

  render() {
    console.log(`call render with menuVisible=${this.menuVisible}`);
    return html`
      <div id="ctxMenuUserList" class="w3-panel">
        <button id="btnRefresh" class="w3-button w3-light-gray" @click=${this.handleClickRefresh}>Aktualisieren</button>
        <button id="btnClear" class="w3-button w3-light-gray" @click=${this.handleClickClear}>Leeren</button>
        <button id="btnEdit" class="w3-button w3-light-gray" @click=${this.handleClickEdit}>Bearbeiten</button>
        <button id="btnDelete" class="w3-button w3-light-gray" @click=${this.handleClickDelete}>Löschen</button>
      </div>
      <div class="w3-panel">
        <table class="w3-table w3-bordered" id="tblUser" ">
          <thead id="tblHead" @click="${this.handleClickTableHead}">
            <tr class="w3-light-gray">
              <th><input type="checkbox" id="selectAll"/></th>
              <th>Kennung</th>
              <th>Vorname</th>
              <th>Nachname</th>
            </tr>
          </thead>
          <tbody id="tblBody" @click="${this.handleClickTableBody}">
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
      <div id="userMenu" style="display: ${this.menuVisible ? 'block' : 'none'}; position:absolute; z-index:50;">
        <div class="w3-card w3-light-blue w3-animate-opacity w3-padding">
          <button class="w3-button w3-light-gray">Edit</button>
          <button class="w3-button w3-light-gray">Lock</button>
          <button class="w3-button w3-light-gray">Delete</button>
        </div>
      </div>
    `;
  }

  handleClickRefresh() {
    this.handleClickMenu(EVENTS.EVENT_REFRESH_CLICKED);
  }

  handleClickClear() {
    this.handleClickMenu(EVENTS.EVENT_CLEAR_CLICKED);
  }

  handleClickEdit() {
    this.handleClickMenu(EVENTS.EVENT_EDIT_CLICKED);
  }

  handleClickDelete() {
    this.handleClickMenu(EVENTS.EVENT_DELETE_CLICKED);
  }

  private handleClickMenu(event: EVENTS) {
    const options = {
      bubbles: true,
      composed: false,
    };
    this.dispatchEvent(new CustomEvent(event, options));
  }

  handleClickTableBody(event: Event) {
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
          this.showContextMenu(target);
        } else {
          checkboxAll.checked = false;

          const noneChecked = Array.from(checkboxesRow).every((checkbox) => !checkbox.checked);
          if (noneChecked) {
            checkboxAll.indeterminate = false;
            this.hideContextMenu();
          } else {
            checkboxAll.indeterminate = true;
            this.showContextMenu(target);
          }
        }

        const rowId = Number(row.getAttribute('data-id')!);
        const options = {
          bubbles: true,
          composed: true,
          detail: rowId,
        };

        if (target.checked) {
          this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ONE_SELECTED, options) as CustomEvent<number>);
        } else {
          this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ONE_UNSELECTED, options) as CustomEvent<number>);
        }
        this.updateActionMenu();
      }
    }
  }

  handleClickTableHead(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.id == 'selectAll') {

      const allIsSelected = target.checked;
      const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      checkboxes?.forEach((checkbox) => {
        checkbox.checked = allIsSelected;
      });
      this.updateActionMenu();

      const options = {
        bubbles: true,
        composed: true,
      };

      if (allIsSelected) {
        this.showContextMenu(target);
        this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ALL_SELECTED, options));
      } else {
        this.hideContextMenu();
        this.dispatchEvent(new CustomEvent(EVENTS.EVENT_ALL_UNSELECTED, options));
      }
    }
  }

  private updateActionMenu() {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const anyChecked = Array.from(checkboxes).some((checkbox) => (checkbox as HTMLInputElement).checked);

    const editButton = document.querySelector('#btnEdit') as HTMLButtonElement;
    const deleteButton = document.querySelector('#btnDelete') as HTMLButtonElement;

    editButton.disabled = !anyChecked;
    deleteButton.disabled = !anyChecked;
  }

  private async showContextMenu(checkbox: HTMLInputElement) {

    this.menuVisible =true;
     // Wait for Lit to finish rendering
    await this.updateComplete;

    const menu = document.querySelector('#userMenu') as HTMLDivElement;
    const rect = checkbox.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.right + 10 + window.scrollX}px`;
    
  }

  private hideContextMenu() {
    this.menuVisible =false;
  }
}
