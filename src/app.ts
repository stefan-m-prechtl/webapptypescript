import AuthService from "./boundary/rest/authService.ts";
import ServiceUser from "./boundary/rest/serviceUser.ts";

// @ts-ignore
import { initNavigation, initRouting, selectPage } from "./boundary/ui/navigation";
import Model from "./boundary/ui/userModel.ts";
import Presenter from "./boundary/ui/userPresenter.ts";
import View from "./boundary/ui/userView.ts";



// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener("DOMContentLoaded", init)

function init() {

    initNavigation();
    initRouting();

    // tmp
    const model = new Model();
    const view = new View("#user");
    const presenter = new Presenter(view, model);

    // Startseite aktivieren
    selectPage(window.location.search);

}

