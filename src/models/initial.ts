export type initial = {
  tasks: Record<string, task>;
  columns: Record<string, column>;
  columnOrder: columnOrder;
};

export type task = {
  id: string;
  title: string;
  content: string;
};

export type column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type columnOrder = string[];
