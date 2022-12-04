import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { usePostColumnsMutation } from '../../store/api/columnApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

interface ICreateColumnModalProps {
  setCreateColumnModal: Dispatch<SetStateAction<boolean>>;
}

export const CreateColumnModal = ({ setCreateColumnModal }: ICreateColumnModalProps) => {
  const { t } = useTranslation();

  const [inputName, setInputName] = useState('');
  const [postColumn] = usePostColumnsMutation();
  const { id } = useParams();
  const board = useSelector((state: RootState) => state.board.board);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputName.length < 4) {
      toast.error(t('columns.min-length'), {
        autoClose: 2000,
      });
      return;
    }

    await postColumn({
      boardId: id!,
      payload: {
        title: inputName,
        order: board.columnOrder.length + 1,
      },
    });
  };

  return (
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{t('columns.modal.form.title')}</Form.Label>
          <Form.Control
            type="name"
            placeholder={String(t('columns.modal.form.placeholder'))}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer style={{ paddingRight: '0px' }}>
          <Button variant="primary" onClick={() => setCreateColumnModal(false)} type="submit">
            {t('modal.create')}
          </Button>
          <Button variant="danger" onClick={() => setCreateColumnModal(false)}>
            {t('modal.close')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
  );
};
