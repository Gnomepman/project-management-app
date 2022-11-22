import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { columnType } from '../Board/Board';
import { Task } from '../Task/Task';
import './Column.scss';

export function Column(props: {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  column: columnType;
}) {
  return (
    <div
      {...props.provided.droppableProps}
      ref={props.provided.innerRef}
      className="column"
      style={{
        background: props.snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
      }}
    >
      <div className="column_header">
        <span>Column title</span>
        <Button variant="outline-danger" size="sm" className="d-flex align-self-end">
          X
        </Button>
      </div>
      <div className="column_container">
        {props.column.items.map((item, index) => {
          return (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided, snapshot) => {
                return <Task provided={provided} snapshot={snapshot} item={item} />;
              }}
            </Draggable>
          );
        })}
        {props.provided.placeholder}
      </div>
      <Button variant="outline-light" className="d-flex">
        Add task
      </Button>
    </div>
  );
}
