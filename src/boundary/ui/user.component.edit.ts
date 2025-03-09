import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

console.log("class UserComponentEdit")

@customElement('user-edit')
export default class UserComponentEdit extends LitElement {
    @property()
    version: string = "1.0.0";

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
    <p>Welcome to the Lit tutorial!</p>
    <p>This is the ${this.version} version.</p>
    `;
    }
}

//customElements.define('user-edit', UserComponentEdit);


