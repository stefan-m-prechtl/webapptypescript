// @ts-ignore
import { initNavigation, initRouting, selectPage } from './boundary/ui/navigation';

import { EventHandler } from './boundary/ui/EventHandler';

import UserComponentEdit from './boundary/ui/user.component.edit';
import UserComponentList from './boundary/ui/user.component.list';

import UserEditModel from './boundary/ui/UserEditModel';
import UserEditView from './boundary/ui/UserEditView';
import UserEditPresenter from './boundary/ui/UserEditPresenter';

import UserListModel from './boundary/ui/UserListModel';
import UserListPresenter from './boundary/ui/UserListPresenter';
import UserListView from './boundary/ui/UserListView';

declare global {
  interface HTMLElementTagNameMap {
    'user-edit': UserComponentEdit;
    'user-list': UserComponentList;
  }
}

const eventHandler = new EventHandler();

// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener('DOMContentLoaded', init);

// View "UserList" wurde includiert => Initialisierung
document.addEventListener('user-list.html', () => {
  const model = new UserListModel();;
  const view = new UserListView('#user-list');
  new UserListPresenter(view, model, eventHandler);
});

// View "UserEdit" wurde includiert => Initialisierung
document.addEventListener('user-edit.html', () => {
  const model = new UserEditModel();
  const view = new UserEditView('#user-edit');
  new UserEditPresenter(view, model, eventHandler);
});

function init() {
  initNavigation();
  initRouting();

  // Startseite aktivieren
  selectPage(window.location.search);
}
