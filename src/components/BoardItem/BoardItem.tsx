import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { stringToColour } from '../../utils/colorFromString';
import { IBoard } from '../../models';
import { useDeleteBoardMutation } from '../../store/api/boardApi';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
interface IBoardItemProps {
  item: IBoard;
}

export const BoardItem = ({ item }: IBoardItemProps) => {
  const { t } = useTranslation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [check, setCheck] = useState(false);

  return (
    <div key={item._id} className="col-xl-3 col-md-3 col-sm-4 col-xs-6">
      <div
        className="board row rounded-3"
        style={{
          backgroundImage: `linear-gradient(110deg, ${stringToColour(item._id!)}, ${stringToColour(
            item._id!.split('').reverse().join()
          )}`,
          opacity: 0.8,
        }}
      >
        <div className="col-10">
          <Link to={`/boards/${item._id}`}>
            <div className="board-item">
              <span className="board-name fw-semibold fs-5 text-white">
                {item.title.length < 20 ? item.title : item.title.slice(0, 20).trimEnd() + '...'}
              </span>
            </div>
          </Link>
        </div>
        <div className="col-1">
          <Button className="delete_button" variant="outline-dark" onClick={() => setCheck(true)}>
            X
          </Button>
        </div>
      </div>
      <DeleteModal
        description={t('auth.warning-board')}
        title={t('auth.delete-board')}
        check={check}
        setCheck={setCheck}
        handleDelete={() => deleteBoard(item._id)}
      />
    </div>
  );
};
