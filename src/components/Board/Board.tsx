import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { Column } from '../Column/Column';
import { column, columnOrder, initial, task } from './initial-data';
import { useGetColumnsQuery, usePostColumnsMutation } from '../../store/api/columnApi';
import { IColumn, IColumnRes, ITask } from '../../models';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useBoardActions } from '../../hooks/actions';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useGetTaskSetByBoardQuery } from '../../store/api/taskApi';
import { useGetBoardByIdQuery } from '../../store/api/boardApi';
import { usePutColumnMutation } from '../../store/api/columnApi';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';

export function Board() {
  const { id } = useParams();
  const board = useSelector((state: RootState) => state.board.board);
  const { setBoard } = useBoardActions();
  const { data: columns, isLoading: columnsIsLoading } = useGetColumnsQuery(id!);
  const { data: tasks } = useGetTaskSetByBoardQuery(id!);
  const [postColumn] = usePostColumnsMutation();
  const { data } = useGetBoardByIdQuery(id!);
  const [putColumn] = usePutColumnMutation();

  useEffect(() => {
    setBoard(translateDataFromApiToStateObject(columns!, tasks!)! as initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, tasks]);

  const createColumn = async () => {
    await postColumn({
      boardId: id!,
      payload: {
        title: 'testNewColumn', //TODO: get name from modal
        order: board.columnOrder.length + 1,
      },
    });
  };

  if (columnsIsLoading)
    return (
      <>
        <p>loading...</p>
      </>
    );

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, board, setBoard, putColumn, id!)}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => {
            if (!board) {
              return <p>Loading</p>;
            }
            return (
              <>
                <div
                  style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                  className="py-2"
                >
                  <Link to="/boards">
                    <Button>Back</Button>
                  </Link>
                  <div className="h4 m-0">{data?.title}</div>
                </div>
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="container-xxl d-flex gap-4 p-0"
                  style={{ overflowX: 'scroll', height: 'maxContent' }}
                >
                  <>
                    {board.columnOrder &&
                      board.columnOrder.map((columnId, index) => {
                        const column = board.columns[columnId];
                        return (
                          <InnerList
                            key={column.id}
                            column={column}
                            taskMap={board.tasks}
                            index={index}
                            boardId={id!}
                          />
                        );
                      })}
                    {provided.placeholder}
                    <Button onClick={createColumn} style={{ minWidth: '200px', height: '50px' }}>
                      Create column
                    </Button>
                  </>
                </div>
              </>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const InnerList = (props: {
  column: column;
  index: number;
  taskMap: Record<string, task>;
  boardId: string;
}) => {
  const { column, taskMap, index, boardId } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} key={index} boardId={boardId} />;
};

const onDragEnd = (
  result: DropResult,
  state: initial,
  setState: ActionCreatorWithPayload<initial, 'boardSlice/setBoard'>,
  putColumn: MutationTrigger<
    MutationDefinition<
      {
        boardId: string;
        columnId: string;
        payload: IColumnRes;
      },
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, never>,
        FetchBaseQueryMeta
      >,
      'Column',
      IColumn,
      'column/api'
    >
  >,
  boardId: string
) => {
  const { destination, source, draggableId, type } = result;

  if (!destination) {
    return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  if (type === 'column') {
    const newColumnOrder = Array.from(state.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);
    newColumnOrder.slice(destination.index).forEach((elem) => {
      putColumn({
        boardId: boardId,
        columnId: elem,
        payload: {
          title: state.columns[elem].title,
          order: newColumnOrder.indexOf(elem),
        },
      });
    });

    const newState: initial = {
      ...state,
      columnOrder: newColumnOrder,
    };
    setState(newState);
    return;
  }

  const home = state.columns[source.droppableId];
  const foreign = state.columns[destination.droppableId];

  if (home === foreign) {
    const newTaskIds = Array.from(home.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newHome = {
      ...home,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
      },
    };

    setState(newState);
    return;
  }

  // moving from one list to another
  const homeTaskIds = Array.from(home.taskIds);
  homeTaskIds.splice(source.index, 1);
  const newHome = {
    ...home,
    taskIds: homeTaskIds,
  };

  const foreignTaskIds = Array.from(foreign.taskIds);
  foreignTaskIds.splice(destination.index, 0, draggableId);
  const newForeign = {
    ...foreign,
    taskIds: foreignTaskIds,
  };

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newHome.id]: newHome,
      [newForeign.id]: newForeign,
    },
  };
  setState(newState);
};

const translateDataFromApiToStateObject = (
  columns: IColumn[],
  tasks: ITask[]
): initial | Record<string, never> => {
  if (!columns) return {};
  const result: initial = {
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  result.columns = columns.reduce(
    (obj, item: IColumn) => ({
      ...obj,
      [item._id as string]: { id: item._id, title: item.title, taskIds: [] },
    }),
    {}
  );

  result.columnOrder = [...columns]
    .sort((a, b) => a.order - b.order)
    .map((elem) => elem._id) as columnOrder;

  if (tasks) {
    result.tasks = tasks.reduce(
      (obj, item: ITask) => ({
        ...obj,
        [item._id as string]: { id: item._id, title: item.title, content: item.description },
      }),
      {}
    );
    tasks.forEach((task) => {
      if (result.columns[task.columnId]) result.columns[task.columnId].taskIds.push(task._id!);
    });
  }
  return result;
};
