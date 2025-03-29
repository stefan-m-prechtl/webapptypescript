import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../domain/user';
import { EVENTS } from './user.constants';

@customElement('user-edit')
export default class UserComponentEdit extends LitElement {
  @property()
  user: User | undefined = undefined;

  @state()
  isOpened = false;

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('user')) {
      const dialog = document.getElementById('edit-dialog') as HTMLElement;
      if (this.user) {
        dialog.style.display = 'block';
      } else {
        dialog.style.display = 'none';
      }
    }
  }

  submitForm(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const userData = {
      name: formData.get('name') as string,
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string
    };

    const user = User.create(userData.name, userData.firstname, userData.lastname);
    this.dispatchEvent(new CustomEvent<User>(EVENTS.EVENT_DIALOG_OK_CLICKED, {
      detail: user,
      bubbles: true,
      composed: true
    }));

    const dialog = document.querySelector('#edit-dialog') as HTMLElement;
    dialog.style.display='none';
    this.user = undefined;
   
  }

  handleClickCancel() {

    const dialog = document.querySelector('#edit-dialog') as HTMLElement;
    dialog.style.display='none';
    this.user = undefined;
   
  }

  render() {
    return html`
      <div id="edit-dialog" class="w3-modal ">
        <form class="w3-modal-content w3-container w3-card-4 w3-light-grey w3-padding" @submit=${this.submitForm.bind(this)}>
          <h2>Info zum Benutzer</h2>
          <label>Kennung:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.name ?? ''} name="name"/>
          <label>Vorname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.firstname ?? ''} name="firstname"/>
          <label>Nachname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.lastname ?? ''} name="lastname"/>
          <div class="w3-margin-top">
            <button type="submit" class="w3-button w3-green w3-margin-right">OK</button>
            <button type="button" class="w3-button w3-red" @click=${this.handleClickCancel}>Abbrechen</button>
          </div>
        </form>
      </div>
    `;
  }
}
