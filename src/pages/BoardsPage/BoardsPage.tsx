import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { IBoard, IBoardRes } from '../../models';
import { useGetBoardsQuery, usePostBoardsMutation } from '../../store/api/boardApi';
import { Loader } from '../../components/Loader/Loader';
import './BoardsPage.scss';

import { BoardItem } from '../../components/BoardItem/BoardItem';

export function BoardsPage() {
  const { t } = useTranslation();
  const { id } = JSON.parse(localStorage.getItem('user') || '');
  const [postBoard] = usePostBoardsMutation();
  const [showModal, setShowModal] = useState(false);
  const [inputName, setInputName] = useState('');
  const { data, isLoading } = useGetBoardsQuery(); //TODO: edit boardApi with tags and remove refetch

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

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  useEffect(() => {}, [data]);

  if (isLoading) return <Loader />;
  if (!data) return <p>No boards</p>;

  return (
    <>
      <div className="app-container py-2">
        <div className="row">
          {data.map((item: IBoard) => (
            <BoardItem key={item._id} item={item} />
          ))}
          <div className="col-xl-3 col-md-3 col-sm-4 col-6">
            <div className="board row rounded-3">
              <Button className="fw-semibold" variant="outline-info" onClick={handleModalShow}>
                {t('boards.create')}
              </Button>
            </div>
          </div>

          <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t('boards.modal.creating')}</Modal.Title>
            </Modal.Header>
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
                  <Button variant="primary" onClick={handleModalClose} type="submit">
                    {t('boards.modal.create')}
                  </Button>
                  <Button variant="danger" onClick={handleModalClose}>
                    {t('boards.modal.close')}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}
