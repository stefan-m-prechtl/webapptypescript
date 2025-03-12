import { User } from '../../domain/user';
import UserComponentEdit from './user.component.edit';
import UserComponentList from './user.component.list';
import Presenter from './userPresenter';

type NullableHtmlElement = HTMLElement | null;

export default class View {
  presenter: Presenter | null;
  rootElement: NullableHtmlElement;
  tblBody: HTMLTableElement;

  constructor(id: string) {
    this.presenter = null;

    this.rootElement = document.querySelector<HTMLElement>(id)!;
    this.tblBody = document.querySelector<HTMLTableElement>('#tblBody')!;
  }

  setPresenter(presenter: Presenter) {
    this.presenter = presenter;
    this.initView();
    this.initEventHandler();
  }

  initView() {
    const edit = new UserComponentEdit();
    edit.user = null;

    new UserComponentList([]);
  }

  initEventHandler() {
    const btnLoad = document.querySelector<HTMLButtonElement>('#btnLoad')!;
    const btnClear = document.querySelector<HTMLButtonElement>('#btnClear')!;

    btnLoad.addEventListener('click', () => {
      this.presenter?.load();
    });

    btnClear.addEventListener('click', () => {
      this.presenter?.clear();
    });

    // chkSelectAll.addEventListener("change", () => {
    //   const checkboxes =
    //     document.querySelectorAll<HTMLInputElement>(".row-checkbox");
    //   checkboxes.forEach((checkbox) => {
    //     checkbox.checked = chkSelectAll.checked;
    //     checkbox
    //       .closest("tr")
    //       ?.classList.toggle("selectedRow", chkSelectAll.checked);
    //   });
    //   this.updateActionMenu(checkboxes);
    // });

    // actionEdit.addEventListener("click", () => {
    //   this.presenter?.handleActionEdit();
    // });
  }

  // updateActionMenu(checkboxes: NodeListOf<HTMLInputElement>) {
  //   const actionsMenu = document.querySelector("#actions")!;

  //   const anyChecked = Array.from(checkboxes).some(
  //     (checkbox) => checkbox.checked
  //   );
  //   if (anyChecked) {
  //     actionsMenu.removeAttribute("hidden");
  //   } else {
  //     actionsMenu.setAttribute("hidden", "true");
  //   }
  // }

  clear() {
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = [];
  }

  show(users: User[]) {
    // this.attachRowEventListeners();
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = users;
  }

  // attachRowEventListeners() {
  //   const checkboxes =
  //     document.querySelectorAll<HTMLInputElement>(".row-checkbox");

  //   checkboxes.forEach((checkbox) => {
  //     checkbox.addEventListener("change", (e) => {
  //       const target = e.target as HTMLInputElement;
  //       const row = target.closest("tr");
  //       if (row) {
  //         row.classList.toggle("selectedRow", target.checked);
  //       }

  //       const chkSelectAll =
  //         document.querySelector<HTMLInputElement>("#selectAll")!;
  //       const allChecked = Array.from(checkboxes).every(
  //         (checkbox) => checkbox.checked
  //       );
  //       if (allChecked) {
  //         chkSelectAll.checked = true;
  //         chkSelectAll.indeterminate = false;
  //       } else {
  //         const noneChecked = Array.from(checkboxes).every(
  //           (checkbox) => !checkbox.checked
  //         );
  //         if (noneChecked) {
  //           chkSelectAll.checked = false;
  //           chkSelectAll.indeterminate = false;
  //         } else {
  //           chkSelectAll.checked = false;
  //           chkSelectAll.indeterminate = true;
  //         }
  //       }

  //       this.updateActionMenu(checkboxes);
  //     });
  //   });
  // }

  showCurrentUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }

  showEditUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }
}
