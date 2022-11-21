export interface IToken {
  token: string;
}

export interface IParsedToken {
  id: string;
  export: string;
  iat: number;
  exp: number;
}
