import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { DropResult } from 'react-beautiful-dnd';
import { initial } from '../models/initial';
import { IColumnRes, IColumn, ITaskRes, ITaskResponse } from '../models';

export const onDragEnd = (
  result: DropResult,
  state: initial,
  setState: ActionCreatorWithPayload<initial, 'boardSlice/setBoard'>,
  putColumn: MutationTrigger<
    MutationDefinition<
      {
        boardId: string;
        columnId: string;
        payload: IColumnRes;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, never>,
        FetchBaseQueryMeta
      >,
      'Column',
      IColumn,
      'column/api'
    >
  >,
  putTask: MutationTrigger<
    MutationDefinition<
      {
        boardId: string;
        columnId: string;
        taskId: string;
        payload: ITaskRes;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, never>,
        FetchBaseQueryMeta
      >,
      'Task',
      ITaskResponse,
      'task/api'
    >
  >,
  boardId: string
) => {
  const { destination, source, draggableId, type } = result;

  if (!destination) {
    return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  if (type === 'column') {
    const newColumnOrder = Array.from(state.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);
    newColumnOrder.slice(Math.min(destination.index, source.index)).forEach((elem) => {
      putColumn({
        boardId: boardId,
        columnId: elem,
        payload: {
          title: state.columns[elem].title,
          order: newColumnOrder.indexOf(elem),
        },
      });
    });

    const newState: initial = {
      ...state,
      columnOrder: newColumnOrder,
    };
    setState(newState);
    return;
  }

  const home = state.columns[source.droppableId];
  const foreign = state.columns[destination.droppableId];
  const userId = JSON.parse(localStorage.getItem('user')!).id!;

  //if moving task in one column
  if (home === foreign) {
    const newTaskIds = Array.from(home.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newHome = {
      ...home,
      taskIds: newTaskIds,
    };
    newTaskIds.slice(destination.index).forEach((elem) => {
      putTask({
        boardId,
        columnId: home.id,
        taskId: elem,
        payload: {
          title: state.tasks[elem].title,
          order: newTaskIds.indexOf(elem),
          description: state.tasks[elem].content,
          columnId: home.id,
          userId: userId,
          users: [userId],
        } as ITaskRes,
      });
    });

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
      },
    };

    setState(newState);
    return;
  }

  // moving from one list to another
  const homeTaskIds = Array.from(home.taskIds);
  homeTaskIds.splice(source.index, 1);
  const newHome = {
    ...home,
    taskIds: homeTaskIds,
  };
  homeTaskIds.slice(source.index).forEach((elem) => {
    putTask({
      boardId,
      columnId: newHome.id,
      taskId: elem,
      payload: {
        title: state.tasks[elem].title,
        order: homeTaskIds.indexOf(elem),
        description: state.tasks[elem].content,
        columnId: home.id,
        userId: userId,
        users: [userId],
      } as ITaskRes,
    });
  });

  const foreignTaskIds = Array.from(foreign.taskIds);
  foreignTaskIds.splice(destination.index, 0, draggableId);
  const newForeign = {
    ...foreign,
    taskIds: foreignTaskIds,
  };
  foreignTaskIds.slice(destination.index).forEach((elem) => {
    putTask({
      boardId,
      columnId: newForeign.id,
      taskId: elem,
      payload: {
        title: state.tasks[elem].title,
        order: foreignTaskIds.indexOf(elem),
        description: state.tasks[elem].content,
        columnId: foreign.id,
        userId: userId,
        users: [userId],
      } as ITaskRes,
    });
  });

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newHome.id]: newHome,
      [newForeign.id]: newForeign,
    },
  };
  setState(newState);
};
