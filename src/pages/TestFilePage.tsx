import React from 'react';
import {
  useGetFileQuery,
  usePostFileMutation,
  useGetFileByBoardIdQuery,
  useDeleteFileByFieldIdMutation,
} from '../store/api/fileApi';
import { IErrorMessage } from '../models';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';

export const TestFilePage = () => {
  const boardId = '63763bacc02777e984c57e3a';
  const taskId = '6383a1c5c02777e984c58950';
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');

  // Get File
  const {
    data: files,
    isLoading,
    isError,
    error,
  } = useGetFileQuery({ userId: userId, taskId: taskId });
  console.log(files);

  const [postFile] = usePostFileMutation();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files || [];
    postFile(files[0]);
  };

  // Get File By Board ID
  const { data: file } = useGetFileByBoardIdQuery(boardId);

  // Delete file
  const delFileId = '638267d5c02777e984c585e5';
  const [deleteFile] = useDeleteFileByFieldIdMutation();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!files) return <div>Missing columns</div>;

  return (
    <>
      <h1 className="text-primary">Files</h1>

      <section>
        <h2 className="text-danger">Get Files</h2>

        {files.map((item) => (
          <p key={item.name}>
            <b>File:</b> <i className="text-secondary">{item._id}</i> {item.name}
          </p>
        ))}
        <h5 className="text-primary">Number of files: {files.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add File - HAVEN T WORK YET</h2>
        {/*Form better to do with react-hook-form*/}
        <input type="file" onChange={handleOnChange} placeholder="add file" />
      </section>

      <section>
        <h2 className="text-danger">Get File by Board Id</h2>
        {file &&
          file.map((item) => (
            <p key={item.name}>
              <b>File:</b> <i className="text-secondary">{item._id}</i> {item.name}
            </p>
          ))}
        <h5 className="text-primary">Number of files: {file?.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Delete File By Id</h2>
        <button
          onClick={() => {
            deleteFile(delFileId);
          }}
        >
          Delete mock File
        </button>
      </section>
    </>
  );
};
