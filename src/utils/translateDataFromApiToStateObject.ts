import { initial, columnOrder } from '../models/initial';
import { IColumn, ITask } from '../models';

export const translateDataFromApiToStateObject = (
  columns: IColumn[],
  tasks: ITask[]
): initial | Record<string, never> => {
  if (!columns) return {};
  const result: initial = {
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  result.columns = columns.reduce(
    (obj, item: IColumn) => ({
      ...obj,
      [item._id as string]: { id: item._id, title: item.title, taskIds: [] },
    }),
    {}
  );

  result.columnOrder = [...columns]
    .sort((a, b) => a.order - b.order)
    .map((elem) => elem._id) as columnOrder;

  if (tasks) {
    result.tasks = tasks.reduce(
      (obj, item: ITask) => ({
        ...obj,
        [item._id as string]: { id: item._id, title: item.title, content: item.description },
      }),
      {}
    );
    tasks.forEach((task) => {
      if (result.columns[task.columnId]) result.columns[task.columnId].taskIds.push(task._id!);
    });
  }

  Object.keys(result.columns).forEach((columnId) => {
    result.columns[columnId].taskIds.sort(
      (a, b) =>
        tasks.find((elem) => elem._id === a)!.order - tasks.find((elem) => elem._id === b)!.order
    );
  });
  return result;
};
