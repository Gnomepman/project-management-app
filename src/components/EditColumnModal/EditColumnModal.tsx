import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IColumnRes } from '../../models';
import { column } from '../../models/initial';
import { usePutColumnMutation } from '../../store/api/columnApi';
import { Loader } from '../Loader/Loader';

interface IEditColumnModalProps {
  setEditColumnModal: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  column: column;
  order: number;
}

export const EditColumnModal = ({
  setEditColumnModal,
  boardId,
  column,
  order,
}: IEditColumnModalProps) => {
  const { t } = useTranslation();
  const [putColumn, { isLoading }] = usePutColumnMutation();
  const [inputName, setInputName] = useState(column.title);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputName.length < 4) {
      toast.error(t('columns.min-length'), {
        autoClose: 2000,
      });
      return;
    }

    putColumn({
      boardId: boardId,
      columnId: column.id,
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
            <Form.Label>{t('columns.modal.form.title')}</Form.Label>
            <Form.Control
              type="search"
              placeholder={String(t('columns.modal.form.placeholderEdit'))}
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
