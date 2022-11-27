import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetBoardsQuery } from '../../store/api/boardApi';
import { stringToColour } from '../../utils/colorFromString';
import './BoardsPage.scss';

export function BoardsPage() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, isLoading } = useGetBoardsQuery();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    //call modal window to get title from user and create board with such title
    e.preventDefault();
    console.log('creating new board', e);
  };

  useEffect(() => {
    //fetch boards and setBoards()
  });
  if (isLoading)
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
            <Button className="fw-semibold" variant="outline-info" onClick={handleShow}>
              {t('boards.create')}
            </Button>
            {data &&
              data!.map((elem, index) => {
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
