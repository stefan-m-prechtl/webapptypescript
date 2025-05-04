import { User } from '../../domain/User';
import UserComponentEdit from './user.component.edit';
import UserEditPresenter from './UserEditPresenter';
//import { EVENTS } from './user.constants';

type NullableHtmlElement = HTMLElement | null;

export default class UserEditView {
  presenter: UserEditPresenter | null;
  rootElement: NullableHtmlElement;
  tblBody: HTMLTableElement;

  constructor(id: string) {
    this.presenter = null;

    this.rootElement = document.querySelector<HTMLElement>(id)!;
    this.tblBody = document.querySelector<HTMLTableElement>('#tblBody')!;
  }

  setPresenter(presenter: UserEditPresenter) {
    this.presenter = presenter;
    this.initView();
    this.initEventHandler();
  }

  initView() {
    new UserComponentEdit();
  }

  initEventHandler() {}

  clear() {}

  show(user: User) {
    const editComponent: UserComponentEdit = document.querySelector<UserComponentEdit>('user-edit')!;
    editComponent.user = user;
  }
}
