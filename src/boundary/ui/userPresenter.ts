import ServiceUser from "../rest/serviceUser";
import Model from "./userModel";
import View from "./userView";

export default class Presenter {
    private baseURL = "http://localhost:8080/workflow";
    
    private view: View;
    private model: Model;
    

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
        this.view.show(result);
            result.forEach((user): void => {
                console.log(user.toJson());
            });
    }

}