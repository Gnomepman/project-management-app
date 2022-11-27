import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IBoard } from '../../models';
import { useGetBoardsQuery, usePostBoardsMutation } from '../../store/api/boardApi';
import { stringToColour } from '../../utils/colorFromString';
import './BoardsPage.scss';

export function BoardsPage() {
  const { t } = useTranslation();
  const { id } = JSON.parse(sessionStorage.getItem('user') || '');
  const [postBoard] = usePostBoardsMutation();
  const [showModal, setShowModal] = useState(false);
  const [inputName, setInputName] = useState('');
  const { data: boards, isLoading: areBoardsLoading, refetch } = useGetBoardsQuery();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newBoard: IBoard = {
      title: inputName,
      owner: id,
      users: [id],
    };
    postBoard(newBoard);
    refetch();
    setInputName('');
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  useEffect(() => {}, [boards]);
  if (areBoardsLoading)
    return (
      <>
        <p>loading...</p>
      </>
    );

  return (
    <>
      <div className="container-xxl min-vh-100">
        <div className="boards container mt-2 mb-2">
          <>
            <Button className="fw-semibold" variant="outline-info" onClick={handleModalShow}>
              {t('boards.create')}
            </Button>
            {boards &&
              boards!.map((elem, index) => {
                return (
                  <>
                    <Link to={`/boards/${elem._id}`} key={index}>
                      <Button
                        className="board"
                        style={{
                          backgroundImage: `linear-gradient(110deg, ${stringToColour(
                            elem._id!
                          )}, ${stringToColour(elem._id!.split('').reverse().join())}`,
                          opacity: 0.8,
                        }}
                      >
                        {/* add limit for the name, if length is to high - cut string and add '...' to the end */}
                        <span className="board-name fw-semibold fs-5">{elem.title}</span>
                      </Button>
                    </Link>
                  </>
                );
              })}
          </>
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
                <Button variant="secondary" onClick={handleModalClose}>
                  {t('boards.modal.close')}
                </Button>
                <Button variant="primary" onClick={handleModalClose} type="submit">
                  {t('boards.modal.create')}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
