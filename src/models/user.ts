export interface IUser {
  id?: string;
  name?: string;
  login: string;
  password: string;
}

export interface IRegistaration {
  name: string;
  login: string;
  password: string;
}

export interface ILogin {
  login: string;
  password: string;
}
