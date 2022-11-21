import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFile } from '../../models';
import { API_URL } from '../../constants';

// Todo Recheck, fix and update
export const fileApi = createApi({
  reducerPath: 'file/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getFile: build.mutation({
      query: () => ({
        url: `file`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    postFile: build.query<IFile, string>({
      query: (id) => ({
        url: `columns/${id}`,
        method: 'POST',
        query: {
          id: id,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getFileById: build.query<IFile, string>({
      query: (boardId) => ({
        url: `file/${boardId}`,
        query: {
          id: boardId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    deleteFile: build.query<IFile, string>({
      query: (fieldId) => ({
        url: `file/${fieldId}`,
        method: 'DELETE',
        query: {
          id: fieldId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetFileMutation, usePostFileQuery, useGetFileByIdQuery, useDeleteFileQuery } =
  fileApi;
