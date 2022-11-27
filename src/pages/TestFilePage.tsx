import React from 'react';
import {
  useGetFileQuery,
  usePostFileMutation,
  useGetFileByIdQuery,
  useDeleteFileMutation,
} from '../store/api/fileApi';
import { IErrorMessage, IFile, IFileRes, ILogin } from '../models';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';
import { SubmitHandler, useForm } from 'react-hook-form';

export const TestFilePage = () => {
  const boardId = '63763bacc02777e984c57e3a';
  const fileId = '6382657dc02777e984c58585';
  const { id: userId } = JSON.parse(sessionStorage.getItem('user') || '');

  // Get Files
  const { data: files, isLoading, isError, error } = useGetFileQuery();
  console.log(files);

  const [postFile] = usePostFileMutation();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files || [];
    postFile(files[0]);
  };

  // Get File By ID
  const { data: file } = useGetFileByIdQuery(boardId);

  // Delete column
  const delFileId = '638267d5c02777e984c585e5';
  const [deleteFile] = useDeleteFileMutation();

  if (isLoading) return <Loader />;
  // if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!files) return <div>Missing columns</div>;

  return (
    <>
      <h1 className="text-primary">Files</h1>

      <section>
        <h2 className="text-danger">Get Files</h2>

        {files.map((item) => (
          <p key={item.name}>
            <b>File:</b> <i className="text-secondary">{item.name}</i> {item.name}
          </p>
        ))}
        <h5 className="text-primary">Number of files: {files.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add File</h2>
        {/*Form better to do with react-hook-form*/}
        <input type="file" onChange={handleOnChange} placeholder="add file" />
      </section>

      {/*<section>*/}
      {/*  <h2 className="text-danger">Get File by Id</h2>*/}
      {/*  {file && (*/}
      {/*    <>*/}
      {/*      <div>ID: {file._id}</div>*/}
      {/*      <div>Title: {file.title}</div>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</section>*/}

      {/*<section>*/}
      {/*  <h2 className="text-danger">Delete File</h2>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      deleteFile(delFileId);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Delete mock File*/}
      {/*  </button>*/}
      {/*</section>*/}
    </>
  );
};
