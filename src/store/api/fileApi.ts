import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile } from '../../models';
import { baseQuery } from './baseQuery';

// Todo Recheck, fix and update
export const fileApi = createApi({
  reducerPath: 'file/api',
  baseQuery: baseQuery,
  tagTypes: ['File'],

  endpoints: (build) => ({
    getFile: build.query<IFile[], { userId: string; taskId: string }>({
      query: (arg) => {
        const { userId, taskId } = arg;
        return {
          url: 'file/',
          params: { userId, taskId },
        };
      },
      providesTags: ['File'],
    }),

    postFile: build.mutation<IFile, File>({
      query: (payload) => ({
        url: 'file',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['File'],
    }),

    getFileByBoardId: build.query<IFile[], string>({
      query: (boardId) => ({
        url: `file/${boardId}`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['File'],
    }),

    deleteFileByFieldId: build.mutation<IFile, string>({
      query: (fieldId) => ({
        url: `file/${fieldId}`,
        method: 'DELETE',
        query: {
          id: fieldId,
        },
      }),
      invalidatesTags: ['File'],
    }),
  }),
});

export const {
  useGetFileQuery,
  usePostFileMutation,
  useGetFileByBoardIdQuery,
  useDeleteFileByFieldIdMutation,
} = fileApi;
