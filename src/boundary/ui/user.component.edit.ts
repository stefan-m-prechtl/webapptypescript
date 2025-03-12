import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "../../domain/user";

console.log("class UserComponentEdit");

@customElement("user-edit")
export default class UserComponentEdit extends LitElement {
  @property()
  user: User | null = null;

  constructor() {
    super();
    console.log("constructor UserComponentEdit");
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallBack UserComponentEdit");
  }

  render() {
    return html`
      <p>Info zu Benutzer</p>
      <p>Aktuell: ${this.user?.name}</p>
      <p>Vorname: ${this.user?.firstname}</p>
      <p>Nachname: ${this.user?.lastname}</p>
    `;
  }
}
