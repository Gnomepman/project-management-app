export interface ITask {
  id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: [string];
}

export interface ITaskResp {
  _id: string;
  order: number;
  columnId: string;
}
