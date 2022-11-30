import React from 'react';
import { ITask, IErrorMessage, ITaskResponse } from '../models';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';
import {
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useGetTaskSetQuery,
  useGetTasksQuery,
  usePostTasksMutation,
  usePutTaskMutation,
} from '../store/api/taskApi';

export const TestTaskPage = () => {
  const boardId = '63763bacc02777e984c57e3a';
  const columnId = '63763ccdc02777e984c57e45';
  const taskId = '6383a1c5c02777e984c58950';

  // Get Tasks
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery({ boardId, columnId });

  // Post Task
  const mockTask = {
    title: 'Drink tea',
    order: 0,
    description: 'Drink hot coffee',
    userId: 0,
    users: ['636d6464c02777e984c57dc1'],
  };

  const [postTask] = usePostTasksMutation();

  // Get Task By ID
  const { data: task } = useGetTaskByIdQuery({ boardId, columnId, taskId });

  // Put Task
  const updMockTask: ITaskResponse = {
    title: 'Eat soup',
    order: 0,
    description: 'Dream',
    columnId: '63763ccdc02777e984c57e45',
    userId: 0,
    users: ['636d6464c02777e984c57dc1'],
  };

  const [putTask] = usePutTaskMutation();

  // Delete column
  const delTaskId = '638267d5c02777e984c585e5';
  const [deleteTask] = useDeleteTaskMutation();

  // useGetTaskSetQuery

  // usePatchTaskSetMutation

  // useGetTaskSetByBoardMutation

  const { data: taskSet } = useGetTaskSetQuery(boardId);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!tasks) return <div>Missing columns</div>;

  return (
    <>
      <h1 className="text-primary">Tasks</h1>

      <section>
        <h2 className="text-danger">Get Tasks</h2>

        {tasks.map((item: ITask) => (
          <p key={item._id}>
            <b>Task:</b> <i className="text-secondary">{item._id}</i> {item.title}
          </p>
        ))}
        <h5 className="text-primary">Number of tasks: {tasks.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add Task with mock</h2>
        {/*Form better to do with react-hook-form*/}
        <button
          onClick={() => {
            postTask({ boardId: boardId, columnId: columnId, payload: mockTask });
          }}
        >
          Add mock Task
        </button>
      </section>

      <section>
        <h2 className="text-danger">Get Task by Id</h2>
        {task && (
          <>
            <div>ID: {task._id}</div>
            <div>Title: {task.title}</div>
          </>
        )}
      </section>

      <section>
        <h2 className="text-danger">Put Task</h2>
        <button
          onClick={() => {
            putTask({ boardId: boardId, columnId: columnId, taskId: taskId, payload: updMockTask });
          }}
        >
          Put mock Task
        </button>
      </section>

      <section>
        <h2 className="text-danger">Delete Task</h2>
        <button
          onClick={() => {
            deleteTask({ boardId, columnId, taskId: delTaskId });
          }}
        >
          Delete mock Task
        </button>
      </section>

      <section>
        <h2 className="text-danger">useGetTaskSetQuery - not implemented</h2>
      </section>

      <section>
        <h2 className="text-danger">usePatchTaskSetMutation - not implemented</h2>
      </section>

      <section>
        <h2 className="text-danger">useGetTaskSetByBoardMutation</h2>
        {taskSet &&
          taskSet.map((item: ITask) => (
            <p key={item._id}>
              <b>Task:</b> <i className="text-secondary">{item._id}</i> {item.title}
            </p>
          ))}
        <h5 className="text-primary">Number of tasks: {taskSet?.length}</h5>
      </section>
    </>
  );
};
