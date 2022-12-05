import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { stringToColour } from '../../utils/colorFromString';
import { IBoard } from '../../models';
import { useDeleteBoardMutation } from '../../store/api/boardApi';
import Delete from '../../assets/images/icons/delete.png';
import Edit from '../../assets/images/icons/edit.png';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { EditBoardModal } from '../EditBoardModal/EditBoardModal';
import { t } from 'i18next';
import { DeleteModal } from '../DeleteModal/DeleteModal';

interface IBoardItemProps {
  item: IBoard;
}

export const BoardItem = ({ item }: IBoardItemProps) => {
  const [deleteBoard] = useDeleteBoardMutation();
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [showBoardDeleteModal, setShowBoardDeleteModal] = useState(false);

  return (
    <div key={item._id} className="col-xl-3 col-md-4 col-sm-6 col-12">
      <Link to={`/boards/${item._id}`}>
        <div
          className="board row rounded-2"
          style={{
            backgroundImage: `linear-gradient(110deg, ${stringToColour(
              item._id!
            )}, ${stringToColour(item._id!.split('').reverse().join())}`,
            opacity: 0.8,
          }}
        >
          <div className="col-12 p-0">
            <div className="board-item">
              <div className="d-flex w-100 h-25p gap-1 board-item-wrapper p-2">
                <div className="board-name fw-semibold fs-5 text-white">{item.title}</div>
                <Button
                  className="action_button"
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                    setEditBoardModal(true);
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                >
                  <img src={Edit} alt="edit" />
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    setShowBoardDeleteModal(true);
                  }}
                  className="action_button"
                >
                  <img src={Delete} alt="delete" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <ModalComponent
        show={editBoardModal}
        title={t('boards.modal.editing')}
        onHide={() => setEditBoardModal(false)}
        setModal={setEditBoardModal}
      >
        <EditBoardModal setEditBoardModal={setEditBoardModal} board={item}></EditBoardModal>
      </ModalComponent>
      <DeleteModal
        description={t('boards.modal.warning')}
        title={t('boards.modal.deleting')}
        check={showBoardDeleteModal}
        setCheck={setShowBoardDeleteModal}
        handleDelete={() => deleteBoard(item._id)}
      />
    </div>
  );
};
