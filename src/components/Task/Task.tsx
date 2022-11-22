import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { taskType } from '../Board/Board';
import './Task.scss';

export function Task(props: {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: taskType;
}) {
  return (
    <>
      <div
        ref={props.provided.innerRef}
        {...props.provided.draggableProps}
        {...props.provided.dragHandleProps}
        className="task"
        style={{
          backgroundColor: props.snapshot.isDragging ? '#263B4A' : '#456C86',
          ...props.provided.draggableProps.style,
        }}
      >
        {props.item.description}
      </div>
    </>
  );
}
