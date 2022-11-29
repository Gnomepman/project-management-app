export interface IPoint {
  _id: string;
  title: string;
  taskId: number;
  boardId: string;
  done: boolean;
}

export interface IPointRes {
  _id?: string;
  title?: string;
  taskId?: string;
  boardId?: string;
  done?: boolean;
}
