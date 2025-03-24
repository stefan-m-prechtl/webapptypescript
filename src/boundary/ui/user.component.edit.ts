import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../domain/user';

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

  render() {
    return html`
      <div id="edit-dialog" class="w3-modal ">
        <form class="w3-modal-content w3-container w3-card-4 w3-light-grey w3-padding">
          <span
            onclick="document.getElementById('edit-dialog').style.display='none'"
            class="w3-button w3-display-topright"
            >&times;
          </span>
          <h2>Info zum Benutzer</h2>
          <label>Kennung:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.name ?? ''} />
          <label>Vorname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.firstname ?? ''} />
          <label>Nachname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.lastname ?? ''} />
        </form>
      </div>
    `;
  }
}
