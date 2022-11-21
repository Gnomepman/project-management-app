import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPoint } from '../../models';
import { API_URL } from '../../constants';

//Todo Recheck, fix and update
export const pointApi = createApi({
  reducerPath: 'point/api',
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
    getPoints: build.mutation({
      query: () => ({
        url: `tasks`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    postPoints: build.query<IPoint, string>({
      query: () => ({
        url: `tasks`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    patchPoints: build.mutation({
      query: (payload: IPoint) => ({
        url: `tasks`,
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getPointsById: build.query<IPoint, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        query: {
          id: taskId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    patchPointsById: build.query<IPoint, string>({
      query: (pointId) => ({
        url: `tasks/${pointId}`,
        method: 'PATCH',
        query: {
          id: pointId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    deletePoints: build.query<IPoint, string>({
      query: (pointId) => ({
        url: `tasks/${pointId}`,
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
  useGetPointsMutation,
  usePostPointsQuery,
  usePatchPointsMutation,
  useGetPointsByIdQuery,
  usePatchPointsByIdQuery,
  useDeletePointsQuery,
} = pointApi;
