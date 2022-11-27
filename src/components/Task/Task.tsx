import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import { taskType } from '../Board/Board';
import { task } from '../Board/initial-data';
import './Task.scss';

export function Task(props: {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  task: task;
  index: number;
}) {
  return (
    <>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            draggable={snapshot.isDragging}
            className="task"
            style={{
              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              ...provided.draggableProps.style,
            }}
          >
            {props.task.content}
          </div>
        )}
      </Draggable>
      {/* <div
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
        className="task"
        style={{
          backgroundColor: props.snapshot.isDragging ? '#263B4A' : '#456C86',
          ...props.provided.draggableProps.style,
        }}
      >
        {props.task.description}
      </div> */}
    </>
  );
}
