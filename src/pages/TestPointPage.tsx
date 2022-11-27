import React from 'react';
import {
  useGetPointsQuery,
  usePostPointsMutation,
  usePatchPointsMutation,
  useGetPointsByTaskIdQuery,
  usePatchPointsByTaskIdMutation,
  useDeletePointsByTaskIdMutation,
} from '../store/api/pointApi';
import { IPoint, IPointRes, IErrorMessage } from '../models';
import { Loader } from '../components/Loader/Loader';
import { ErrorComponent } from '../components/Error/ErrorComponent';

export const TestPointPage = () => {
  const pointId = '6383a4c9c02777e984c58997';
  const taskId = '6383a1c5c02777e984c58950';

  // Get Points
  const { data: points, isLoading, isError, error } = useGetPointsQuery();

  const mockPoint: IPointRes = {
    title: 'testNewPoint',
    taskId: '6383a1c5c02777e984c58950',
    boardId: '63763bacc02777e984c57e3a',
    done: false,
  };

  // Post Points
  const [postPoint] = usePostPointsMutation();

  // Patch Points
  const updPatchPoint: IPointRes[] = [
    {
      _id: '6383a4c9c02777e984c58997',
      done: false,
    },
  ];
  const [patchPoints] = usePatchPointsMutation();

  // Get Point By Task ID
  const { data: point } = useGetPointsByTaskIdQuery(taskId);

  // Patch Point By Task ID
  const updMockPoint: IPointRes = {
    title: 'To fix new issue',
    done: false,
  };
  const [patchPointsByTaskId] = usePatchPointsByTaskIdMutation();

  // Delete point By Task ID
  const delPointId = '6383abeec02777e984c58a0f';
  const [deletePointsByTaskId] = useDeletePointsByTaskIdMutation();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;

  if (!points) return <div>Missing points</div>;

  return (
    <>
      <h1 className="text-primary">Points</h1>

      <section>
        <h2 className="text-danger">Get Points</h2>

        {points.map((item: IPoint) => (
          <p key={item._id}>
            <b>Point:</b> <i className="text-secondary">{item._id}</i> {item._id} {item.title}
          </p>
        ))}
        <h5 className="text-primary">Number of points: {points.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Add Points with mock</h2>
        {/*Form better to do with react-hook-form*/}
        <button
          onClick={() => {
            postPoint({ taskId: taskId, payload: mockPoint });
          }}
        >
          Add mock Point
        </button>
      </section>

      <section>
        <h2 className="text-danger">Patch Points</h2>
        <button
          onClick={() => {
            patchPoints(updPatchPoint);
          }}
        >
          Patch mock Point
        </button>
      </section>

      <section>
        <h2 className="text-danger">Get Point By Task Id</h2>
        {point &&
          point.map((item: IPoint) => (
            <p key={item._id}>
              <b>Point:</b> <i className="text-secondary">{item._id}</i> {item.title}
            </p>
          ))}
        <h5 className="text-primary">Number of points: {point?.length}</h5>
      </section>

      <section>
        <h2 className="text-danger">Patch Points By Task Id</h2>
        <button
          onClick={() => {
            patchPointsByTaskId({ pointId: pointId, payload: updMockPoint });
          }}
        >
          Patch mock Point
        </button>
      </section>

      <section>
        <h2 className="text-danger">Delete Point By Task Id</h2>
        <button
          onClick={() => {
            deletePointsByTaskId(delPointId);
          }}
        >
          Delete mock Point
        </button>
      </section>
    </>
  );
};
