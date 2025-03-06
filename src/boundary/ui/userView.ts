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

        btnLoad.addEventListener("click", () => {
            this.presenter?.load();
        });

        btnClear.addEventListener("click", () => {
            this.presenter?.clear();
        });

        this.tblBody.addEventListener("click", (e) => {
            const row = (e.target as HTMLElement).closest('tr');
            if (row) {
                // Remove w3-selected class from all rows
                document.querySelectorAll("tbody tr").forEach(tr => tr.classList.remove("w3-select"));
                // selected class to the clicked row
                row.classList.add("w3-select");

                this.presenter?.handleTableRowSelected(`${row.dataset.id}`);

            }
        });
    }

    clear() {
        render(html``, this.tblBody);
    }

    show(users: User[]) {

        const templateTable = (users: User[]) => html`
                ${users.map(user => html`<tr data-id="${user.id}">
                    <td>${user.name}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                </tr>`)}`;
        render(templateTable(users), this.tblBody);
    }

    showCurrentUser(user: User) {
        console.log(`Current User: id=${user.id}, name=${user.name}`)
    }
}


