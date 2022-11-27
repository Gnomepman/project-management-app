import React from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { column, task } from '../Board/initial-data';
import { Task } from '../Task/Task';
import './Column.scss';

export function Column(props: {
  provided?: DroppableProvided;
  column: column;
  tasks: task[];
  index: number;
}) {
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
              background: snapshot.draggingOver ? 'lightblue' : 'lightgrey',
              ...provided.draggableProps.style,
            }}
          >
            <div className="column_header" {...provided.dragHandleProps}>
              <span>{props.column.title}</span>
              <Button variant="danger">X</Button>
            </div>
            <div className="column_container">
              <Droppable droppableId={props.column.id} type="task">
                {(provided, snapshot) => (
                  <div
                    className="column_container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    draggable={snapshot.isDraggingOver}
                    style={{ maxHeight: '400px', overflowY: 'scroll' }}
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
            </div>
            <div className="column_footer">
              <Button variant="outline-primary">Add task</Button>
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
