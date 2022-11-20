export interface IError {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
}
