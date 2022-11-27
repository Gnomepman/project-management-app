export interface IFile {
  id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IFileRes {
  name: string;
  lastModified: number;
  size: number;
  type: string;
}
