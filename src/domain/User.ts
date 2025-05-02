import { v4 as uuidv4 } from 'uuid';

type JsonDataUser = {
  id: number;
  objid: string;
  name: string;
  firstname: string;
  lastname: string;
};

class User {
  private _data: JsonDataUser;

  constructor(json: JsonDataUser) {
    this._data = json;
  }

  static create(name: string, firstname: string, lastname: string): User {
    const id = 1;
    const objid = uuidv4();
    return new User({ id, objid, name, firstname, lastname });
  }

  get id(): number {
    return this._data.id;
  }

  get objid(): string {
    return this._data.objid;
  }

  get name(): string {
    return this._data.name;
  }

  get firstname(): string {
    return this._data.firstname;
  }

  set firstname(value: string) {
    this._data.firstname = value;
  }

  get lastname(): string {
    return this._data.lastname;
  }

  set lastname(value: string) {
    this._data.lastname = value;
  }

  toJson(): string {
    const result = JSON.stringify(this._data);
    return result;
  }
}

export { User, JsonDataUser };
