// Selektoren wie in JQuery
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// JQuery like Eventhandler
Node.prototype.on = function (name, fn) {
    this.addEventListener(name, fn);
    return this;
  };
  NodeList.prototype.on = NodeList.prototype.on = function (name, fn) {
    this.forEach((elem) => elem.on(name, fn));
    return this;
  };
  
  // Array-Methoden bereitstellen
  NodeList.prototype.__proto__ = Array.prototype;
  HTMLCollection.prototype.__proto__ = Array.prototype;

// "Basis"-URL (d.h. ohne queryString mit Seitenangabe) für Routing speichern
const originHref = window.location.origin + window.location.pathname;

export function initNavigation() {
    let navigationButton = $('#nav_button');
    navigationButton.on('click', (e) => {
        handleNavButtonClick(e);
    })

    let navigationLinks = $$(".nav_link");
    navigationLinks.forEach(link => {
        link.on("click", (e) => {
            handleNavClick(e);
        });
    });
}

export function initRouting() {

    // Event wird ausgelöst durch Browser "Eine Seite zurück"/"Eine Seite vor"
    window.addEventListener('popstate', (event) => {
        let pageName = window.location.search.split('=').pop()
        showPage(pageName);
    });
}

export function selectPage(search) {
    if (!search) {
        history.replaceState(
            {},
            'Start',
            originHref + '?page=start'
        )
    }
    else {
        let pageName = window.location.search.split('=').pop()
        showPage(pageName);
    }
}

function showPage(pageName) {

    let virtualPages = $$(".virtualpage");
    virtualPages.forEach(page => page.classList.add('hideDiv'));

    let selector = '[href=\'' + pageName + '\']';
    let navLink = $(selector);
    selectNavLink(navLink)

    let currentPage = $('#' + pageName);
    currentPage.classList.remove('hideDiv');
    let currentAside = $('#' + pageName + '-aside');
    currentAside.classList.remove('hideDiv');
}

function selectNavLink(link) {
    // Klasse für aktivien Navigationslink neu setzen    
    let oldLink = $('.nav_current_link');
    oldLink.classList.remove('nav_current_link');
    link.classList.add('nav_current_link');
    link.focus();
}


function handleNavButtonClick(e) {
    let ulElem = $(".site-nav ul")
    let displayStyle = ulElem.style['display'];
    if (displayStyle === 'block') {
        ulElem.style['display'] = 'none';
        e.target.innerHTML = '&#9776; Menü';
    }
    else {
        ulElem.style['display'] = 'block';
        e.target.innerHTML = '&#x2716; Menü';
    }
}

function handleNavClick(e) {

    let pageName = e.target.getAttribute('href');
    history.pushState(
        {},
        pageName,
        originHref + '?page=' + pageName
    )
    showPage(pageName);
    return e.preventDefault();
}