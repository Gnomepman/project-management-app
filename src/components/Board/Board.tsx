import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Column } from '../Column/Column';

const tasks: taskType[] = [
  { _id: '1', description: 'description 1' },
  { _id: '2', description: 'description 2' },
  { _id: '3', description: 'description 3' },
];

const tasks2: taskType[] = [
  { _id: '4', description: 'description 4' },
  { _id: '5', description: 'description 5' },
  { _id: '6', description: 'description 6' },
  { _id: '7', description: 'description 7' },
  { _id: '8', description: 'description 8' },
  { _id: '9', description: 'description 9' },
  { _id: '10', description: 'description 10' },
  { _id: '11', description: 'description 11' },
  { _id: '12', description: 'description 12' },
  { _id: '13', description: 'description 13' },
  { _id: '14', description: 'description 14' },
  { _id: '15', description: 'description 15' },
];

//Colums have to be in an object, but from DB they come as an array
const columnsFromDB: Record<string, columnType> = {
  1: {
    _id: 'testId',
    title: 'Columntitle',
    order: 1,
    boardId: 'testBoardId',
    items: tasks,
  },
  2: {
    _id: 'testId',
    title: 'Columntitle',
    order: 2,
    boardId: 'testBoardId',
    items: tasks2,
  },
};

export function Board() {
  // const { id } = useParams();
  const [columns, setColumns] = useState(columnsFromDB);

  useEffect(() => {
    //fetch columns using id
  });
  return (
    <>
      <div className="container-xxl d-flex gap-4 p-3">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return <Column provided={provided} snapshot={snapshot} column={column} />;
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export type columnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  items: taskType[];
};

export type taskType = {
  _id: string;
  title?: string;
  order?: number;
  boardId?: string;
  columnId?: string;
  description: string;
  userId?: number;
  users?: [];
};

const onDragEnd = (
  result: DropResult,
  columns: Record<columnType['_id'], columnType>,
  setColumns: Dispatch<SetStateAction<Record<string, columnType>>>
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
