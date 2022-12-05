export interface IMessage {
  message: string;
}

export interface IErrorMessage {
  data: IError;
  status: number;
}

export interface IError {
  message: string;
  statusCode: number;
}
