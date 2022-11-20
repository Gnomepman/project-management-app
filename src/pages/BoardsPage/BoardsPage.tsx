import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './BoardsPage.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { useGetBoardByIdQuery } from '../../store/api/boardApi';
import { ErrorComponent } from '../../components/Error/ErrorComponent';

export function BoardsPage() {
  const boarderId = '63763bacc02777e984c57e3a';
  const { isLoading, isError, error, data } = useGetBoardByIdQuery(boarderId);
  //const { boards, setBoards } = useState([]);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    //call modal window to get title from user and create board with such title
    e.preventDefault();
    console.log('creating new board');
  };

  useEffect(() => {
    //fetch boards and setBoards()
  });

  return (
    <>
      <div className="container-xxl min-vh-100">
        <section className="boards container mt-2 mb-2">
          <Button className="fw-semibold" variant="outline-info" onClick={handleShow}>
            {t('boards.create')}
          </Button>
          {/* {boards.map((elem) => { */}
          <Link to={`/boards/123`}>
            <Button className="board">
              {/* add limit for the name, if length is to high - cut string and add '...' to the end */}
              <span className="board-name fw-semibold fs-5">Board name</span>
            </Button>
          </Link>
          {/* })} */}
        </section>
        <Modal show={show} onHide={handleClose} centered>
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
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('boards.modal.close')}
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">
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
