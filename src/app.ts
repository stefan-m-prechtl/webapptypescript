

// @ts-ignore
import { initNavigation, initRouting, selectPage } from "./boundary/ui/navigation";

import Model from "./boundary/ui/userModel.ts";
import Presenter from "./boundary/ui/userPresenter.ts";
import View from "./boundary/ui/userView.ts";


// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener("DOMContentLoaded", init)

// View "User" wurde includiert
document.addEventListener("user.html", ()=>{
    const model = new Model();
    const view = new View("#user");
    new Presenter(view, model);
})

function init() {

    console.log("call init()");

    initNavigation();
    initRouting();

    // Startseite aktivieren
    selectPage(window.location.search);

}

