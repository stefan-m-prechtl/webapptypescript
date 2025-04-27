// @ts-ignore
import { initNavigation, initRouting, selectPage } from './boundary/ui/navigation';
import UserComponentEdit from './boundary/ui/user.component.edit.ts';
import UserComponentList from './boundary/ui/user.component.list.ts';

import UserListModel from './boundary/ui/UserListModel.ts';
import UserListPresenter from './boundary/ui/UserListPresenter.ts';
import UserListView from './boundary/ui/UserListView.ts';

declare global {
  interface HTMLElementTagNameMap {
    'user-edit': UserComponentEdit;
    'user-list': UserComponentList;
  }
}

// Event-Listener: Event feuert, wenn DOM-Baum vollständig geladen ist
document.addEventListener('DOMContentLoaded', init);

// View "User" wurde includiert => Initialisierung
document.addEventListener('user-list.html', () => {
  const model = new UserListModel();
  const view = new UserListView('#user-list');
  new UserListPresenter(view, model);
});

function init() {
  initNavigation();
  initRouting();

  // Startseite aktivieren
  selectPage(window.location.search);
}
