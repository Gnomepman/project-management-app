import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IBoard } from '../../models';
import { useGetBoardsQuery } from '../../store/api/boardApi';
import { Loader } from '../../components/Loader/Loader';
import './BoardsPage.scss';
import { BoardItem } from '../../components/BoardItem/BoardItem';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import { CreateBoardModal } from '../../components/CreateBoard/CreateBoardModal';

export function BoardsPage() {
  const { t } = useTranslation();
  const [createBoardModal, setCreateBoardModal] = useState(false);
  const { data, isLoading } = useGetBoardsQuery();

  if (isLoading) return <Loader />;
  if (!data) return <p>No boards</p>;

  return (
    <>
      <div className="app-container py-2">
        <div className="row">
          {data.map((item: IBoard) => (
            <BoardItem key={item._id} item={item} />
          ))}
          <div className="col-xl-3 col-md-4 col-sm-6 col-12">
            <div className="board row rounded-3">
              <Button
                className="fw-semibold"
                variant="outline-info"
                onClick={() => setCreateBoardModal(true)}
              >
                {t('boards.create')}
              </Button>
            </div>
          </div>

          <ModalComponent
            show={createBoardModal}
            title={t('boards.modal.creating')}
            onHide={() => setCreateBoardModal(false)}
            setModal={setCreateBoardModal}
          >
            <CreateBoardModal setCreateBoardModal={setCreateBoardModal} />
          </ModalComponent>
        </div>
      </div>
    </>
  );
}
