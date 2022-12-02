import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { IBoardRes } from '../../models';
import { useTranslation } from 'react-i18next';
import { usePostBoardsMutation } from '../../store/api/boardApi';
import { Loader } from '../Loader/Loader';

interface ICreateBoardModalProps {
  setCreateBoardModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateBoardModal = ({ setCreateBoardModal }: ICreateBoardModalProps) => {
  const { t } = useTranslation();

  const { id } = JSON.parse(localStorage.getItem('user') || '');
  const [postBoard, { isLoading }] = usePostBoardsMutation();
  const [inputName, setInputName] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newBoard: IBoardRes = {
      title: inputName,
      owner: id,
      users: [id],
    };

    postBoard(newBoard);
    setInputName('');
  };

  if (isLoading) return <Loader />;

  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{t('boards.modal.form.title')}</Form.Label>
          <Form.Control
            type="name"
            placeholder={String(t('boards.modal.form.placeholder'))}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setCreateBoardModal(false)} type="submit">
            {t('boards.modal.create')}
          </Button>
          <Button variant="danger" onClick={() => setCreateBoardModal(false)}>
            {t('boards.modal.close')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
  );
};
