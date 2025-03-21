import { User } from '../../domain/user';
import UserComponentEdit from './user.component.edit';
import UserComponentList from './user.component.list';
import Presenter from './userPresenter';
import { EVENTS } from './user.constants';

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
  }

  clear() {
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = [];
  }

  show(users: User[]) {
    // this.attachRowEventListeners();
    const listComponent: UserComponentList = document.querySelector<UserComponentList>('user-list')!;
    listComponent.users = users;
  }

  showCurrentUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }

  showEditUser(user: User) {
    console.log(`Current User: id=${user.id}, name=${user.name}`);
  }
}
