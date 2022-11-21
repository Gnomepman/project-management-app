import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../../models';
import { API_URL } from '../../constants';

//Todo Recheck, fix and update
export const taskApi = createApi({
  reducerPath: 'task/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getTasks: build.mutation({
      query: () => ({
        url: `tasksSet`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    patchTasks: build.mutation({
      query: (payload: ITask) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getTasksByBoard: build.mutation({
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
