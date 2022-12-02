import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components/Loader/Loader';
import { useGetUserByIdQuery } from '../../store/api/userApi';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import { DeleteUserModal } from '../../components/EditUser/DeleteUserModal';
import { EditUserModal } from '../../components/EditUser/EditUserModal';

export const EditProfilePage = () => {
  const { t } = useTranslation();

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { id } = JSON.parse(localStorage.getItem('user') || '');

  const { data, isLoading } = useGetUserByIdQuery(id);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="app-container py-3">
        <h5 className="py-3">{t('auth.logged')}:</h5>
        <p>
          <b className="text-secondary">{t('auth.name')}:</b> {data?.name}
        </p>
        <p>
          <b className="text-secondary">{t('auth.login')}:</b> {data?.login}
        </p>

        <Button
          variant="primary"
          style={{ marginRight: '15px' }}
          onClick={() => {
            setEditModal(true);
          }}
        >
          {t('auth.edit-user')}
        </Button>

        <Button variant="danger" onClick={() => setDeleteModal(true)}>
          {t('auth.delete-user')}
        </Button>
      </div>

      <ModalComponent
        title={t('auth.edit-data')}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        setModal={setDeleteModal}
      >
        <DeleteUserModal setDeleteModal={setDeleteModal} />
      </ModalComponent>

      <ModalComponent
        title={t('auth.edit-data')}
        show={editModal}
        onHide={() => setEditModal(false)}
        setModal={setEditModal}
      >
        <EditUserModal setEditModal={setEditModal} />
      </ModalComponent>
    </>
  );
};
