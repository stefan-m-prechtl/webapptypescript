import { EventHandler } from './EventHandler';
import UserEditModel from './UserEditModel';
import UserEditView from './UserEditView';
import { User } from '../../domain/User';
import { selectPageDirect } from './navigation';

export default class UserEditPresenter {
  private eventHandler;
  //private baseURL = 'http://localhost:8080/workflow';

  view: UserEditView;
  model: UserEditModel;

  constructor(view: UserEditView, model: UserEditModel, eventHandler: EventHandler) {
    this.view = view;
    this.model = model;
    this.view.setPresenter(this);

    this.eventHandler = eventHandler;
    this.eventHandler.addEventListener('editUser', this.onEditUser.bind(this));
  }

  clear() {
    //this.model.reset();
    //this.view.clear();
  }

  private onEditUser(event: Event) {
    const customEvent = event as CustomEvent;
    const user = customEvent.detail as User;
    this.view.show(user);

    selectPageDirect('user-edit');
  }
}
