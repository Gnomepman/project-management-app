import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ITaskResponse } from '../../models';
import { usePutTaskMutation } from '../../store/api/taskApi';
import { Loader } from '../Loader/Loader';

interface IEditTaskModalProps {
  setEditTaskModal: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  columnId: string;
  taskId: string;
  order: number;
}

export const EditTaskModal = ({
  setEditTaskModal,
  boardId,
  columnId,
  taskId,
  order,
}: IEditTaskModalProps) => {
  const { t } = useTranslation();
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');
  const [putTask, { isLoading }] = usePutTaskMutation();
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    putTask({
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
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
            <Form.Label>{t('boards.modal.form.title')}</Form.Label>
            <Form.Control
              type="name"
              placeholder={String(t('boards.modal.form.placeholder'))}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('boards.modal.form.title')}</Form.Label>
            <Form.Control
              type="name"
              placeholder={String(t('boards.modal.form.placeholder'))}
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              required={true}
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
