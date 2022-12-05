import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IBoard, IBoardRes } from '../../models';
import { usePutBoardMutation } from '../../store/api/boardApi';
import { Loader } from '../Loader/Loader';

interface IEditBoardModalProps {
  setEditBoardModal: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
}

export const EditBoardModal = ({ setEditBoardModal, board }: IEditBoardModalProps) => {
  const { t } = useTranslation();
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');
  const [putBoard, { isLoading }] = usePutBoardMutation();
  const [inputName, setInputName] = useState(board.title);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (inputName.length < 4) {
      toast.error(t('boards.min-length'), {
        autoClose: 2000,
      });
      return;
    }

    putBoard({
      boardId: board._id!,
      payload: { title: inputName, owner: userId, users: [userId] } as IBoardRes,
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
              type="search"
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
                setEditBoardModal(false);
              }}
              type="submit"
            >
              {t('boards.modal.confirm')}
            </Button>
            <Button variant="danger" onClick={() => setEditBoardModal(false)}>
              {t('modal.close')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
};
