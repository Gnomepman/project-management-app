export interface ITask {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: [string];
}

export interface ITaskRes {
  title: string;
  order: number;
}

export interface ITaskResponse {
  title: string;
  order: number;
  description: string;
  columnId: string;
  userId: number;
  users: [string];
}
