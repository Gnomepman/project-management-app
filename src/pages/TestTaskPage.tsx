import React from 'react';
import { IColumn, IErrorMessage } from '../models';
import { useGetTasksQuery } from '../store/api/taskApi';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';

export const TestTaskPage = () => {
  const boardId = '63763bacc02777e984c57e3a';
  const columnId = '63763ccdc02777e984c57e45';

  // Get Tasks
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery({ boardId, columnId });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!tasks) return <div>Missing columns</div>;

  return (
    <>
      <h1 className="text-primary">Tasks</h1>

      <section>
        <h2 className="text-danger">Get Tasks</h2>

        {tasks.map((item: IColumn) => (
          <p key={item._id}>
            <b>Column:</b> <i className="text-secondary">{item._id}</i> {item.title}
          </p>
        ))}
        <h5 className="text-primary">Number of tasks: {tasks.length}</h5>
      </section>
    </>
  );
};
