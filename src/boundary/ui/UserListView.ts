import { User } from '../../domain/user';
import UserComponentEdit from './user.component.edit';
import UserComponentList from './user.component.list';
import Presenter from './UserListPresenter';
import { EVENTS } from './user.constants';

type NullableHtmlElement = HTMLElement | null;

export default class UserListView {
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
    new UserComponentList([]);
    new UserComponentEdit();
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

    document.addEventListener(EVENTS.EVENT_EDIT_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_EDIT_CLICKED, customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ALL_SELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_ALL_SELECTED, customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ALL_UNSELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_ALL_UNSELECTED, customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ONE_SELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_ONE_SELECTED, customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ONE_UNSELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_ONE_UNSELECTED, customEvent);
    });

    document.addEventListener(EVENTS.EVENT_DIALOG_OK_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(EVENTS.EVENT_DIALOG_OK_CLICKED, customEvent);
    });
  }

  clear() {
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = [];
  }

  show(users: User[]) {
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = [...users];
  }

  showCurrentUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }

  showEditUser(user: User | undefined) {
    //const editComponent: UserComponentEdit = document.querySelector('user-edit') as UserComponentEdit;
    //editComponent.user = user;
    alert('Under construction!');
    console.log(user?.name);

  }

  showInfo(msg: string) {
    alert(msg);
  }
}
