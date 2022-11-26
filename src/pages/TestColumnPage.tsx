import React from 'react';
import { IColumn, IColumnRes, IErrorMessage } from '../models';
import {
  useDeleteColumnMutation,
  useGetColumnByIdQuery,
  useGetColumnsQuery,
  usePostColumnsMutation,
  usePutColumnMutation,
} from '../store/api/columnApi';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';

export const TestColumnPage = () => {
  const boardId = '63763bacc02777e984c57e3a';
  const columnId = '6380d727c02777e984c583f3';

  // Get Columns
  const { data: columns, isLoading, isError, error } = useGetColumnsQuery(boardId);

  const mockColumn: IColumnRes = {
    title: 'testNewColumn',
    order: 0,
  };

  // Post Columns
  const [postColumn] = usePostColumnsMutation();

  // Get Column By ID
  const { data: column } = useGetColumnByIdQuery({ boardId, columnId });

  // Put Column
  const updMockColumn: IColumnRes = {
    title: 'To fix issue',
    order: 0,
  };

  const [putColumn] = usePutColumnMutation();

  // Delete column
  const [deleteColumn] = useDeleteColumnMutation();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!columns) return <div>Missing columns</div>;

  return (
    <>
      <h1 className="text-primary">Columns</h1>

      <section>
        <h2 className="text-danger">Get Columns</h2>

        {columns.map((item: IColumn) => (
          <p key={item._id}>
            <b>Column:</b> <i className="text-secondary">{item._id}</i> {item.title}
          </p>
        ))}
        <h5 className="text-primary">Number of columns: {columns.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add Column with mock</h2>
        {/*Form better to do with react-hook-form*/}
        <button
          onClick={() => {
            postColumn({ boardId: boardId, payload: mockColumn });
          }}
        >
          Add mock Column
        </button>
      </section>

      <section>
        <h2 className="text-danger">Get Column by Id</h2>
        {column && (
          <>
            <div>ID: {column._id}</div>
            <div>Title: {column.title}</div>
          </>
        )}
      </section>

      <section>
        <h2 className="text-danger">Put Column</h2>
        <button
          onClick={() => {
            putColumn({ boardId: boardId, columnId: columnId, payload: updMockColumn });
          }}
        >
          Put mock Column
        </button>
      </section>

      <section>
        <h2 className="text-danger">Delete Column</h2>
        <button
          onClick={() => {
            deleteColumn({ boardId, columnId });
          }}
        >
          Delete mock Column
        </button>
      </section>
    </>
  );
};
