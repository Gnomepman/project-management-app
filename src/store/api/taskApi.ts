import { createApi } from '@reduxjs/toolkit/query/react';
import { ITask, ITaskRes, ITaskResponse } from '../../models';
import { baseQuery } from './baseQuery';

export const taskApi = createApi({
  reducerPath: 'task/api',
  baseQuery: baseQuery,
  tagTypes: ['Task'],

  endpoints: (build) => ({
    getTasks: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Task'],
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
      invalidatesTags: ['Task'],
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
      providesTags: ['Task'],
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
      invalidatesTags: ['Task'],
    }),

    putTaskWithoutRefetch: build.mutation<
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
      invalidatesTags: ['Task'],
    }),

    getTaskSet: build.query<ITask[], void>({
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

    getTaskSetByBoard: build.query<ITask[], string>({
      query: (boardId) => ({
        url: `tasksSet/${boardId}`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  usePostTasksMutation,
  useGetTaskByIdQuery,
  usePutTaskMutation,
  useDeleteTaskMutation,
  useGetTaskSetQuery,
  usePatchTaskSetMutation,
  useGetTaskSetByBoardQuery,
  usePutTaskWithoutRefetchMutation,
} = taskApi;
