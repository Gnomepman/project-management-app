import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
// import { useParams } from 'react-router-dom';
import { Column } from '../Column/Column';
import { column, initial, initialdata, task } from './initial-data';
// import { useGetBoardByIdQuery } from '../../store/api/boardApi';
// import { useGetColumnsQuery } from '../../store/api/columnApi';

export function Board() {
  // const { id } = useParams();
  const [state, setState] = useState(initialdata);
  // const { columns, columnsIsLoading } = useGetColumnsQuery(id!);

  useEffect(() => {
    //fetch columns using id
    // console.log(data);
  }, []);

  // if (columns) {
  //   console.log(columns);
  // }

  // if (columnsIsLoading)
  //   return (
  //     <>
  //       <p>loading...</p>
  //     </>
  //   );

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, state, setState)}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="container-xxl d-flex gap-4 p-3"
              style={{ overflowX: 'scroll' }}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                return (
                  <InnerList key={column.id} column={column} taskMap={state.tasks} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const InnerList = (props: { column: column; index: number; taskMap: Record<string, task> }) => {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} key={index} />;
};

const onDragEnd = (
  result: DropResult,
  state: initial,
  setState: Dispatch<SetStateAction<initial>>
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
