import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import { taskType } from '../Board/Board';
import { task } from '../../models/initial';
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{props.task.title}</span>
              <span>{props.task.content}</span>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
