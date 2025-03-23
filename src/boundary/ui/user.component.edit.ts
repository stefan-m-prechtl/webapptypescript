import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "../../domain/user";



@customElement("user-edit")
export default class UserComponentEdit extends LitElement {
  @property()
  user: User | undefined = undefined;

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div >
        <form class="w3-container w3-card-4 w3-light-grey w3-padding">
        <h2>Info zum Benutzer</h2>
          <label>Kennung:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.name ?? ""}>
          <label>Vorname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.firstname ?? ""}>
          <label>Nachname:</label>
          <input type="text" class="w3-input w3-border w3-margin-bottom" .value=${this.user?.lastname ?? ""}>
        </form>
      
    </div>
    `;
  }
}
