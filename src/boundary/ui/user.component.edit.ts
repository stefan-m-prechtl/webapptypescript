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
      <div>
        <p>Info zu Benutzer</p>
        <p>Kennung: ${this.user?.name}</p>
        <p>Vorname: ${this.user?.firstname}</p>
        <p>Nachname: ${this.user?.lastname}</p>
      </div>
    `;
  }
}
