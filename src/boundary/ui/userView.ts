import { User } from "../../domain/user";
import Presenter from "./userPresenter";
import { html, render } from 'lit-html';


type NullableHtmlElement = HTMLElement | null;

export default class View {


    presenter: Presenter | null;
    rootElement: NullableHtmlElement;
    tblBody: HTMLTableElement;

    constructor(id: string) {

        this.presenter = null;

        this.rootElement = document.querySelector<HTMLElement>(id)!;
        this.tblBody = document.querySelector<HTMLTableElement>("#tblBody")!;
        this.initView();
        this.initEventHandler();

    }

    setPresenter(presenter: Presenter) {
        this.presenter = presenter;
    }

    initView() {


    }

    initEventHandler() {
        const btnLoad = document.querySelector<HTMLButtonElement>("#btnLoad")!;
        const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!;
        const chkSelectAll = document.querySelector<HTMLInputElement>('#selectAll')!;

        btnLoad.addEventListener("click", () => {
            this.presenter?.load();
        });

        btnClear.addEventListener("click", () => {
            this.presenter?.clear();
        });

        chkSelectAll.addEventListener("change", () => {
            const checkboxes = document.querySelectorAll<HTMLInputElement>(".row-checkbox");
            checkboxes.forEach(checkbox => {
                checkbox.checked = chkSelectAll.checked;
                checkbox.closest("tr")?.classList.toggle("selectedRow", chkSelectAll.checked);
            });
        });
    }

    clear() {
        render(html``, this.tblBody);
    }

    show(users: User[]) {

        const templateTable = (users: User[]) => html`
                ${users.map(user => html`<tr data-id="${user.id}">
                    <td><input type="checkbox" class="row-checkbox"></td>
                    <td>${user.name}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                </tr>`)}`;
        render(templateTable(users), this.tblBody);
        this.attachRowEventListeners();
    }

    attachRowEventListeners() {
        const checkboxes = document.querySelectorAll<HTMLInputElement>(".row-checkbox");

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", (e) => {
                const target = e.target as HTMLInputElement;
                const row = target.closest("tr");
                if (row) {
                    row.classList.toggle("selectedRow", target.checked);
                }
                //updateMenu();
            });
        });
    }

    showCurrentUser(user: User) {
        console.log(`Current User: id=${user.id}, name=${user.name}`)
    }
}


