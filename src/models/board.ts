export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: [string];
}

export interface IBoardRes {
  title: string;
  owner: string;
  users: [string];
}
