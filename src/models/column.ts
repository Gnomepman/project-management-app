export interface IColumn {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnRes {
  title: string;
  order: number;
}
