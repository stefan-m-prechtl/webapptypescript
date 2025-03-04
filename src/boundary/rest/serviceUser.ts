import BaseService from "./baseservice";
import { JsonDataUser, User } from "../../domain/user";

export default class ServiceUser {
    private baseservice: BaseService;

    constructor(baseUrl: string) {
        this.baseservice = new BaseService(baseUrl);
    }

    async getAll(): Promise<User[]> {
        const jsonData = await this.baseservice.get<JsonDataUser[]>("/user");
        if (jsonData === null) {
            return [];
        }
        const result = jsonData.map(json => new User(json));
        return result;
    }
}