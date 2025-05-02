// Selectors like JQuery
//const $ = document.querySelector.bind(document) as <T extends HTMLElement>(selector: string) => T | null;
//const $$ = document.querySelectorAll.bind(document) as <T extends HTMLElement>(selector: string) => NodeListOf<T>;

// JQuery-like event handler
// declare global {
//   interface Node {
//     on(name: string, fn: EventListener): this;
//   }
//   interface NodeList {
//     on(name: string, fn: EventListener): this;
//   }
// }

// // Event listener for Node
// Node.prototype.on = function (this: Node, name: string, fn: EventListener) {
//   this.addEventListener(name, fn);
//   return this;
// };

// // Event listener for NodeList
// NodeList.prototype.on = function (this: NodeList, name: string, fn: EventListener) {
//   this.forEach((elem) => elem.on(name, fn));
//   return this;
// };

// // Extending NodeList and HTMLCollection with Array methods
// NodeList.prototype.__proto__ = Array.prototype;
// HTMLCollection.prototype.__proto__ = Array.prototype;

// Base URL for routing (without query string and page path)
const originHref: string = window.location.origin + window.location.pathname;

export function initNavigation(): void {

  const navigationButton = document.querySelector('#nav_button') as HTMLElement;
  navigationButton.addEventListener('click', (e: Event) => {
    handleNavButtonClick(e);
  });

  const navigationLinks = document.querySelectorAll(".nav_link") as NodeListOf<HTMLElement>;
  navigationLinks.forEach((link) => {
    link.addEventListener("click", (e: Event) => {
      handleNavClick(e);
    });
  });
}

export function initRouting(): void {
  // Event triggered by browser's "back" / "forward" actions
  window.addEventListener('popstate', () => {
    const pageName = window.location.search.split('=').pop();
    showPage(pageName || '');
  });
}

export function selectPage(search?: string): void {
  if (!search) {
    history.replaceState(
      {},
      'Start',
      originHref + '?page=start'
    );
  } else {
    const pageName = window.location.search.split('=').pop();
    showPage(pageName || '');
  }
}

function showPage(pageName: string): void {
  const virtualPages = document.querySelectorAll(".virtualpage") as NodeListOf<HTMLElement>;
  virtualPages.forEach(page => page.classList.add('hideDiv'));

  const selector = `[href='${pageName}']`;
  const navLink = document.querySelector(selector) as HTMLElement;
  if (null != navLink) {
    selectNavLink(navLink);
  }

  const currentPage = document.querySelector('#' + pageName) as HTMLElement;
  currentPage.classList.remove('hideDiv');
  const currentAside = document.querySelector('#' + pageName + '-aside') as HTMLElement;
  currentAside.classList.remove('hideDiv');
}

function selectNavLink(link: HTMLElement): void {
  // Set the active class for the navigation link    
  const oldLink = document.querySelector('.nav_current_link') as HTMLElement;
  oldLink.classList.remove('nav_current_link');
  link.classList.add('nav_current_link');
  link.focus();
}

function handleNavButtonClick(e: Event): void {
  const ulElem = document.querySelector(".site-nav ul") as HTMLElement;
  const displayStyle = ulElem.style['display'];
  if (displayStyle === 'block') {
    ulElem.style['display'] = 'none';
    (e.target as HTMLElement).innerHTML = '&#9776; Menü';
  } else {
    ulElem.style['display'] = 'block';
    (e.target as HTMLElement).innerHTML = '&#x2716; Menü';
  }
}

function handleNavClick(e: Event): void {
  const pageName = (e.target as HTMLElement).getAttribute('href');
  if (pageName) {
    history.pushState(
      {},
      pageName,
      originHref + '?page=' + pageName
    );
    showPage(pageName);
  }
  e.preventDefault();
}

export function selectPageDirect(pageName: string): void {
  if (pageName) {
    history.pushState(
      {},
      pageName,
      originHref + '?page=' + pageName
    );
    showPage(pageName);
  }
}


