import React from 'react';
import {
  useDeleteBoardMutation,
  useGetBoardByIdQuery,
  useGetBoardsQuery,
  usePostBoardsMutation,
  usePutBoardMutation,
} from '../store/api/boardApi';
import { IBoard, IErrorMessage } from '../models';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';
import { TestColumnPage } from './TestColumnPage';
import { TestTaskPage } from './TestTaskPage';
import { TestFilePage } from './TestFilePage';
import { TestPointPage } from './TestPointPage';

// TODO REMOVE BEFORE DEADLINE
export const TestPage = () => {
  // Get Boards
  const { data: boards, isLoading, isError, error } = useGetBoardsQuery();

  const mockBoard: IBoard = {
    title: 'testNewBoard',
    owner: '6383a160c02777e984c5892c',
    users: ['6383a160c02777e984c5892c'],
  };

  // Post Boards
  const [postBoard] = usePostBoardsMutation();

  // Get Board By ID

  // here we use mockId, but need to be form data
  const mockId = '63763bacc02777e984c57e3a';

  const { data: board } = useGetBoardByIdQuery(mockId);

  // Put Board
  const updMockId = '6383a1b2c02777e984c58935';
  const updMockBoard: IBoard = {
    title: 'UPD Add Redux, Redux Toolkit',
    owner: '636d6464c02777e984c57dc1',
    users: ['636d6464c02777e984c57dc1'],
  };

  const [putBoard] = usePutBoardMutation();

  // Delete board
  const delMockId = '6385e65bffda31def0424011';
  const [deleteBoard] = useDeleteBoardMutation();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!boards) return <div>Missing boards</div>;

  return (
    <>
      <h1 className="text-primary">Boards</h1>

      <section>
        <h2 className="text-danger">Get Boards</h2>

        {boards.map((item: IBoard) => (
          <p key={item._id}>
            <b>Board:</b> <i className="text-secondary">{item._id}</i> {item.title}
          </p>
        ))}
        <h5 className="text-primary">Number of boards: {boards.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add Board with mock</h2>
        {/*Form better to do with react-hook-form*/}
        <button
          onClick={() => {
            postBoard(mockBoard);
          }}
        >
          Add mock Board
        </button>
      </section>

      <section>
        <h2 className="text-danger">Get Board by Id</h2>
        {board && (
          <>
            <div>ID: {board._id}</div>
            <div>Title: {board.title}</div>
          </>
        )}
      </section>

      <section>
        <h2 className="text-danger">Put Board</h2>
        <button
          onClick={() => {
            putBoard({ boardId: updMockId, payload: updMockBoard });
          }}
        >
          Put mock Board
        </button>
      </section>

      <section>
        <h2 className="text-danger">Delete Board</h2>
        <button
          onClick={() => {
            deleteBoard(delMockId);
          }}
        >
          Delete mock Board
        </button>
      </section>

      <section>
        <h2 className="text-danger">useGetBoardSetQuery - not implemented</h2>
      </section>

      <section>
        <h2 className="text-danger">useGetBoardSetByUserIdQuery - not implemented</h2>
      </section>

      <hr></hr>
      <TestColumnPage />
      <hr></hr>
      <TestTaskPage />
      <hr></hr>
      <TestFilePage />
      <hr></hr>
      <TestPointPage />
    </>
  );
};
