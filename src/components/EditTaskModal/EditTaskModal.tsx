import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ITaskResponse } from '../../models';
import { task } from '../../models/initial';
import { usePutTaskMutation } from '../../store/api/taskApi';
import { Loader } from '../Loader/Loader';

interface IEditTaskModalProps {
  setEditTaskModal: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  columnId: string;
  task: task;
  order: number;
}

export const EditTaskModal = ({
  setEditTaskModal,
  boardId,
  columnId,
  task,
  order,
}: IEditTaskModalProps) => {
  const { t } = useTranslation();
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');
  const [putTask, { isLoading }] = usePutTaskMutation();
  const [inputName, setInputName] = useState(task.title);
  const [inputDescription, setInputDescription] = useState(task.content);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputName.length < 4 || inputDescription.length < 4) {
      toast.error(t('tasks.min-length'), {
        autoClose: 2000,
      });
      return;
    }

    putTask({
      boardId: boardId,
      columnId: columnId,
      taskId: task.id,
      payload: {
        title: inputName,
        order: order,
        description: inputDescription,
        columnId: columnId,
        userId: userId,
        users: [userId],
      } as ITaskResponse,
    });
    setInputName('');
    setInputDescription('');
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>{t('tasks.modal.form.titleEdit')}</Form.Label>
            <Form.Control
              type="search"
              placeholder={String(t('tasks.modal.form.titlePlaceholder'))}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: '10px' }}>
            <Form.Label>{t('tasks.modal.form.descriptionEdit')}</Form.Label>
            <Form.Control
              type="search"
              placeholder={String(t('tasks.modal.form.descriptionPlaceholder'))}
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
          </Form.Group>
          <Modal.Footer style={{ paddingRight: '0px' }}>
            <Button
              variant="primary"
              onClick={(e) => {
                handleSubmit(e);
                setEditTaskModal(false);
              }}
              type="submit"
            >
              {t('boards.modal.confirm')}
            </Button>
            <Button variant="danger" onClick={() => setEditTaskModal(false)}>
              {t('modal.close')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};
