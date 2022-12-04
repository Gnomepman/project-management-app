import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IColumnRes } from '../../models';
import { usePutColumnMutation } from '../../store/api/columnApi';
import { Loader } from '../Loader/Loader';

interface IEditColumnModalProps {
  setEditColumnModal: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  columnId: string;
  order: number;
}

export const EditColumnModal = ({
  setEditColumnModal,
  boardId,
  columnId,
  order,
}: IEditColumnModalProps) => {
  const { t } = useTranslation();
  const [putColumn, { isLoading }] = usePutColumnMutation();
  const [inputName, setInputName] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    putColumn({
      boardId: boardId,
      columnId: columnId,
      payload: {
        title: inputName,
        order: order,
      } as IColumnRes,
    });
    setInputName('');
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
            />
          </Form.Group>
          <Modal.Footer style={{ paddingRight: '0px' }}>
            <Button
              variant="primary"
              onClick={(e) => {
                handleSubmit(e);
                setEditColumnModal(false);
              }}
              type="submit"
            >
              {t('boards.modal.confirm')}
            </Button>
            <Button variant="danger" onClick={() => setEditColumnModal(false)}>
              {t('modal.close')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};
