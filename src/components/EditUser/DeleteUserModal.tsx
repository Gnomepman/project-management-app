import React, { Dispatch, SetStateAction } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDeleteUserMutation } from '../../store/api/userApi';
import { useNavigate } from 'react-router-dom';

interface IDeleteUserModalProps {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteUserModal = ({ setDeleteModal }: IDeleteUserModalProps) => {
  const { t } = useTranslation();

  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem('user') || '');

  const HandleClick = () => {
    deleteUser(id);
    navigate('/login');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <>
      <Modal.Body>{t('auth.warning')}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={HandleClick}>
          {t('yes')}
        </Button>
        <Button variant="danger" onClick={() => setDeleteModal(false)}>
          {t('no')}
        </Button>
      </Modal.Footer>
    </>
  );
};
