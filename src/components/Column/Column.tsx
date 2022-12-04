import React, { useState } from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { useDeleteColumnMutation } from '../../store/api/columnApi';
import { column, task } from '../../models/initial';
import { Task } from '../Task/Task';
import './Column.scss';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { CreateTaskModal } from '../CreateTaskModal/CreateTaskModal';
import { useTranslation } from 'react-i18next';
import Delete from '../../assets/images/icons/delete.png';
import Edit from '../../assets/images/icons/edit.png';
import { DeleteModal } from '../DeleteModal/DeleteModal';

export function Column(props: {
  provided?: DroppableProvided;
  column: column;
  tasks: task[];
  index: number;
  boardId: string;
}) {
  const [delColumn] = useDeleteColumnMutation();
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');
  const { t } = useTranslation();
  const [check, setCheck] = useState(false);

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
              <Button className="action_button" onClick={() => alert('Todo: edit column')}>
                <img src={Edit} alt="edit" />
              </Button>
              <Button
                variant="danger"
                onClick={async () =>
                  await delColumn({ boardId: props.boardId, columnId: props.column.id })
                }
                className="action_button"
              >
                <img src={Delete} alt="delete" />
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
                        {t('board.dropPlaceholder')}
                      </div>
                    )}
                    {provided.placeholder}
                  </>
                </div>
              )}
            </Droppable>
            <div className="column_footer">
              <Button variant="outline-primary" onClick={() => setCreateTaskModal(true)}>
                {t('board.taskCreation')}
              </Button>
              <ModalComponent
                show={createTaskModal}
                title={t('tasks.modal.creating')}
                onHide={() => setCreateTaskModal(false)}
                setModal={setCreateTaskModal}
              >
                <CreateTaskModal
                  setCreateTaskModal={setCreateTaskModal}
                  columnId={props.column.id}
                  order={props.column.taskIds.length + 1}
                  userId={userId}
                />
              </ModalComponent>
            </div>
          </div>
        )}
      </Draggable>
      <DeleteModal
        description={t('auth.warning-task')}
        title={t('auth.delete-task')}
        check={check}
        setCheck={setCheck}
        handleDelete={() => console.log('delete')}
      />
    </>
  );
}

const InnerListColumn = (props: { tasks: task[] }) => {
  return (
    <>
      {props.tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </>
  );
};
