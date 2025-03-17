type JsonDataUser = {
  id: number;
  name: string;
  password: string;
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
    const password = "";
    return new User({ id, name, password, firstname, lastname });
  }

  get id(): number {
    return this._data.id;
  }

  get name(): string {
    return this._data.name;
  }

  get firstname(): string {
    return this._data.firstname;
  }

  get lastname(): string {
    return this._data.lastname;
  }

  toJson(): string {
    const result = JSON.stringify(this._data);
    return result;
  }
}

export { User, JsonDataUser };
