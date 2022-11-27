import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile } from '../../models';
import { baseQuery } from './baseQuery';

// Todo Recheck, fix and update
export const fileApi = createApi({
  reducerPath: 'file/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getFile: build.query<IFile[], void>({
      query: () => ({
        url: `file`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    postFile: build.mutation<IFile, File>({
      query: (payload) => ({
        url: `file`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: payload,
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

    deleteFile: build.mutation<IFile, string>({
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
export const { useGetFileQuery, usePostFileMutation, useGetFileByIdQuery, useDeleteFileMutation } =
  fileApi;
