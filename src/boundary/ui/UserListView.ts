import { User } from '../../domain/User';
import UserComponentList from './user.component.list';
import UserListPresenter from './UserListPresenter';
import { EVENTS } from './user.constants';

type NullableHtmlElement = HTMLElement | null;

export default class UserListView {
  presenter: UserListPresenter | null;
  rootElement: NullableHtmlElement;
  tblBody: HTMLTableElement;

  constructor(id: string) {
    this.presenter = null;

    this.rootElement = document.querySelector<HTMLElement>(id)!;
    this.tblBody = document.querySelector<HTMLTableElement>('#tblBody')!;
  }

  setPresenter(presenter: UserListPresenter) {
    this.presenter = presenter;
    this.initView();
    this.initEventHandler();
  }

  initView() {
    new UserComponentList([]);
  }

  initEventHandler() {

    // document.addEventListener('click', (event) => {
    //   const target = event.target as HTMLElement;
    //   const isMenu = target.closest('#ctxMenuUserList');
    //   if (!isMenu) {
    //     console.log("Hide Popup Menu");
    //   };
    // });


    document.addEventListener(EVENTS.EVENT_REFRESH_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_CLEAR_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });


    document.addEventListener(EVENTS.EVENT_EDIT_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_DELETE_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ALL_SELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ALL_UNSELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ONE_SELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_ONE_UNSELECTED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
    });

    document.addEventListener(EVENTS.EVENT_DIALOG_OK_CLICKED, (event) => {
      const customEvent = event as CustomEvent; // Cast to CustomEvent
      this.presenter?.handleEvent(customEvent);
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
