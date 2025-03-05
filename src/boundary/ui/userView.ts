import { User } from "../../domain/user";
import Presenter from "./userPresenter";


type NullableHtmlElement = HTMLElement | null;

export default class View {


    presenter: Presenter | null;;
    rootElement: NullableHtmlElement;

    constructor(id: string) {

        this.presenter = null;
        this.rootElement = document.querySelector<HTMLElement>(id);
        this.initEventHandler();

    }

    setPresenter(presenter: Presenter) {
        this.presenter = presenter;
    }

    initEventHandler() {
        const btnLoad = document.querySelector<HTMLButtonElement>("#btnLoad")!;
        const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!;

        btnLoad.addEventListener("click", () => {
            this.presenter?.load();
        });

        btnClear.addEventListener("click", () => {
            this.presenter?.clear();
        });
    }

    clear() {
        const table = document.querySelector<HTMLTableElement>("#tblUser")!;
        table.tBodies[0].innerHTML = "";
    }

    show(users: User[]) {
        const table = document.querySelector<HTMLTableElement>("#tblUser")!;

        const tableBody = table.tBodies[0];
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = user.name

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = user.firstname

            const lastNameCell = document.createElement("td");
            lastNameCell.textContent = user.lastname;

            row.appendChild(nameCell);
            row.appendChild(firstNameCell);
            row.appendChild(lastNameCell);
            tableBody.appendChild(row);
        });
    }
}