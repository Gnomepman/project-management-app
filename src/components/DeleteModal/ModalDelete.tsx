import { t } from 'i18next';
import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Button } from 'react-bootstrap';
interface IIcheck {
  check: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
}

export const ModalDeleteComponent = ({ handleSubmit, setCheck, check }: IIcheck) => {
  return (
    <>
      <Modal show={check} onHide={handleSubmit}>
        <Modal.Header>
          <Modal.Title>{t('auth.delete-user')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('auth.warning')}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
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
