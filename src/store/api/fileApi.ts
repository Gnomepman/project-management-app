import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile } from '../../models';
import { baseQuery } from './baseQuery';

// Todo Recheck, fix and update
export const fileApi = createApi({
  reducerPath: 'file/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getFile: build.query<IFile[], { userId: string; taskId: string }>({
      query: (arg) => {
        const { userId, taskId } = arg;
        return {
          url: 'file/',
          params: { userId, taskId },
        };
      },
    }),

    postFile: build.mutation<IFile, File>({
      query: (payload) => ({
        url: 'file',
        method: 'POST',
        body: payload,
      }),
    }),

    getFileByBoardId: build.query<IFile[], string>({
      query: (boardId) => ({
        url: `file/${boardId}`,
        query: {
          id: boardId,
        },
      }),
    }),

    deleteFileByFieldId: build.mutation<IFile, string>({
      query: (fieldId) => ({
        url: `file/${fieldId}`,
        method: 'DELETE',
        query: {
          id: fieldId,
        },
      }),
    }),
  }),
});

export const {
  useGetFileQuery,
  usePostFileMutation,
  useGetFileByBoardIdQuery,
  useDeleteFileByFieldIdMutation,
} = fileApi;
