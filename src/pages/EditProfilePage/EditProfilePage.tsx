import React, { useEffect, useState } from 'react';
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
  useGetUsersQuery,
  usePutUserMutation,
} from '../../store/api/userApi';

export const EditProfilePage = () => {
  const [modal, setModalData] = useState(false);
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
  return (
    <>
      {data && (
        <div className="container">
          <h5>Logged User:</h5>
          <p>name: {data?.name}</p>
          <p>login: {data?.login}</p>
          <Button
            onClick={() => {
              setModalData(true);
              console.log(modal);
            }}
          >
            Change User data
          </Button>
          <Button onClick={() => deleteUser(id).then(() => navigate('/login'))}>
            Delete user data
          </Button>
        </div>
      )}
      <Modal show={modal} onHide={onClose}>
        <div className="row d-flex pt-5 justify-content-center">
          <div className="col-md-4">
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
                <Button
                  type="submit"
                  value="submit"
                  data-testid="button-submit"
                  disabled={hasError()}
                  className={hasError() ? 'bg-secondary my-4' : 'bg-primary my-4'}
                >
                  {t('auth.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
