import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { task } from '../../models/initial';
import './Task.scss';
import Delete from '../../assets/images/icons/delete.png';
import Edit from '../../assets/images/icons/edit.png';
import { useState } from 'react';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { useDeleteTaskMutation } from '../../store/api/taskApi';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { EditTaskModal } from '../EditTaskModal/EditTaskModal';

export function Task(props: {
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  task: task;
  index: number;
  boardId: string;
  columnId: string;
}) {
  const { t } = useTranslation();
  const [isHoveringOverTask, setIsHoveringOverTask] = useState(false);
  const [showTaskDeleteModal, setShowTaskDeleteModal] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [editTaskModal, setEditTaskModal] = useState(false);

  const handleMouseOver = () => {
    setIsHoveringOverTask(true);
  };

  const handleMouseOut = () => {
    setIsHoveringOverTask(false);
  };

  return (
    <>
      <Draggable draggableId={props.task.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            draggable={snapshot.isDragging}
            className="task"
            style={{
              backgroundColor: snapshot.isDragging ? 'rgb(50, 96, 122)' : 'rgb(61, 114, 145)',
              ...provided.draggableProps.style,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }} className="task_header">
                <span
                  style={{
                    fontSize: '19px',
                    fontWeight: '500',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {props.task.title}
                </span>
                {isHoveringOverTask && (
                  <>
                    <Button
                      className="action_button"
                      onClick={() => setEditTaskModal(true)}
                      variant="outline-primary"
                    >
                      <img src={Edit} alt="edit" />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={async () => {
                        setShowTaskDeleteModal(true);
                      }}
                      className="action_button"
                    >
                      <img src={Delete} alt="delete" />
                    </Button>
                  </>
                )}
              </div>
              <span style={{ fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {props.task.content}
              </span>
            </div>
          </div>
        )}
      </Draggable>
      <DeleteModal
        description={t('tasks.modal.warning')}
        title={t('tasks.modal.deleting')}
        check={showTaskDeleteModal}
        setCheck={setShowTaskDeleteModal}
        handleDelete={() =>
          deleteTask({ boardId: props.boardId, columnId: props.columnId, taskId: props.task.id })
        }
      />
      <ModalComponent
        show={editTaskModal}
        title={t('tasks.modal.editing')}
        onHide={() => setEditTaskModal(false)}
        setModal={setEditTaskModal}
      >
        <EditTaskModal
          setEditTaskModal={setEditTaskModal}
          boardId={props.boardId}
          columnId={props.columnId}
          order={props.index}
          task={props.task}
        ></EditTaskModal>
      </ModalComponent>
    </>
  );
}
