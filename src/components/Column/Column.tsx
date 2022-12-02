import React from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { ITaskRes } from '../../models';
import { useDeleteColumnMutation } from '../../store/api/columnApi';
import { usePostTasksMutation } from '../../store/api/taskApi';
import { column, task } from '../../models/initial';
import { Task } from '../Task/Task';
import './Column.scss';

export function Column(props: {
  provided?: DroppableProvided;
  column: column;
  tasks: task[];
  index: number;
  boardId: string;
}) {
  const [delColumn] = useDeleteColumnMutation();
  const [postTask] = usePostTasksMutation();
  // const { id: userId } = JSON.parse(localStorage.getItem('user') || '');

  return (
    <>
      <Draggable draggableId={props.column.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            draggable={snapshot.isDragging}
            className="column"
            style={{
              background: snapshot.draggingOver ? 'rgb(224, 230, 243)' : 'rgb(222, 224, 231)',
              ...provided.draggableProps.style,
            }}
          >
            <div className="column_header" {...provided.dragHandleProps}>
              <span>{props.column.title}</span>
              <Button
                variant="danger"
                onClick={async () =>
                  await delColumn({ boardId: props.boardId, columnId: props.column.id })
                }
              >
                X
              </Button>
            </div>
            <Droppable droppableId={props.column.id} type="task">
              {(provided, snapshot) => (
                <div
                  className="column_container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  draggable={snapshot.isDraggingOver}
                  style={{
                    maxHeight: '410px',
                    overflowY: 'scroll',
                    paddingLeft: '5px',
                  }}
                >
                  <>
                    {props.tasks.length !== 0 ? (
                      <InnerListColumn tasks={props.tasks} key={props.column.id} />
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          border: '3px dashed black',
                          minHeight: '50px',
                          height: 'max-content',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                        }}
                      >
                        Drop here
                      </div>
                    )}
                    {provided.placeholder}
                  </>
                </div>
              )}
            </Droppable>
            <div className="column_footer">
              <Button
                variant="outline-primary"
                onClick={async () => {
                  await postTask({
                    boardId: props.boardId,
                    columnId: props.column.id,
                    payload: {
                      title: 'Column zero',
                      order: props.column.taskIds.length + 1,
                      description: 'Task 3',
                      userId: 0,
                      users: ['636d6464c02777e984c57dc1'],
                    } as ITaskRes,
                  });
                }}
              >
                Add task
              </Button>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}

const InnerListColumn = (props: { tasks: task[] }) => {
  return (
    <>
      {props.tasks.map((task, index) => (
        <>
          <Task key={task.id} task={task} index={index} />
        </>
      ))}
    </>
  );
};
