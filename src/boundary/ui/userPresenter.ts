import ServiceUser from "../rest/serviceUser";
import Model from "./userModel";
import View from "./userView";

export default class Presenter {
  private baseURL = "http://localhost:8080/workflow";

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

  handleTableRowSelected(userid: string) {
    console.log(`User with id ${userid} was selected`);
    this.model.selectUser(Number(userid));

    if (this.model.selectedUser) {
      this.view.showCurrentUser(this.model.selectedUser);
    }
  }

  handleActionEdit() {
    this.model.selectUser(1);
    this.view.showEditUser(this.model.selectedUser!);
  }
}
