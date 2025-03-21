import ServiceUser from '../rest/serviceUser';
import Model from './userModel';
import View from './userView';
import { EVENTS } from './user.constants';

export default class Presenter {
  private baseURL = 'http://localhost:8080/workflow';

  view: View;
  model: Model;

  constructor(view: View, model: Model) {
    this.view = view;
    this.model = model;
    this.view.setPresenter(this);
  }

  clear() {
    this.model.reset();
    this.view.clear();
  }

  async load() {
    const service = new ServiceUser(this.baseURL);
    const result = await service.getAll();

    result.forEach((user): void => {
      this.model.addUser(user);
    });

    this.view.show(this.model.allUser);
  }

  handleEvent(eventname: EVENTS, event: CustomEvent): void {
    switch (eventname) {
      case EVENTS.EVENT_ALL_SELECTED:
        this.selectAll();
        break;
      case EVENTS.EVENT_ALL_UNSELECTED:
        this.unselectAll();
        break;
      case EVENTS.EVENT_ONE_SELECTED:
        this.selectOne(event);
        break;
      case EVENTS.EVENT_ONE_UNSELECTED:
        this.unselectOne(event);
        break;
      default:
        console.log(`No case for ${eventname}`);
    }
  }
  private selectAll() {
    this.model.selectAll();
  }

  private unselectAll() {
    this.model.unselectAll();
  }

  private selectOne(event: CustomEvent) {
    const userid: number = event.detail;
    this.model.selectOne(userid);
  }
  private unselectOne(event: CustomEvent) {
    const userid: number = event.detail;
    this.model.unselectOne(userid);
  }
}
