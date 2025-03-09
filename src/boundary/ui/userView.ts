import { User } from "../../domain/user";
import UserComponentEdit from "./user.component.edit";
import Presenter from "./userPresenter";
import { html, render } from "lit";

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
    const uce = new UserComponentEdit();
    uce.version ="1.1.0";
  }

  initEventHandler() {
    const btnLoad = document.querySelector<HTMLButtonElement>("#btnLoad")!;
    const btnClear = document.querySelector<HTMLButtonElement>("#btnClear")!;
    const chkSelectAll =
      document.querySelector<HTMLInputElement>("#selectAll")!;

    const actionEdit =
      document.querySelector<HTMLButtonElement>("#actionEdit")!;

    btnLoad.addEventListener("click", () => {
      this.presenter?.load();
      const uce= document.querySelector("user-edit") as UserComponentEdit;
      uce.version="2.0";
    });

    btnClear.addEventListener("click", () => {
      this.presenter?.clear();
    });

    chkSelectAll.addEventListener("change", () => {
      const checkboxes =
        document.querySelectorAll<HTMLInputElement>(".row-checkbox");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = chkSelectAll.checked;
        checkbox
          .closest("tr")
          ?.classList.toggle("selectedRow", chkSelectAll.checked);
      });
      this.updateActionMenu(checkboxes);
    });

    actionEdit.addEventListener("click", () => {
      this.presenter?.handleActionEdit();
    });
  }

  updateActionMenu(checkboxes: NodeListOf<HTMLInputElement>) {
    const actionsMenu = document.querySelector("#actions")!;

    const anyChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    if (anyChecked) {
      actionsMenu.removeAttribute("hidden");
    } else {
      actionsMenu.setAttribute("hidden", "true");
    }
  }

  clear() {
    render(html``, this.tblBody);
  }

  show(users: User[]) {
    const templateTable = (users: User[]) =>
      html` ${users.map(
        (user) => html`<tr data-id="${user.id}">
          <td><input type="checkbox" class="row-checkbox" /></td>
          <td>${user.name}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
        </tr>`
      )}`;
    render(templateTable(users), this.tblBody);
    this.attachRowEventListeners();
  }

  attachRowEventListeners() {
    const checkboxes =
      document.querySelectorAll<HTMLInputElement>(".row-checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const row = target.closest("tr");
        if (row) {
          row.classList.toggle("selectedRow", target.checked);
        }

        const chkSelectAll =
          document.querySelector<HTMLInputElement>("#selectAll")!;
        const allChecked = Array.from(checkboxes).every(
          (checkbox) => checkbox.checked
        );
        if (allChecked) {
          chkSelectAll.checked = true;
          chkSelectAll.indeterminate = false;
        } else {
          const noneChecked = Array.from(checkboxes).every(
            (checkbox) => !checkbox.checked
          );
          if (noneChecked) {
            chkSelectAll.checked = false;
            chkSelectAll.indeterminate = false;
          } else {
            chkSelectAll.checked = false;
            chkSelectAll.indeterminate = true;
          }
        }

        this.updateActionMenu(checkboxes);
      });
    });
  }

  showCurrentUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }

  showEditUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }
  

}
