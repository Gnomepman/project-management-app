export interface IUser {
  id?: string;
  name?: string;
  login: string;
  password: string;
}

export interface IRegistration {
  name: string;
  login: string;
  password: string;
}

export interface IRegResponse {
  _id: string;
  name: string;
  login: string;
}

export interface ILogin {
  login: string;
  password: string;
}
