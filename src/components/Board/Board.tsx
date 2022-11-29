import { useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { Column } from '../Column/Column';
import { column, initial, task } from './initial-data';
import { useGetColumnsQuery, usePostColumnsMutation } from '../../store/api/columnApi';
import { IColumn } from '../../models';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useBoardActions } from '../../hooks/actions';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export function Board() {
  const { id } = useParams();
  const board = useSelector((state: RootState) => state.board.board);
  const { setBoard } = useBoardActions();
  const { data: columns, isLoading: columnsIsLoading } = useGetColumnsQuery(id!);
  const [postColumn] = usePostColumnsMutation();

  useEffect(() => {
    setBoard(translateDataFromApiToStateObject(columns!)! as initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

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
      <DragDropContext onDragEnd={(result) => onDragEnd(result, board, setBoard)}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => {
            if (!board) {
              return <p>Loading</p>;
            }
            return (
              <>
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="container-xxl d-flex gap-4 p-3"
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
  setState: ActionCreatorWithPayload<initial, 'boardSlice/setBoard'>
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

    const newState = {
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

const translateDataFromApiToStateObject = (columns: IColumn[]): initial | Record<string, never> => {
  if (!columns) return {};
  const result: initial = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
      'task-5': { id: 'task-5', content: 'Watch my favorite show' },
      'task-6': { id: 'task-6', content: 'Charge my phone' },
      'task-7': { id: 'task-7', content: 'Cook dinner' },
      'task-8': { id: 'task-8', content: 'Cook dinner' },
      'task-9': { id: 'task-9', content: 'Cook dinner' },
    },
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
  result.columnOrder = Array.from(Object.keys(result.columns));
  return result;
};
