import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ITaskRes } from '../../models';
import { usePostTasksMutation } from '../../store/api/taskApi';
import { toast } from 'react-toastify';

interface ICreateTaskModalProps {
  setCreateTaskModal: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  order: number;
  userId: string;
}

export const CreateTaskModal = ({
  setCreateTaskModal,
  columnId,
  order,
  userId,
}: ICreateTaskModalProps) => {
  const { t } = useTranslation();
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [postTask] = usePostTasksMutation();
  const { id } = useParams();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputTitle.length < 4 || inputDescription.length < 4) {
      toast.error(t('column.min-length'), {
        autoClose: 2000,
      });
      return;
    }

    await postTask({
      boardId: id!,
      columnId: columnId,
      payload: {
        title: inputTitle,
        order: order,
        description: inputDescription,
        userId: userId,
        users: [userId],
      } as ITaskRes,
    });
  };

  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{t('tasks.modal.form.title')}</Form.Label>
          <Form.Control
            type="name"
            placeholder={String(t('tasks.modal.form.titlePlaceholder'))}
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>{t('tasks.modal.form.description')}</Form.Label>
          <Form.Control
            type="name"
            placeholder={String(t('tasks.modal.form.descriptionPlaceholder'))}
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer style={{ paddingRight: '0px' }}>
          <Button variant="primary" onClick={() => setCreateTaskModal(false)} type="submit">
            {t('modal.create')}
          </Button>
          <Button variant="danger" onClick={() => setCreateTaskModal(false)}>
            {t('modal.close')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
  );
};
