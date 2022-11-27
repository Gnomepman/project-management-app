import { createApi } from '@reduxjs/toolkit/query/react';
import { IPoint, IPointRes } from '../../models';
import { baseQuery } from './baseQuery';

//Todo Recheck, fix and update
export const pointApi = createApi({
  reducerPath: 'point/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getPoints: build.query<IPoint[], void>({
      query: () => ({
        url: `points`,
      }),
    }),

    postPoints: build.mutation<IPointRes, { taskId: string; payload: IPointRes }>({
      query: ({ taskId, payload }) => ({
        url: `points`,
        method: 'POST',
        query: {
          id: taskId,
        },
        body: payload,
      }),
    }),

    patchPoints: build.mutation<IPointRes[], IPointRes[]>({
      query: (payload: IPointRes[]) => ({
        url: `points`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getPointsByTaskId: build.query<IPoint[], string>({
      query: (taskId) => ({
        url: `points/${taskId}`,
        query: {
          id: taskId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    patchPointsByTaskId: build.mutation<IPoint, { pointId: string; payload: IPointRes }>({
      query: ({ pointId, payload }) => ({
        url: `points/${pointId}`,
        method: 'PATCH',
        query: {
          id: pointId,
        },
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    deletePointsByTaskId: build.mutation<IPoint, string>({
      query: (pointId) => ({
        url: `points/${pointId}`,
        method: 'DELETE',
        query: {
          id: pointId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const {
  useGetPointsQuery,
  usePostPointsMutation,
  usePatchPointsMutation,
  useGetPointsByTaskIdQuery,
  usePatchPointsByTaskIdMutation,
  useDeletePointsByTaskIdMutation,
} = pointApi;
