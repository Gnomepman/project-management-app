import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IErrorMessage, IUser } from '../../models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormInput } from '../../components/FormInput/FormInput';
import { Loader } from '../../components/Loader/Loader';
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  usePutUserMutation,
} from '../../store/api/userApi';
import { ModalDeleteComponent } from '../../components/DeleteModal/ModalDelete';

export const EditProfilePage = () => {
  const [modal, setModalData] = useState(false);
  const [check, setCheck] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const [putUser, { isError, error, isSuccess }] = usePutUserMutation();

  // Todo Refactor
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.upd-success'), {
        position: 'top-right',
        autoClose: 1000,
      });
    }

    if (isError) {
      toast.error((error as IErrorMessage).data.message, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  }, [t, error, isError, isSuccess, navigate]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  const { id } = JSON.parse(localStorage.getItem('user') || '');
  const { data, isLoading } = useGetUserByIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    putUser({ id: id, payload: data });
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  const onClose = () => setModalData(false);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="app-container">
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
            setModalData(true);
          }}
        >
          {t('auth.edit-user')}
        </Button>

        <Button variant="danger" onClick={() => setCheck(true)}>
          {t('auth.delete-user')}
        </Button>
      </div>
      <ModalDeleteComponent
        description={t('auth.warning-user')}
        title={t('auth.delete-user')}
        check={check}
        setCheck={setCheck}
        handleDelete={() => deleteUser(id).then(() => navigate('/login'))}
      />

      <Modal show={modal} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{t('auth.edit-data')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
            <div className="form-outline">
              <FormInput
                field="login"
                title={t('auth.login')}
                register={register}
                errors={errors.login}
              />
              <FormInput
                field="name"
                title={t('auth.name')}
                register={register}
                errors={errors.name}
              />
              <FormInput
                field="password"
                title={t('auth.password')}
                register={register}
                errors={errors.password}
              />
              <div>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    style={{ marginRight: '15px' }}
                    type="submit"
                    value="submit"
                    data-testid="button-submit"
                    disabled={hasError()}
                    className={hasError() ? 'bg-secondary' : 'bg-primary'}
                  >
                    {t('auth.edit')}
                  </Button>
                  <Button variant="danger" onClick={() => setModalData(false)}>
                    {t('auth.cancel')}
                  </Button>
                </Modal.Footer>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
