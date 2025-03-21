export default class IncludeHTML extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const file = this.getAttribute('src');
    if (file) {
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        this.innerHTML = await response.text();
        document.dispatchEvent(new Event(file));
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// Define the custom element
customElements.define('include-html', IncludeHTML);
