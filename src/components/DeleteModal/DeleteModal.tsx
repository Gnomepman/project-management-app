import { t } from 'i18next';
import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IDeleteModalProps {
  title: string;
  description: string;
  check: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

export const DeleteModal = ({
  description,
  title,
  handleDelete,
  setCheck,
  check,
}: IDeleteModalProps) => {
  return (
    <>
      <Modal show={check} centered>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            {t('yes')}
          </Button>
          <Button variant="danger" onClick={() => setCheck(false)}>
            {t('no')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
