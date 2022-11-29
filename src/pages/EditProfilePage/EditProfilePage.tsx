import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
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

  const [putUser, { isLoading, isError, error, isSuccess }] = usePutUserMutation();

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
  }, [t, error, isError, isSuccess, navigate, isLoading]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  const { id } = JSON.parse(sessionStorage.getItem('user') || '');
  const { data } = useGetUserByIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    putUser({ id: id, payload: data });
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComponent message={(error as IErrorMessage).data.message} />;
  const onClose = () => setModalData(false);
  const onChecked = () => setCheck(false);
  return (
    <>
      {data && (
        <div className="container">
          <h5>{t('auth.logged')}:</h5>
          <p>
            {t('auth.name')}: {data?.name}
          </p>
          <p>
            {t('auth.login')}: {data?.login}
          </p>

          <Button
            style={{ marginRight: '15px' }}
            onClick={() => {
              setModalData(true);
            }}
          >
            {t('auth.button-edit')}
          </Button>

          <Button onClick={() => setCheck(true)}>{t('auth.button-delete')}</Button>
        </div>
      )}
      <Modal show={check} onHide={onChecked}>
        <Modal.Header>
          <Modal.Title>{t('auth.delete-user')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('auth.warning')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => deleteUser(id).then(() => navigate('/login'))}>
            {t('yes')}
          </Button>
          <Button variant="primary" onClick={() => setCheck(false)}>
            {t('no')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modal} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{t('auth.edit-data')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
            <div className="form-outline mb-4">
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
                <Button
                  style={{ marginRight: '15px' }}
                  type="submit"
                  value="submit"
                  data-testid="button-submit"
                  disabled={hasError()}
                  className={hasError() ? 'bg-secondary my-4' : 'bg-primary my-4'}
                >
                  {t('auth.edit')}
                </Button>
                <Button variant="primary" onClick={() => setModalData(false)}>
                  {t('auth.cancel')}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
