import { createApi } from '@reduxjs/toolkit/query/react';
import { ITask, ITaskResp } from '../../models';
import { baseQuery } from './baseQuery';

//Todo Recheck, fix and update
export const taskApi = createApi({
  reducerPath: 'task/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getTasks: build.mutation<ITask[], void>({
      query: () => ({
        url: `tasksSet`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    patchTasks: build.mutation<ITaskResp[], ITask>({
      query: (payload) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getTasksByBoard: build.mutation<ITask, string>({
      query: (boardId) => ({
        url: `tasksSet/${boardId}`,
        query: {
          id: boardId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetTasksMutation, usePatchTasksMutation, useGetTasksByBoardMutation } = taskApi;
