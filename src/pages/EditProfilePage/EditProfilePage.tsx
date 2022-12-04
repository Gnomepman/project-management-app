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
      <div className="app-container">
        <div className="row d-flex pt-5 justify-content-center">
          <article className="col-md-6 text-center">
            <section className="text-center">
              <h4>{t('edit.greeting')}!</h4>
              <p className="lead">{t('edit.support')}</p>
              <p className="lead">{t('edit.help')}</p>
            </section>
            <div className="mt-5">
              <h5 className="py-3">{t('edit.logged')}:</h5>
              <p className="pb-1">
                <b className="text-secondary">{t('auth.name')}:</b> {data?.name}
              </p>
              <p className="pb-1">
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
          </article>
        </div>
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
