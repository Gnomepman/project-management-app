import { createApi } from '@reduxjs/toolkit/query/react';
import { ITask, ITaskRes, ITaskResponse } from '../../models';
import { baseQuery } from './baseQuery';

//Todo Recheck, fix and update
export const taskApi = createApi({
  reducerPath: 'task/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getTasks: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        query: {
          id: boardId,
        },
      }),
    }),

    postTasks: build.mutation<ITaskRes, { boardId: string; columnId: string; payload: ITaskRes }>({
      query({ boardId, columnId, payload }) {
        return {
          url: `boards/${boardId}/columns/${columnId}/tasks`,
          method: 'POST',
          body: payload,
          query: {
            id: boardId,
          },
        };
      },
    }),

    getTaskById: build.query<ITask, Record<string, string>>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        query: {
          boardId: boardId,
          columnId: columnId,
          taskId: taskId,
        },
      }),
    }),

    putTask: build.mutation<
      ITaskResponse,
      { boardId: string; columnId: string; taskId: string; payload: ITaskRes }
    >({
      query({ boardId, columnId, taskId, payload }) {
        return {
          url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
          method: 'PUT',
          body: payload,
          query: {
            id: boardId,
          },
        };
      },
    }),

    deleteTask: build.mutation<ITask, Record<string, string>>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),

    getTaskSet: build.mutation<ITask[], void>({
      query: () => ({
        url: `tasksSet`,
      }),
    }),

    patchTaskSet: build.mutation<ITaskRes[], ITask>({
      query: (payload) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: payload,
      }),
    }),

    getTasksByBoard: build.mutation<ITask, string>({
      query: (boardId) => ({
        url: `tasksSet/${boardId}`,
        query: {
          id: boardId,
        },
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  usePostTasksMutation,
  useGetTaskByIdQuery,
  useGetTasksByBoardMutation,
  usePutTaskMutation,
  usePatchTaskSetMutation,
  useDeleteTaskMutation,
} = taskApi;
